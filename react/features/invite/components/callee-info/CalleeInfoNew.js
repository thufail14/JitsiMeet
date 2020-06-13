// @flow

import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from '../../../base/react';
import { CALLING } from '../../../presence-status';
import { getCallInfoUsersName } from "../../../invite";

import styles from '../../../conference/components/native/styles';
import { ColorPalette } from "../../../base/styles";

/**
 * The type of the React {@code Component} props of {@link CalleeInfo}.
 */
type Props = {

    /**
     * The callee's information such as display name.
     */
    callinfo: Object
};


/**
 * Implements a React {@link Component} which depicts the establishment of a
 * call with a specific remote callee.
 *
 * @extends Component
 */
class CalleeInfoNew extends Component<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { callInfo } = this.props;
        let name = null;
        let callStatus = CALLING;
        if(callInfo && callInfo.users){
            name = getCallInfoUsersName(callInfo.users);
        }
        if(callInfo && callInfo.callStatus){
            callStatus = callInfo.callStatus
        }

        let content = <>
                <Text style={{
                    color: ColorPalette.white,
                    opacity: 0.6,
                    fontSize: 18,
                    fontWeight: '400'
                }}>{ `${callStatus ? callStatus.charAt(0).toUpperCase() + callStatus.slice(1) : null}` }</Text>
                <Text numberOfLines = { 1 } style={{
                    color: ColorPalette.white,
                    fontSize: 22,
                    fontWeight: '400',
                    paddingHorizontal:20
                    
                }}>{ name }</Text>
        </>

        if(this.props.name){
            content = <Text numberOfLines = { 1 } style={{
                color: ColorPalette.white,
                fontSize: 22,
                fontWeight: '400',
                paddingHorizontal:20
                
            }}>{ this.props.name }</Text>
        }
        else{

        }

        return (
            <SafeAreaView style={{ 
                flexDirection: 'column',
                position:'absolute',
                top: 35,
                left:0,
                right:0   
                }}  >
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop:25
                }} >
                    {content}
                </View>
            </SafeAreaView>
        )
    }
}

export default CalleeInfoNew;
