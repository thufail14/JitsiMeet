import React, { PureComponent, Component } from 'react';
import { AbstractVideoMuteButton } from '../../../../base/toolbox';
import type { Props as VideoButtonProps } from '../../../../base/toolbox';

class VideoMuteButtonStatic extends AbstractVideoMuteButton<VideoButtonProps, *>{
    accessibilityLabel = 'toolbar.accessibilityLabel.videomute';
    label = 'toolbar.videomute';
    tooltip = 'toolbar.videomute';

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
    _isVideoMuted() {
        return Boolean(this.props.startAudioOnly);
    }

    /**
     * Changes the muted state.
     *
     * @param {boolean} audioMuted - Whether audio should be muted or not.
     * @protected
     * @returns {void}
     */
    _setVideoMuted(audioMuted: boolean) {
        // can not implement enable/disable video. Because we don't have video track here.
    }

    /**
     * Return a boolean value indicating if this button is disabled or not.
     *
     * @returns {boolean}
     */
    _isDisabled() {
        // return true;
    }
}

export default VideoMuteButtonStatic;