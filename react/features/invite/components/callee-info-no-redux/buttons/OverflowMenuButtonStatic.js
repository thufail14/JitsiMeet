// @flow
import { IconMenuThumb } from '../../../../base/icons';
import { AbstractButton } from '../../../../base/toolbox';
import type { Props as AbstractButtonProps } from '../../../../base/toolbox';

/**
 * An implementation of a button for showing the {@code OverflowMenu}.
 */
class OverflowMenuButtonStatic extends AbstractButton<AbstractButtonProps, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.moreActions';
    icon = IconMenuThumb;
    label = 'toolbar.moreActions';

    /**
     * Handles clicking / pressing this {@code OverflowMenuButton}.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        // this.props.dispatch(openDialog(OverflowMenu));
    }
}

export default OverflowMenuButtonStatic;
