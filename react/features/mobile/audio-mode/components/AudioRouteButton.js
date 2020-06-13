// @flow

import { openDialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { IconAudioRoute } from '../../../base/icons';

import { connect } from '../../../base/redux';
import { AbstractButton } from '../../../base/toolbox';
import type { AbstractButtonProps } from '../../../base/toolbox';

import AudioRoutePickerDialog, {deviceInfoMap} from './AudioRoutePickerDialog';


export type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function used to open/show the
     * {@code AudioRoutePickerDialog}.
     */
    dispatch: Function
};

/**
 * A toolbar button which triggers an audio route picker when pressed.
 */
class AudioRouteButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.audioRoute';
    icon = IconAudioRoute;
    label = 'toolbar.audioRoute';

    constructor(props){
        super(props);
        this.state = {
            selectedDeviceType:'SPEAKER'
        }
    }

    /**
     * Implements {@code Component#componentDidUpdate}.
     *
     * @inheritdoc
     */
    componentDidUpdate(prevProps: P) {
        const device = this.props._devices.find(device => device.selected);
        if (device && device.type != this.state.selectedDeviceType) {
            this.icon = (deviceInfoMap[device.type] && deviceInfoMap[device.type].icon) || 'SPEAKER';
            this.setState({
                selectedDeviceType: device.type
            });
        }
    }

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(openDialog(AudioRoutePickerDialog));
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object}
 */
function _mapStateToProps(state) {
    return {
        _devices: state['features/mobile/audio-mode'].devices
    };
}

export default translate(connect(_mapStateToProps)(AudioRouteButton));
