import React, { Component } from 'react';
import { StatusBar, SafeAreaView, View, Text, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container } from '../../../base/react';
import { fixAndroidViewClipping, ColorPalette, BoxModel } from "../../../base/styles";
import { ColorSchemeRegistry } from "../../../base/color-scheme";
import LargeAvatarStatic from './LargeAvatarStatic';
import ToolboxStatic from './ToolboxStatic';
import NavigationBarStatic from './NavigationBarStatic';
import styles from "../../../conference/components/native/styles";
import {CalleeInfoNew} from "../callee-info";

/**
 * Implements a React {@link Component} which depicts the establishment of a
 * call with a specific remote callee if there is such a remote callee.
 *
 * @extends Component
 */
class CalleeInfoContainerStatic extends Component {

    _renderContent(){
        const _colorScheme = {'features/base/color-scheme':{}};
        const _largeVideoStyles = ColorSchemeRegistry.get(_colorScheme, 'LargeVideo'); 
        const _toolBoxStyles = ColorSchemeRegistry.get(_colorScheme, 'Toolbox');
        return (
            <>
                
                <LargeAvatarStatic
                    _participantId={null}
                    _styles={_largeVideoStyles}
                    onClick={() => false}
                    {...this.props}
                />

                <SafeAreaView
                    pointerEvents = 'box-none'
                    style = {styles.toolboxAndFilmstripContainer}>
                        <CalleeInfoNew {...this.props}/>
                    <ToolboxStatic
                        _styles={_toolBoxStyles}
                        _visible={true}
                        {...this.props}
                    />

                </SafeAreaView>

                <SafeAreaView
                    pointerEvents = 'box-none'
                    style = {styles.navBarSafeView}>
                    <NavigationBarStatic {...this.props} toolBoxStyles={_toolBoxStyles} />
                </SafeAreaView>
            </>
        );
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Container style={fixAndroidViewClipping({
                alignSelf: 'stretch',
                backgroundColor: ColorPalette.appBackground,
                flex: 1
            })}>
                    <StatusBar
                        barStyle = 'light-content'
                        hidden = { true }
                        translucent = { true } />
                        { this._renderContent() } 
            </Container>
        );
    }

}

export default CalleeInfoContainerStatic;