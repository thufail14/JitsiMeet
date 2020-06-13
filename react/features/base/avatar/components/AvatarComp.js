// @flow

import React, { PureComponent } from 'react';

import { getAvatarColor, getInitials, ONETOONE_PARTICIPANT_AVATAR_COLOR, ONETOONE_LOCAL_USER_AVATAR_COLOR } from '../functions';

import { StatelessAvatar } from '.';

import { isOutGoingCall, isStillRinging, getCallInfoUsersName, getCallInfoUserAvatar } from '../../../invite';
import { CALL_TYPE_OUTGOING } from '../../../presence-status';
import {CALL_MODE_ONETOONE} from "../../conference";

export type Props = {

    /**
     * The string we base the initials on (this is generated from a list of precendences).
     */
    _initialsBase: ?string,

    /**
     * An URL that we validated that it can be loaded.
     */
    _loadableAvatarUrl: ?string,

    /**
     * A prop to maintain compatibility with web.
     */
    className?: string,

    /**
     * A string to override the initials to generate a color of. This is handy if you don't want to make
     * the background color match the string that the initials are generated from.
     */
    colorBase?: string,

    /**
     * Display name of the entity to render an avatar for (if any). This is handy when we need
     * an avatar for a non-participasnt entity (e.g. a recent list item).
     */
    displayName?: string,

    /**
     * ID of the element, if any.
     */
    id?: string,

    /**
     * The ID of the participant to render an avatar for (if it's a participant avatar).
     */
    participantId?: string,

    /**
     * The size of the avatar.
     */
    size: number,

    /**
     * One of the expected status strings (e.g. 'available') to render a badge on the avatar, if necessary.
     */
    status?: ?string,

    /**
     * URL of the avatar, if any.
     */
    url: ?string,
}

export type State = {
    avatarFailed: boolean
}

export const DEFAULT_SIZE = 65;

/**
 * Implements a class to render avatars in the app.
 */
class AvatarComp<P: Props> extends PureComponent<P, State> {
    /**
     * Instantiates a new {@code Component}.
     *
     * @inheritdoc
     */
    constructor(props: P) {
        super(props);

        this.state = {
            avatarFailed: false
        };

        this._onAvatarLoadError = this._onAvatarLoadError.bind(this);
    }

    /**
     * Implements {@code Component#componentDidUpdate}.
     *
     * @inheritdoc
     */
    componentDidUpdate(prevProps: P) {
        if (prevProps.url !== this.props.url) {

            // URI changed, so we need to try to fetch it again.
            // Eslint doesn't like this statement, but based on the React doc, it's safe if it's
            // wrapped in a condition: https://reactjs.org/docs/react-component.html#componentdidupdate

            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                avatarFailed: false
            });
        }
    }

    /**
     * Implements {@code Componenr#render}.
     *
     * @inheritdoc
     */
    render() {
        let {
            _initialsBase,
            _loadableAvatarUrl,
            className,
            colorBase,
            id,
            size,
            status,
            url,
            callInfo,
            _isLocalParticipant
        } = this.props;
        const { avatarFailed } = this.state;

        const avatarProps = {
            className,
            color: undefined,
            id,
            initials: undefined,
            onAvatarLoadError: undefined,
            size,
            status,
            url: undefined
        };

        // _loadableAvatarUrl is validated that it can be loaded, but uri (if present) is not, so
        // we still need to do a check for that. And an explicitly provided URI is higher priority than
        // an avatar URL anyhow.
        let effectiveURL = (!avatarFailed && url) || _loadableAvatarUrl;

        // If it's ringing state, then display the callee information in avatar & intials
        // That's what we overwrite here
        if(isOutGoingCall(callInfo.callType) && isStillRinging(callInfo.callStatus)){
            _initialsBase = callInfo.callMode === CALL_MODE_ONETOONE ? getInitials(getCallInfoUsersName(callInfo.users)) : null;
            effectiveURL = !avatarFailed ? getCallInfoUserAvatar(callInfo.users) : effectiveURL; 
        }

        if (effectiveURL) {
            avatarProps.onAvatarLoadError = this._onAvatarLoadError;
            avatarProps.url = effectiveURL;
        }

        const initials = getInitials(_initialsBase);

        if (initials) {
            avatarProps.color = getAvatarColor(colorBase || _initialsBase);
            avatarProps.initials = initials;
        }
        
        // set the static color to avatar for onetoone call meo user
        // to avoid color change when switch calling screen
        if(callInfo && callInfo.callMode === CALL_MODE_ONETOONE){
            avatarProps.color = !isStillRinging(callInfo.callStatus) && _isLocalParticipant ? ONETOONE_LOCAL_USER_AVATAR_COLOR : ONETOONE_PARTICIPANT_AVATAR_COLOR;
        }

        return (
            <StatelessAvatar
                { ...avatarProps } />
        );
    }

    _onAvatarLoadError: () => void;

    /**
     * Callback to handle the error while loading of the avatar URI.
     *
     * @returns {void}
     */
    _onAvatarLoadError() {
        this.setState({
            avatarFailed: true
        });
    }
}

export default AvatarComp;
