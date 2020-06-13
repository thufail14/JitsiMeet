// @flow

import { NativeModules } from 'react-native';
import type { Dispatch } from 'redux';

import { PIP_ENABLED, getFeatureFlag } from '../../base/flags';
import { Platform } from '../../base/react';

import { ENTER_PICTURE_IN_PICTURE } from './actionTypes';
import logger from './logger';
import {setReducedUI, REDUCED_UI_THRESHOLD} from '../../base/responsive-ui';

/**
 * Enters (or rather initiates entering) picture-in-picture.
 * Helper function to enter PiP mode. This is triggered by user request
 * (either pressing the button in the toolbox or the home button on Android)
 * ans this triggers the PiP mode, iff it's available and we are in a
 * conference.
 *
 * @public
 * @returns {Function}
 */
export function enterPictureInPicture() {
    return (dispatch: Dispatch<any>, getState: Function) => {
        // XXX At the time of this writing this action can only be dispatched by
        // the button which is on the conference view, which means that it's
        // fine to enter PiP mode.
        if (getFeatureFlag(getState, PIP_ENABLED)) {
            const { PictureInPicture } = NativeModules;
            const p
                = Platform.OS === 'android'
                    ? PictureInPicture
                        ? PictureInPicture.enterPictureInPicture()
                        : Promise.reject(
                            new Error('Picture-in-Picture not supported'))
                    : Promise.resolve();

            p.then(
                () => {
                    let dimension = {};
                    if(Platform.OS != 'android'){
                        const reducedUI = getState()['features/base/responsive-ui'].reducedUI;
                        // If already in reduced UI or PIP mode, then we should set more dimValue to maximize the screen to full view.
                        // Otherwise set dimValue to 160.
                        const dimValue = reducedUI ? REDUCED_UI_THRESHOLD+100 : 160;
                        // If already in reduced UI or PIP mode, then we should set empty obj to send IOS native.
                        // Otherwise set resize dimValue object.
                        dimension = reducedUI ? {} : {width:dimValue,height:dimValue};
                        dispatch(setReducedUI(dimValue, dimValue));
                    }
                    dispatch({ type: ENTER_PICTURE_IN_PICTURE,dimension});
                },
                e => logger.warn(`Error entering PiP mode: ${e}`));
        }
    };
}
