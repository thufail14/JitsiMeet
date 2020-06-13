// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconHangup, IconHangupNative } from '../../icons';

import AbstractButton from './AbstractButton';
import type { Props } from './AbstractButton';

/**
 * An abstract implementation of a button for disconnecting a conference.
 */
export default class AbstractHangupButton<P : Props, S: *>
    extends AbstractButton<P, S> {

    icon = navigator.product === 'ReactNative' ? IconHangupNative : IconHangup;
    iconText = 'end';

    /**
     * Handles clicking / pressing the button, and disconnects the conference.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this._doHangup();
    }

    /**
     * Helper function to perform the actual hangup action.
     *
     * @protected
     * @returns {void}
     */
    _doHangup() {
        // To be implemented by subclass.
    }

    render(){
    
        return (
            <View style = {{justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress = { () => this._handleClick() } style= {{
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:50,
                        backgroundColor:'#ff4d67',
                        width:196,
                        height:44,
                        overflow:'hidden',
                        marginTop:20
                    }}>
                        {super.render()}
                </TouchableOpacity>
            </View>
        );
    }
}
