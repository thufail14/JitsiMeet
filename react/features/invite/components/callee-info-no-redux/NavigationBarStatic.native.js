// @flow

import React, { Component } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import type {Props as NavigationBarCompProps} from '../../../conference/components/native/NavigationBar';
import styles from '../../../conference/components/native/styles';
import PictureInPictureButtonStatic from "./buttons/PictureInPictureButtonStatic";
import OverflowMenuButtonStatic from './buttons/OverflowMenuButtonStatic';

class NavigationBarStatic extends Component<NavigationBarCompProps> {


    render(){
        const { buttonStylesBorderless, toggledButtonStyles } = this.props.toolBoxStyles;
        return [
            <View
                key = { 2 }
                pointerEvents = 'box-none'
                style = {{...styles.navBarWrapper,...{
                justifyContent:'center'}}}>
                     <View style={styles.navBarPipWrapper}>
                        <PictureInPictureButtonStatic
                            {...this.props}
                            styles = {styles.navBarButton} />
                    </View>
                    <View style = {styles.navBarOverflowMenuWrapper}>
                        <OverflowMenuButtonStatic
                            styles = {buttonStylesBorderless}
                            toggledStyles = { toggledButtonStyles }
                            />
                    </View>
            </View>
            
            
        ];
    }

}


export default NavigationBarStatic;
