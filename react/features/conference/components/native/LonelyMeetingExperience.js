// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';
import { translate } from '../../../base/i18n';
import { getParticipantCount } from '../../../base/participants';
import { doInvitePeople } from '../../../invite/actions.native';

import styles from './styles';
import { Icon, IconAddPeople } from '../../../base/icons';
import { CALL_MODE, getFeatureFlag } from '../../../base/flags';
import { getCallTypeName, DEFAULT_CALL_MODE } from '../../../base/conference';
import {OUTGOING_CALL_RINGING_SOUND_ID} from "../../../invite/constants";

/**
 * Props type of the component.
 */
type Props = {

    /**
     * True if the invite functions (dial out, invite, share...etc) are disabled.
     */
    _isInviteFunctionsDiabled: boolean,

    /**
     * True if it's a lonely meeting (participant count excluding fakes is 1).
     */
    _isLonelyMeeting: boolean,

    /**
     * Color schemed styles of the component.
     */
    _styles: StyleType,

    /**
     * The Redux Dispatch function.
     */
    dispatch: Function,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function,
    /**
     * True if ringing tone is playing.
     */
    _ringing:boolean
};

/**
 * Implements the UI elements to be displayed in the lonely meeting experience.
 */
class LonelyMeetingExperience extends PureComponent<Props> {
    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _isInviteFunctionsDiabled, _isLonelyMeeting, _styles, t, _callMode, _ringing } = this.props;

        if (!_isLonelyMeeting) {
            return null;
        }

        return (
            <View style = { styles.lonelyMeetingContainer }>
                {/* {_ringing && <Text
                    style = { [
                        styles.lonelyMessage,
                        _styles.lonelyMessage
                    ] }>
                    { t('presenceStatus.ringing') }
                </Text>
                } */}
                <Text
                    style = { [
                        styles.lonelyMessage,
                        _styles.lonelyMessage,
                        {display:'none'}
                    ] }>
                    { t('lonelyMeetingExperience.youAreAlone', {
                            callMode: getCallTypeName(_callMode)
                        }) }
                </Text>
                { !_isInviteFunctionsDiabled && (
                    <TouchableOpacity
                        onPress = { this._onPress }
                        style = { [
                            styles.lonelyButton,
                            _styles.lonelyButton
                        ] }>
                        <Icon
                            size = { 24 }
                            src = { IconAddPeople }
                            style = { styles.lonelyButtonComponents } />
                        <Text
                            style = { [
                                styles.lonelyButtonComponents,
                                _styles.lonelyMessage
                            ] }>
                            { t('lonelyMeetingExperience.button') }
                        </Text>
                    </TouchableOpacity>
                ) }
            </View>
        );
    }

    _onPress: () => void;

    /**
     * Callback for the onPress function of the button.
     *
     * @returns {void}
     */
    _onPress() {
        this.props.dispatch(doInvitePeople());
    }
}

/**
 * Maps parts of the Redux state to the props of this Component.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state): $Shape<Props> {
    const { disableInviteFunctions } = state['features/base/config'];
    const sounds = state['features/base/sounds'];
    const sound = (sounds && sounds.get(OUTGOING_CALL_RINGING_SOUND_ID)) || undefined;
    return {
        _isInviteFunctionsDiabled: true,
        _isLonelyMeeting: getParticipantCount(state) === 1,
        _styles: ColorSchemeRegistry.get(state, 'Conference'),
        _callMode: getFeatureFlag(state, CALL_MODE, DEFAULT_CALL_MODE),
        _ringing:sound && sound.audioElement && sound.audioElement._sound && sound.audioElement._sound._playing
    };
}

export default connect(_mapStateToProps)(translate(LonelyMeetingExperience));
