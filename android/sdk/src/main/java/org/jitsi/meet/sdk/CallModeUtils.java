package org.jitsi.meet.sdk;

import android.util.Log;

public class CallModeUtils {
    /**
     * Default constructor to be called when a new instance of this class object is created.
     */
    private CallModeUtils() {
        // Implementation goes here.
    }
    private static String callMode= "";

    private static String contentTitle="";
    private static String contentText="";

    public static String getContentTitle() {
        return contentTitle;
    }

    public static void setContentTitle(String contentTitle) {
        CallModeUtils.contentTitle = contentTitle;
    }

    public static String getContentText() {
        return contentText;
    }

    public static void setContentText(String contentText) {
        CallModeUtils.contentText = contentText;
    }

    public static String getCallMode() {
        return callMode;
    }

    public static void setCallMode(String callMode) {
        CallModeUtils.callMode = callMode;
        switch (callMode) {

            case "onetoone":
                 setContentTitle("Ongoing Call");
                 setContentText("You are currently in a Call. Tap to return to it.");
                break;
            case "onetomany":
                setContentTitle( "Ongoing Conference Call");
                setContentText("You are currently in a Conference Call. Tap to return to it.");
                break;
            case "manytomany":
                setContentTitle( "Ongoing meeting");
                setContentText("You are currently in a meeting. Tap to return to it.");
                break;
        }

    }
}
