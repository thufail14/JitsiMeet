import React, { Component } from 'react';
import LargeVideoComp from "../../../large-video/components/LargeVideoComp";
import type { Props as LargeVideoCompProps, State as LargeVideoCompState }  from '../../../large-video/components/LargeVideoComp';
import { DimensionsDetector } from "../../../base/responsive-ui";
import ParticipantViewStatic from "./ParticipantViewStatic";

/**
 * The type of the React {@link Component} props of {@link LargeVideo}.
 */
type Props = LargeVideoCompProps;

/**
 * The type of the React {@link Component} state of {@link LargeVideo}.
 */
type State = LargeVideoCompState;

class LargeAvatarStatic extends LargeVideoComp<Props, State> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            avatarSize,
            useConnectivityInfoLabel
        } = this.state;
        const {
            _participantId,
            _styles,
            onClick
        } = this.props;

        return (
            <DimensionsDetector
                onDimensionsChanged = { this._onDimensionsChanged }>
                <ParticipantViewStatic
                    avatarSize = { avatarSize }
                    onPress = { onClick }
                    participantId = { _participantId }
                    style = { _styles.largeVideo }
                    testHintId = 'org.jitsi.meet.LargeVideo'
                    useConnectivityInfoLabel = { useConnectivityInfoLabel }
                    zOrder = { 0 }
                    zoomEnabled = { true }
                    {...this.props}
                    />
            </DimensionsDetector>
        );
    }
}

export default LargeAvatarStatic;