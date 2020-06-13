// @flow

import { openDialog } from '../../../base/dialog';
import { JitsiRecordingConstants } from '../../../base/lib-jitsi-meet';
import { getLocalParticipant } from '../../../base/participants';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox';
import {
    createLiveStreamingDialogEvent,
    sendAnalytics
} from '../../../analytics';
import { getActiveSession } from '../../functions';
import { getBackendSafeRoomName } from '../../../base/util';

import {
    StartLiveStreamDialog,
    StopLiveStreamDialog
} from './_';
import InfoDialog from '../../../invite/components/info-dialog/web/InfoDialog';


/**
 * The type of the React {@code Component} props of
 * {@link AbstractLiveStreamButton}.
 */
export type Props = AbstractButtonProps & {

    /**
     * True if there is a running active live stream, false otherwise.
     */
    _isLiveStreamRunning: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function,

    /**
     * The i18n translate function.
     */
    t: Function
};

/**
 * An abstract class of a button for starting and stopping live streaming.
 */
export default class AbstractLiveStreamButton<P: Props>
    extends AbstractButton<P, *> {
    accessibilityLabel = 'dialog.accessibilityLabel.liveStreaming';
    label = 'dialog.startLiveStreaming';
    toggledLabel = 'dialog.stopLiveStreaming';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const { _isLiveStreamRunning,_roomName, _dialIn } = this.props;
        if(!_isLiveStreamRunning) {
            let broadcasts = undefined
            let selectedBoundStreamID  = undefined;
            
            const key = _roomName.replace(/-/gi,'');
    
            if (!key) {
                return false;
            }
    
            let selectedBroadcastID = null;
    
            if (selectedBoundStreamID) {
                const selectedBroadcast = broadcasts && broadcasts.find(
                    broadcast => broadcast.boundStreamID === selectedBoundStreamID);
    
                selectedBroadcastID = selectedBroadcast && selectedBroadcast.id;
            }
    
            sendAnalytics(
                createLiveStreamingDialogEvent('start', 'confirm.button'));

             this.props.dispatch(openDialog(InfoDialog, {
                dialIn: _dialIn,
                liveStreamViewURL: true,
                isInlineDialog: false
            }));
            this.props._conference.startRecording({
                broadcastId: selectedBroadcastID,
                mode: JitsiRecordingConstants.mode.STREAM,
                streamId: key
            });
    
            return true;
        }else {
            sendAnalytics(createLiveStreamingDialogEvent('stop', 'confirm.button'));

            const { _session } = this.props;
    
            if (_session) {
                this.props._conference.stopRecording(_session.id);
            }
    
            return true;
        }
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._isLiveStreamRunning;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code AbstractLiveStreamButton} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the Component.
 * @private
 * @returns {{
 *     _isLiveStreamRunning: boolean,
 *     visible: boolean
 * }}
 */
export function _mapStateToProps(state: Object, ownProps: Props) {
    let { visible } = ownProps;

    // a button can be disabled/enabled only if enableFeaturesBasedOnToken
    // is on
    let disabledByFeatures;

    if (typeof visible === 'undefined') {
        // If the containing component provides the visible prop, that is one
        // above all, but if not, the button should be autonomus and decide on
        // its own to be visible or not.
        const {
            enableFeaturesBasedOnToken,
            liveStreamingEnabled
        } = state['features/base/config'];
        const { features = {} } = getLocalParticipant(state);

        visible = liveStreamingEnabled;

        if (enableFeaturesBasedOnToken) {
            visible = visible && String(features.livestreaming) === 'true';
            disabledByFeatures = String(features.livestreaming) === 'disabled';
        }
    }

    return {
        _isLiveStreamRunning: Boolean(
            getActiveSession(state, JitsiRecordingConstants.mode.STREAM)),
        disabledByFeatures,
        visible,
        _conference: state['features/base/conference'].conference,
        _streamKey: state['features/recording'].streamKey,
        _roomName: getBackendSafeRoomName(state['features/base/conference'].room),
        _session: getActiveSession(state, JitsiRecordingConstants.mode.STREAM),
        _dialIn: state['features/invite'],
        
            

    };
}
