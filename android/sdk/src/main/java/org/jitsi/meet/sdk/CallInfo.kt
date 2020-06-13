package org.jitsi.meet.sdk

import android.os.Bundle
import android.os.Parcel
import android.os.Parcelable
import androidx.core.os.bundleOf
import com.google.gson.annotations.SerializedName


data class CallInfo (

    @SerializedName("callStatus") val callStatus : String,
    @SerializedName("callType") val callType : String,
    @SerializedName("callMode") val callMode : String,
    @SerializedName("users") val users : List<Users>
) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        TODO("users")) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(callStatus)
        parcel.writeString(callType)
        parcel.writeString(callMode)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<CallInfo> {
        override fun createFromParcel(parcel: Parcel): CallInfo {
            return CallInfo(parcel)
        }

        override fun newArray(size: Int): Array<CallInfo?> {
            return arrayOfNulls(size)
        }
    }
}