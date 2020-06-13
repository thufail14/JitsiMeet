import React, { PureComponent, Component } from 'react';
import _ from 'lodash';
import { AbstractHangupButton } from '../../../../base/toolbox';
import type { Props as HangupButtonProps } from '../../../../base/toolbox';
import { sendEvent } from "../../../../mobile/external-api"

class HangupButtonStatic extends AbstractHangupButton<HangupButtonProps, *> {
    _hangup: Function;

    accessibilityLabel = 'toolbar.accessibilityLabel.hangup';
    label = 'toolbar.hangup';
    tooltip = 'toolbar.hangup';
    iconText='end';

    /**
     * Initializes a new HangupButton instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._hangup = _.once(() => {
                const state = {
                    'features/base/app':{
                        'app':{
                            'props':{
                                'externalAPIScope': props.externalAPIScope
                            }
                        }
                    }
                }
                sendEvent(state, 'CONFERENCE_WILL_LEAVE', {
                    appJid: (props.userInfo && props.userInfo.appJid) || ''
                });
        });
    }

    /**
     * Helper function to perform the actual hangup action.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _doHangup() {
        if(this.props.externalAPIScope){
            this._hangup();
        }
    }

    
}

export default HangupButtonStatic;