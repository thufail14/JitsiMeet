import { APP_WILL_MOUNT, APP_WILL_UNMOUNT } from '../base/app';
import {
    CONFERENCE_WILL_JOIN,
    CONFERENCE_WILL_LEAVE,
    DEFAULT_CALL_MODE,
    CALL_MODE_ONETOONE
} from '../base/conference';
import {getFeatureFlag, CALL_MODE} from "../base/flags";
import {
    getLocalParticipant,
    PARTICIPANT_JOINED
} from '../base/participants';

import { MiddlewareRegistry } from '../base/redux';
import {
    playSound,
    registerSound,
    stopSound,
    unregisterSound
} from '../base/sounds';
import {
    OUTGOING_CALL_RINGING_SOUND_ID
} from './constants';
import { CALL_TYPE_OUTGOING, CONNECTED_USER, RINGING } from '../presence-status';
import { isCallModeNeedRing, isStillRinging } from './functions';
import { updateCallInfo } from './actions';


/**
 * The middleware of the feature to play ringing tone unitl user pick-up the call
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const result = next(action);
    switch (action.type) {
        case APP_WILL_MOUNT:
            store.dispatch(registerSound(OUTGOING_CALL_RINGING_SOUND_ID, 'outgoingRinging.wav', { loop: true }));
            break;

        case APP_WILL_UNMOUNT:
            store.dispatch(stopSound(OUTGOING_CALL_RINGING_SOUND_ID));
            store.dispatch(unregisterSound(OUTGOING_CALL_RINGING_SOUND_ID));
            break;

        case CONFERENCE_WILL_JOIN:
            let callInfo = store.getState()['features/callinfo'];
            if(callInfo.callType === CALL_TYPE_OUTGOING && isCallModeNeedRing(callInfo.callMode)){
                store.dispatch(playSound(OUTGOING_CALL_RINGING_SOUND_ID));
                store.dispatch(updateCallInfo({callStatus:RINGING}));
            }
            break;

        case CONFERENCE_WILL_LEAVE:
            store.dispatch(stopSound(OUTGOING_CALL_RINGING_SOUND_ID));
            break;

        case PARTICIPANT_JOINED:
            let callInfo1 = store.getState()['features/callinfo']; 
            if(callInfo1.callType === CALL_TYPE_OUTGOING && isStillRinging(callInfo1.callStatus)){
                store.dispatch(updateCallInfo({callStatus:CONNECTED_USER}));
            }
            store.dispatch(stopSound(OUTGOING_CALL_RINGING_SOUND_ID));
            break;
    }

    return result;
});