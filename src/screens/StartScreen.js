import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity, View } from 'react-native';

export default class MainScreen extends Component {
    //callFun = () => {alret("change screen to mainscreen!") ;}

    render() {
        /*
        let logo = {
            //uri: 'https://github.com/peanut-curry/Twim/blob/master/src/assets/LOGO.png'
            uri: "../"
        };
        let subtitle = {
            uri: 'https://github.com/peanut-curry/Twim/blob/master/src/assets/SUBTITLE.png'
        };
        let start = {
            uri: 'https://github.com/peanut-curry/Twim/blob/master/src/assets/STARTBUTTON.png'
        };
        */
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/LOGO.png')} 
                style={{ alignItems: 'center' }} />
            <Image source={require('../assets/SUBTITLE.png')} 
                style={{ alignItems: 'center' }} />
            <TouchableOpacity activeOpacity={0.5} onPress={this.callFun}>
                <Image source={require('../assets/STARTBUTTON.png')} 
                    //style={styles.ImageClass}/>
                    style={{ alignItems: 'center' }}/>
            </TouchableOpacity>
      </View>
        );
    }
}
