// @flow

import React, { Component } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getConferenceName, DEFAULT_CALL_MODE, CALL_MODE_ONETOONE } from '../../../base/conference';
import { connect } from '../../../base/redux';
import { PictureInPictureButton } from '../../../mobile/picture-in-picture';
import { isToolboxVisible } from '../../../toolbox';

import ConferenceTimer from '../ConferenceTimer';
import styles, { NAVBAR_GRADIENT_COLORS } from './styles';
import { ROOMNAME_ENABLED,CALL_MODE, getFeatureFlag } from '../../../base/flags';
import { Platform } from '../../../base/react';
import { OverflowMenuButton } from "../../../toolbox";
import { ColorSchemeRegistry } from "../../../base/color-scheme";


export type Props = {
       /**
     * Check roomname enabled.
     */
    _roomnameEnabled: string,

    /**
     * Name of the meeting we're currently in.
     */
    _meetingName: string,

    /**
     * True if the navigation bar should be visible.
     */
    _visible: boolean
};

/**
 * Implements a navigation bar component that is rendered on top of the
 * conference screen.
 */
class NavigationBar extends Component<Props> {
    /**
     * Implements {@Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _styles } = this.props;
        const { buttonStylesBorderless, toggledButtonStyles } = _styles;
        if (!this.props._visible) {
            return null;
        }

        // let callInfoContent = <View
        //                 pointerEvents = 'box-none'
        //                 style = { styles.roomNameWrapper }>
        //                 { this.props._roomnameEnabled && this.props._callMode === "manytomany" &&
        //                     <Text
        //                     numberOfLines = { 1 }
        //                     style = { styles.roomName }>
        //                     { this.props._meetingName }
        //                 </Text>
        //                 }
        //                 <ConferenceTimer />
        //             </View>

        return [
            <View
                key = { 2 }
                pointerEvents = 'box-none'
                style = {{...styles.navBarWrapper,...{
                    justifyContent:'center'}}}>
                <View style={styles.navBarPipWrapper}>
                    <PictureInPictureButton
                        styles = { styles.navBarButton } />
                </View>
                <View style = {styles.navBarOverflowMenuWrapper}>
                    <OverflowMenuButton
                        styles = { buttonStylesBorderless }
                        toggledStyles = { toggledButtonStyles } />
                </View>
            </View>
        ];
    }

}

/**
 * Maps part of the Redux store to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _meetingName: string,
 *     _visible: boolean
 * }}
 */
function _mapStateToProps(state: Object): Object {
    const { reducedUI } = state['features/base/responsive-ui'];

    return {
        _roomnameEnabled: getFeatureFlag(state, ROOMNAME_ENABLED, true),
        _callMode: getFeatureFlag(state, CALL_MODE, DEFAULT_CALL_MODE),
        _meetingName: getConferenceName(state),
        _visible: (Platform.OS != 'android' && reducedUI) ? true : isToolboxVisible(state),
        _styles: ColorSchemeRegistry.get(state, 'Toolbox')
    };
}

export default connect(_mapStateToProps)(NavigationBar);
