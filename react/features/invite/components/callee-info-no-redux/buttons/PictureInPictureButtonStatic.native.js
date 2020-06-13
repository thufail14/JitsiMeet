import { Platform } from 'react-native';
import { AbstractButton } from '../../../../base/toolbox';
import type { Props as TPictureInPictureButtonProps } from '../../../../base/toolbox';
import { IconMenuDown } from '../../../../base/icons';
import { PIP_ENABLED } from '../../../../base/flags';

class PictureInPictureButtonStatic extends AbstractButton<TPictureInPictureButtonProps, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.pip';
    icon = IconMenuDown;
    label = 'toolbar.pip';

    /**
     * Handles clicking / pressing the button.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        return false;
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {React$Node}
     */
    render() {
        const flag = this.props.flags && this.props.flags[PIP_ENABLED];
        let enabled = Boolean(flag);

        if(Platform.OS === 'android' && Platform.Version < 26){
            enabled = false;
        }
        
        return enabled ? super.render() : null;
    }
    
}

export default PictureInPictureButtonStatic;