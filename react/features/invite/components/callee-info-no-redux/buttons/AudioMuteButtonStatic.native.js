import React, { PureComponent, Component } from 'react';
import { AbstractAudioMuteButton } from '../../../../base/toolbox';
import type { Props as AudioButtonProps } from '../../../../base/toolbox';

class AudioMuteButtonStatic extends AbstractAudioMuteButton<AudioButtonProps, *>{
    accessibilityLabel = 'toolbar.accessibilityLabel.mute';
    label = 'toolbar.mute';
    tooltip = 'toolbar.mute';

    /**
     * Initializes a new {@code AudioMuteButton} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);
    }

    /**
     * Indicates if audio is currently muted ot nor.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isAudioMuted() {
        // return this.props._audioMuted;
    }

    /**
     * Changes the muted state.
     *
     * @param {boolean} audioMuted - Whether audio should be muted or not.
     * @protected
     * @returns {void}
     */
    _setAudioMuted(audioMuted: boolean) {
        // this.props.dispatch(muteLocal(audioMuted));
    }

    /**
     * Return a boolean value indicating if this button is disabled or not.
     *
     * @returns {boolean}
     */
    _isDisabled() {
        // return this.props._disabled;
    }
}

export default AudioMuteButtonStatic;