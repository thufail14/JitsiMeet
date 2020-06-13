import React, { PureComponent, Component } from 'react';
import { View } from 'react-native';
import { Container } from '../../../base/react';
import type {Props as ToolboxProps} from '../../../toolbox';
import styles from "../../../toolbox/components/native/styles";

import AudioMuteButtonStatic from './buttons/AudioMuteButtonStatic';
import HangupButtonStatic from './buttons/HangupButtonStatic';
import VideoMuteButtonStatic from './buttons/VideoMuteButtonStatic';
import ToggleCameraButtonStatic from './buttons/ToggleCameraButtonStatic';
import AudioRouteButtonStatic from './buttons/AudioRouteButtonStatic';

/**
 * The type of {@link Toolbox}'s React {@code Component} props.
 */
export type Props = ToolboxProps;

class ToolboxStatic extends PureComponent<Props> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Container
                style = { styles.toolbox }
                visible = {this.props._visible}>
                { this._renderToolbar() }
            </Container>
        );
    }

    _renderToolbar() {
        const { _styles } = this.props;
        const { buttonStyles, buttonStylesBorderless, hangupButtonStyles, toggledButtonStyles } = _styles;
        const startAudioOnly = this.props && this.props.url && this.props.url.config && this.props.url.config.startAudioOnly;
        return (
            <>
                <View
                    accessibilityRole = 'toolbar'
                    pointerEvents = 'box-none'
                    style = {styles.toolbar}>

                        {!startAudioOnly && <ToggleCameraButtonStatic 
                            styles = { buttonStyles }
                            toggledStyles = { toggledButtonStyles } />
                        }
                        <AudioMuteButtonStatic
                            styles = { buttonStyles }
                            toggledStyles = { toggledButtonStyles } />
                
                        <VideoMuteButtonStatic
                            styles = { buttonStyles }
                            toggledStyles = { toggledButtonStyles } startAudioOnly={startAudioOnly} />
                        <AudioRouteButtonStatic
                            styles = { buttonStyles }
                            toggledStyles = { toggledButtonStyles } />

                </View>
                <HangupButtonStatic
                    styles = {hangupButtonStyles} 
                    {...this.props} />  
            </>
        );
    }

}


export default ToolboxStatic;