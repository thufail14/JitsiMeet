import React, { PureComponent, Component } from 'react';
import { AbstractButton } from '../../../../base/toolbox';
import type { Props as ToggleCameraButtonProps } from '../../../../base/toolbox';
import { IconSwitchCamera } from '../../../../base/icons';

class ToggleCameraButtonStatic extends AbstractButton<ToggleCameraButtonProps, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.toggleCamera';
    icon = IconSwitchCamera;
    label = 'toolbar.toggleCamera';

    /**
     * Indicates whether this button is disabled or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isDisabled() {
        return true;
    }
    
}

export default ToggleCameraButtonStatic;