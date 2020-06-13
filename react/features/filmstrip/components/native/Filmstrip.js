// @flow

import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { Container, Platform } from '../../../base/react';
import { connect } from '../../../base/redux';
import {
    isNarrowAspectRatio,
    makeAspectRatioAware
} from '../../../base/responsive-ui';

import { isFilmstripVisible } from '../../functions';

import LocalThumbnail from './LocalThumbnail';
import styles from './styles';
import Thumbnail from './Thumbnail';
import { CALL_MODE, getFeatureFlag } from '../../../base/flags';
import { DEFAULT_CALL_MODE, CALL_MODE_ONETOONE } from '../../../base/conference';

/**
 * Filmstrip component's property types.
 */
type Props = {

    /**
     * The indicator which determines whether the filmstrip is enabled.
     *
     * @private
     */
    _enabled: boolean,

    /**
     * The participants in the conference.
     *
     * @private
     */
    _participants: Array<any>,

    /**
     * All participants in the conference.
     *
     * @private
     */
    _allParticipants: Array<any>,

    /**
     * The indicator which determines whether the filmstrip is visible.
     *
     * @private
     */
    _visible: boolean,
    /**
     * Contains the large video participants details
     * 
     * @private
     */
    _largeVideo: object
};

/**
 * Implements a React {@link Component} which represents the filmstrip on
 * mobile/React Native.
 *
 * @extends Component
 */
class Filmstrip extends Component<Props> {
    /**
     * Whether the local participant should be rendered separately from the
     * remote participants i.e. outside of their {@link ScrollView}.
     */
    _separateLocalThumbnail: boolean;

    /**
     * Constructor of the component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        // XXX Our current design is to have the local participant separate from
        // the remote participants. Unfortunately, Android's Video
        // implementation cannot accommodate that because remote participants'
        // videos appear on top of the local participant's video at times.
        // That's because Android's Video utilizes EGL and EGL gives us only two
        // practical layers in which we can place our participants' videos:
        // layer #0 sits behind the window, creates a hole in the window, and
        // there we render the LargeVideo; layer #1 is known as media overlay in
        // EGL terms, renders on top of layer #0, and, consequently, is for the
        // Filmstrip. With the separate LocalThumnail, we should have left the
        // remote participants' Thumbnails in layer #1 and utilized layer #2 for
        // LocalThumbnail. Unfortunately, layer #2 is not practical (that's why
        // I said we had two practical layers only) because it renders on top of
        // everything which in our case means on top of participant-related
        // indicators such as moderator, audio and video muted, etc. For now we
        // do not have much of a choice but to continue rendering LocalThumbnail
        // as any other remote Thumbnail on Android.
        this._separateLocalThumbnail = Platform.OS !== 'android';
    }
    /**
     * Handle, when 2 participants only connected should not display the remote user in thumbnail
     * & when user click thumbnail participant, should switch the participant between large video & thumbnail
     * 
     * @param {bool}
     * @return {bool}
     */
    displayThumbnail = (isRemote) => {
        const _allParticipants = (Array.isArray(this.props._allParticipants) && this.props._allParticipants) || [];
        if(_allParticipants.length === 2 && this.props._callMode === CALL_MODE_ONETOONE){
            if(isRemote){
                const remoteParticipants = _allParticipants.filter(p => !p.local);
                const remoteParticapantId = (remoteParticipants && remoteParticipants[0] && remoteParticipants[0].id) || null;
                return remoteParticapantId != this.props._largeVideo.participantId;
            }
            const localParticipants = _allParticipants.filter(p => p.local);
            const localParticapantId = (localParticipants && localParticipants[0] && localParticipants[0].id) || null;
            return localParticapantId != this.props._largeVideo.participantId;
        }
        return true; 
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        if (!this.props._enabled) {
            return null;
        }

        const isNarrowAspectRatio_ = isNarrowAspectRatio(this);
        const filmstripStyle
            = isNarrowAspectRatio_
                ? styles.filmstripNarrow
                : styles.filmstripWide;

        return (
            <Container
                style = { filmstripStyle }
                visible = { this.props._visible }>
                {
                    this._separateLocalThumbnail
                        && !isNarrowAspectRatio_
                        && this.displayThumbnail()
                        && <LocalThumbnail />
                }
                <ScrollView
                    horizontal = { isNarrowAspectRatio_ }
                    showsHorizontalScrollIndicator = { false }
                    showsVerticalScrollIndicator = { false }
                    style = { styles.scrollView } >
                    {
                        !this._separateLocalThumbnail
                            && !isNarrowAspectRatio_
                            && this.displayThumbnail()
                            && <LocalThumbnail />
                    }
                    {
                        this.displayThumbnail(true) && this._sort(
                                this.props._participants,
                                isNarrowAspectRatio_)
                            .map(p => (
                                <Thumbnail
                                    key = { p.id }
                                    participant = { p } />))
                    }
                    {
                        !this._separateLocalThumbnail
                            && isNarrowAspectRatio_
                            && this.displayThumbnail()
                            && <LocalThumbnail />
                    }
                </ScrollView>
                {
                    this._separateLocalThumbnail
                        && isNarrowAspectRatio_
                        && this.displayThumbnail()
                        && <LocalThumbnail />
                }
            </Container>
        );
    }

    /**
     * Sorts a specific array of {@code Participant}s in display order.
     *
     * @param {Participant[]} participants - The array of {@code Participant}s
     * to sort in display order.
     * @param {boolean} isNarrowAspectRatio_ - Indicates if the aspect ratio is
     * wide or narrow.
     * @private
     * @returns {Participant[]} A new array containing the elements of the
     * specified {@code participants} array sorted in display order.
     */
    _sort(participants, isNarrowAspectRatio_) {
        // XXX Array.prototype.sort() is not appropriate because (1) it operates
        // in place and (2) it is not necessarily stable.

        const sortedParticipants = [
            ...participants
        ];

        if (isNarrowAspectRatio_) {
            // When the narrow aspect ratio is used, we want to have the remote
            // participants from right to left with the newest added/joined to
            // the leftmost side. The local participant is the leftmost item.
            sortedParticipants.reverse();
        }

        return sortedParticipants;
    }
}

/**
 * Maps (parts of) the redux state to the associated {@code Filmstrip}'s props.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {{
 *     _participants: Participant[],
 *     _visible: boolean
 * }}
 */
function _mapStateToProps(state) {
    const participants = state['features/base/participants'];
    const { enabled } = state['features/filmstrip'];

    return {
        _callMode: getFeatureFlag(state, CALL_MODE, DEFAULT_CALL_MODE),
        /**
         * All participants in the conference.
         *
         * @private
         * @type {Participant[]}
         */
        _allParticipants: participants,
        /**
         * Contains the large video participants details
         * 
         * @private
         * @type {object}
         */
        _largeVideo: state['features/large-video'],
        /**
         * The indicator which determines whether the filmstrip is enabled.
         *
         * @private
         * @type {boolean}
         */
        _enabled: enabled,

        /**
         * The remote participants in the conference.
         *
         * @private
         * @type {Participant[]}
         */
        _participants: participants.filter(p => !p.local),

        /**
         * The indicator which determines whether the filmstrip is visible. The
         * mobile/react-native Filmstrip is visible when there are at least 2
         * participants in the conference (including the local one).
         *
         * @private
         * @type {boolean}
         */
        _visible: isFilmstripVisible(state)
    };
}

export default connect(_mapStateToProps)(makeAspectRatioAware(Filmstrip));
