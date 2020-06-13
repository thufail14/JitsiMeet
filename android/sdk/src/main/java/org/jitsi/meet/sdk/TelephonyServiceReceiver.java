package org.jitsi.meet.sdk;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import static org.jitsi.meet.sdk.JitsiMeetActivity.ACTION_PHONE_CALL_STATE_CHANGED;

public class TelephonyServiceReceiver extends BroadcastReceiver {

    /**
     * key Constant for local broadcast intent
     */
    public static final String CALL_STATE = "callState";

    /**
     * This method will be called when a telephonic call received
     *
     * @param context received startupActivityContext
     * @param intent  received intent
     */
    public void onReceive(final Context context, Intent intent) {

        if (intent.getAction() != null && intent.getAction().equals(TelephonyManager
            .ACTION_PHONE_STATE_CHANGED)) {

            // Create a new PhoneStateListener
            PhoneStateListener listener = new PhoneStateListener() {
                @Override
                public void onCallStateChanged(int state, String incomingNumber) {
                    sendBroadcast(context, state);
                }
            };
            TelephonyManager telephony = (TelephonyManager) context
                .getSystemService(Context.TELEPHONY_SERVICE);
            if (telephony != null) {
                telephony.listen(listener, PhoneStateListener.LISTEN_CALL_STATE);
            }
        }
    }

    /**
     * Send local broadcast for callState changes
     *
     * @param callState it indicates {@link TelephonyManager} call states.
     */
    private void sendBroadcast(Context context, int callState) {
        Log.d("telephonyCallTest", "BroadCastingCallState: " + callState);
        Intent intent = new Intent(ACTION_PHONE_CALL_STATE_CHANGED);
        intent.putExtra(CALL_STATE, callState);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }
}