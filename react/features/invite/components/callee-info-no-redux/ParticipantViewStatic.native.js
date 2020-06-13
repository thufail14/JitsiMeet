import React, { Component } from 'react';
import { View, Text,SafeAreaView, ImageBackground } from 'react-native';
import type {Props as ParticipantViewProps} from "../../../base/participants";
import { Container } from "../../../base/react";
import styles from '../../../base/participants/components/styles';
import AvatarComp from "../../../base/avatar/components/AvatarComp";

/**
 * The type of the React {@link Component} props of {@link LargeVideo}.
 */
type Props = ParticipantViewProps;

const appBackground = require('../../../../../images/appBackground.png');

class ParticipantViewStatic extends Component<Props> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { callInfo } = this.props;
        return (
            <Container
                style = {{
                    ...styles.participantView,
                    ...this.props.style
                    
                }}
                touchFeedback = { false }>   
                    <ImageBackground source={appBackground} style={styles.imageBackground}>                 
                        <View style = {{...styles.avatarContainer, ...{position:'relative',top:-50}}}>
                            <AvatarComp
                                participantId = { this.props.participantId }
                                size = { this.props.avatarSize }
                                callInfo={callInfo}
                                />
                        </View>
                    </ImageBackground>
            </Container>
        );

    }

}


export default ParticipantViewStatic;