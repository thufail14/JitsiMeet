/*
 * Copyright @ 2019-present 8x8, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jitsi.meet.sdk;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.fragment.app.FragmentActivity;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.modules.core.PermissionListener;

import org.jitsi.meet.sdk.log.JitsiMeetLogger;

import java.util.Map;
import java.util.Objects;

import static org.jitsi.meet.sdk.TelephonyServiceReceiver.CALL_STATE;


/**
 * A base activity for SDK users to embed. It uses {@link JitsiMeetFragment} to do the heavy
 * lifting and wires the remaining Activity lifecycle methods so it works out of the box.
 */
public class JitsiMeetActivity extends FragmentActivity
        implements JitsiMeetActivityInterface, JitsiMeetViewListener {

    protected static final String TAG = JitsiMeetActivity.class.getSimpleName();

    private static final String ACTION_JITSI_MEET_CONFERENCE = "org.jitsi.meet.CONFERENCE";
    private static final String JITSI_MEET_CONFERENCE_OPTIONS = "JitsiMeetConferenceOptions";
    private BroadcastReceiver telephoneCallReceiver;
    public static final String ACTION_PHONE_CALL_STATE_CHANGED =
        BuildConfig.APPLICATION_ID + ".action.PHONE_CALL_STATE_CHANGED";


    // Helpers for starting the activity
    //

    public static void launch(Context context, JitsiMeetConferenceOptions options) {
        Intent intent = new Intent(context, JitsiMeetActivity.class);
        intent.setAction(ACTION_JITSI_MEET_CONFERENCE);
        intent.putExtra(JITSI_MEET_CONFERENCE_OPTIONS, options);
        context.startActivity(intent);
    }

    public static void launch(Context context, String url) {
        JitsiMeetConferenceOptions options
            = new JitsiMeetConferenceOptions.Builder().setRoom(url).build();
        launch(context, options);
    }

    // Overrides
    //

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_jitsi_meet);
        registerTelephonyCallListener();
        if (!extraInitialize()) {
            initialize();
        }
    }

    @Override
    public void onDestroy() {
        // Here we are trying to handle the following corner case: an application using the SDK
        // is using this Activity for displaying meetings, but there is another "main" Activity
        // with other content. If this Activity is "swiped out" from the recent list we will get
        // Activity#onDestroy() called without warning. At this point we can try to leave the
        // current meeting, but when our view is detached from React the JS <-> Native bridge won't
        // be operational so the external API won't be able to notify the native side that the
        // conference terminated. Thus, try our best to clean up.
        leave();
        if (AudioModeModule.useConnectionService()) {
            ConnectionService.abortConnections();
        }
        JitsiMeetOngoingConferenceService.abort(this);
        unRegisterTelephonyCallListener();
        super.onDestroy();
    }

    @Override
    public void finish() {
        leave();

        super.finish();
    }

    // Helper methods
    //

    protected JitsiMeetView getJitsiView() {
        JitsiMeetFragment fragment
            = (JitsiMeetFragment) getSupportFragmentManager().findFragmentById(R.id.jitsiFragment);
        return fragment.getJitsiView();
    }

    public void join(@Nullable String url) {
        JitsiMeetConferenceOptions options
            = new JitsiMeetConferenceOptions.Builder()
                .setRoom(url)
                .build();
        join(options);
    }

    public void join(JitsiMeetConferenceOptions options) {
        getJitsiView().join(options);
    }

    public void leave() {
        getJitsiView().leave();
    }

    private @Nullable JitsiMeetConferenceOptions getConferenceOptions(Intent intent) {
        String action = intent.getAction();

        if (Intent.ACTION_VIEW.equals(action)) {
            Uri uri = intent.getData();
            if (uri != null) {
                return new JitsiMeetConferenceOptions.Builder().setRoom(uri.toString()).build();
            }
        } else if (ACTION_JITSI_MEET_CONFERENCE.equals(action)) {
            return intent.getParcelableExtra(JITSI_MEET_CONFERENCE_OPTIONS);
        }

        return null;
    }

    /**
     * Helper function called during activity initialization. If {@code true} is returned, the
     * initialization is delayed and the {@link JitsiMeetActivity#initialize()} method is not
     * called. In this case, it's up to the subclass to call the initialize method when ready.
     *
     * This is mainly required so we do some extra initialization in the Jitsi Meet app.
     *
     * @return {@code true} if the initialization will be delayed, {@code false} otherwise.
     */
    protected boolean extraInitialize() {
        return false;
    }

    protected void initialize() {
        // Listen for conference events.
        getJitsiView().setListener(this);

        // Join the room specified by the URL the app was launched with.
        // Joining without the room option displays the welcome page.
        join(getConferenceOptions(getIntent()));
    }

    // Activity lifecycle methods
    //

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        JitsiMeetActivityDelegate.onActivityResult(this, requestCode, resultCode, data);
    }

    @Override
    public void onBackPressed() {
        JitsiMeetActivityDelegate.onBackPressed();
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        JitsiMeetConferenceOptions options;

        if ((options = getConferenceOptions(intent)) != null) {
            join(options);
            return;
        }

        JitsiMeetActivityDelegate.onNewIntent(intent);
    }

    @Override
    protected void onUserLeaveHint() {
        getJitsiView().enterPictureInPicture();
    }

    // JitsiMeetActivityInterface
    //

    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        JitsiMeetActivityDelegate.requestPermissions(this, permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        JitsiMeetActivityDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    // JitsiMeetViewListener
    //

    @Override
    public void onConferenceJoined(Map<String, Object> data) {
        JitsiMeetLogger.i("Conference joined: " + data);
        // Launch the service for the ongoing notification.
    }

    @Override
    public void onConferenceTerminated(Map<String, Object> data) {
        JitsiMeetLogger.i("Conference terminated: " + data);
        finish();
    }

    @Override
    public void onConferenceWillJoin(Map<String, Object> data) {
        JitsiMeetLogger.i("Conference will join: " + data);
        JitsiMeetLogger.i("JitsiMeetOngoingConferenceService:launch ");
        JitsiMeetOngoingConferenceService.launch(this);
    }

    @Override
    public void onConferenceWillLeave(Map<String, Object> data) {
        JitsiMeetLogger.i("onConferenceWillLeave: "+data);
    }

    @Override
    public void onParticipantJoined(Map<String, Object> data) {
        JitsiMeetLogger.i("onParticipantJoined " + data);

    }

    @Override
    public void onParticipantLeft(Map<String, Object> data) {
        JitsiMeetLogger.i("onParticipantLeft " + data);
    }

    @Override
    public void onJoinedParticipantAppJid(Map<String, Object> data) {
        JitsiMeetLogger.i("onJoinedParticipantAppJid: "+data);

    }

    private void registerTelephonyCallListener() {

        telephoneCallReceiver = new BroadcastReceiver() {
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void onReceive(Context context, Intent intent) {
                int callState = intent.getIntExtra(CALL_STATE, -1);
                switch (callState) {
                    case TelephonyManager.CALL_STATE_RINGING:
                        Log.d(TAG, "getGsmState: CALL_STATE_RINGING ");
                        break;
                    case TelephonyManager.CALL_STATE_IDLE:
                        Log.d(TAG, "getGsmState: CALL_STATE_IDLE ");
                        ConnectionService.holdCurrentCall(false);
                        break;
                    case TelephonyManager.CALL_STATE_OFFHOOK:
                        Log.d(TAG, "getGsmState: CALL_STATE_OFFHOOK ");
                        ConnectionService.holdCurrentCall(true);

                        break;
                    default:
                        break;
                }
            }
        };
        LocalBroadcastManager.getInstance(this).registerReceiver(telephoneCallReceiver,
            new IntentFilter(ACTION_PHONE_CALL_STATE_CHANGED));
    }
    /**
     * The method which registers the receiver to handle the audio call disconnection.
     */
    private void unRegisterTelephonyCallListener() {
        if (telephoneCallReceiver != null) {
            LocalBroadcastManager.getInstance(this).unregisterReceiver(telephoneCallReceiver);
        }
    }



}
