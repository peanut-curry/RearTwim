import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity, View } from 'react-native';

export default class MainScreen extends Component {
    callFun = () => {alret("change screen to mainscreen!") ;}

    render() {
        let logo = {
            uri: 'https://github.com/peanut-curry/Twim/blob/master/src/assets/LOGO.png'
        };
        let subtitle = {
            uri: 'https://github.com/peanut-curry/Twim/blob/master/src/assets/SUBTITLE.png'
        };
        let start = {
            uri: 'https://github.com/peanut-curry/Twim/blob/master/src/assets/STARTBUTTON.png'
        };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={logo} style={{ alignItems: 'center' }} />
            <Image source={subtitle} style={{ alignItems: 'center' }} />
            <TouchableOpacity activeOpacity={0.5} onPress={this.callFun}>
                <Image source={start} style={styles.ImageClass}/>
            </TouchableOpacity>
      </View>
        );
    }
}
