// @flow

import React, { PureComponent } from 'react';

import { IconShareDesktop } from '../../icons';
import { getParticipantById } from '../../participants';
import { connect } from '../../redux';


import AvatarComp from './AvatarComp';
import type { Props as AvatarCompProps, State as AvatarCompState } from './AvatarComp';

export type Props = AvatarCompProps;

type State = AvatarCompState;

/**
 * Implements a class to render avatars in the app.
 */
class Avatar<P: Props> extends AvatarComp<P, State> {}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the component.
 * @returns {Props}
 */
export function _mapStateToProps(state: Object, ownProps: Props) {
    const { colorBase, displayName, participantId } = ownProps;
    const _participant: ?Object = participantId && getParticipantById(state, participantId);
    const _initialsBase = _participant?.name ?? displayName;
    const screenShares = state['features/video-layout'].screenShares || [];

    let _loadableAvatarUrl = _participant?.loadableAvatarUrl;

    if (participantId && screenShares.includes(participantId)) {
        _loadableAvatarUrl = IconShareDesktop;
    }

    return {
        _initialsBase,
        _loadableAvatarUrl,
        colorBase: !colorBase && _participant ? _participant.id : colorBase,
        callInfo: state['features/callinfo'],
        _isLocalParticipant:Boolean(_participant && _participant.local)
    };
}

export default connect(_mapStateToProps)(Avatar);
