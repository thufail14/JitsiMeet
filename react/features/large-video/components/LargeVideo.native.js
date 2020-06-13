// @flow

import React, { Component } from 'react';

import { ColorSchemeRegistry } from '../../base/color-scheme';
import { ParticipantView } from '../../base/participants';
import { connect } from '../../base/redux';
import { DimensionsDetector } from '../../base/responsive-ui';
import { StyleType } from '../../base/styles';

import LargeVideoComp from './LargeVideoComp';
import type { Props as LargeVideoCompProps, State as LargeVideoCompState }  from './LargeVideoComp';

/**
 * The type of the React {@link Component} props of {@link LargeVideo}.
 */
type Props = LargeVideoCompProps;

/**
 * The type of the React {@link Component} state of {@link LargeVideo}.
 */
type State = LargeVideoCompState;

/**
 * Implements a React {@link Component} which represents the large video (a.k.a.
 * the conference participant who is on the local stage) on mobile/React Native.
 *
 * @extends Component
 */
class LargeVideo extends LargeVideoComp<Props, State> {

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
                <ParticipantView
                    avatarSize = { avatarSize }
                    onPress = { onClick }
                    participantId = { _participantId }
                    style = { _styles.largeVideo }
                    testHintId = 'org.jitsi.meet.LargeVideo'
                    useConnectivityInfoLabel = { useConnectivityInfoLabel }
                    zOrder = { 0 }
                    zoomEnabled = { true } />
            </DimensionsDetector>
        );
    }

}

/**
 * Maps (parts of) the Redux state to the associated LargeVideo's props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {{
 *     _participantId: string,
 *     _styles: StyleType
 * }}
 */
function _mapStateToProps(state) {
    return {
        _participantId: state['features/large-video'].participantId,
        _styles: ColorSchemeRegistry.get(state, 'LargeVideo')
    };
}

export default connect(_mapStateToProps)(LargeVideo);
