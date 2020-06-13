// @flow
import { IconAudioRoute } from '../../../../base/icons';
import { AbstractButton } from '../../../../base/toolbox';
import type { Props as AbstractButtonProps } from '../../../../base/toolbox';

// import AudioRoutePickerDialog from './AudioRoutePickerDialog';

/**
 * A toolbar button which triggers an audio route picker when pressed.
 */
class AudioRouteButtonStatic extends AbstractButton<AbstractButtonProps, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.audioRoute';
    icon = IconAudioRoute;
    label = 'toolbar.audioRoute';

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        // this.props.dispatch(openDialog(AudioRoutePickerDialog));
    }
}

export default AudioRouteButtonStatic;
