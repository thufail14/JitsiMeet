package org.jitsi.meet.sdk

import android.os.Bundle


object ConstructBundle {
    fun getCallUsersJsonObject(userInfo:CallInfo):Bundle?{

        val bundle = Bundle()
        bundle.putString("callMode", userInfo.callMode)
        bundle.putString("callType", userInfo.callType)
        bundle.putString("callStatus", userInfo.callStatus)
        bundle.putParcelableArrayList("users", getUsersObject(userInfo.users) )
        return bundle;
    }
    private fun getUsersObject(users: List<Users>): ArrayList<Bundle> {

        val array = ArrayList<Bundle>()
        for (user in users) {
            val jo = Bundle()
            jo.putString("name", user.name)
            jo.putString("avatar", user.avatar)
           array.add(jo)
        }
        return array
    }
}