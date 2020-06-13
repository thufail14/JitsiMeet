package org.jitsi.meet.sdk

import com.google.gson.annotations.SerializedName

data class Users (

    @SerializedName("name") val name : String,
    @SerializedName("avatar") val avatar : String
)
