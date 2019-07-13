import React, { Component } from 'react';
import { Text, StatusBar, View, Image, TouchableOpacity, Dimensions } from 'react-native';

export default class MainScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        var iconSize = ((Dimensions.get('window').height/9.0)-StatusBar.currentHeight)*0.6;
        return {
            headerLeft:(
                <TouchableOpacity style={{justifyContent:'center', width:iconSize, height:iconSize, marginLeft:(iconSize/2.0)}}>
                    <Image style={{width:iconSize, height:iconSize}} source={require('../assets/menuIcon.png')}></Image>
                </TouchableOpacity>
            )
        };
      };

    render(){
        return(
            <View>
                <StatusBar backgroundColor={'transparent'} translucent={true} hidden={false} barStyle='dark-content'></StatusBar>
                <Text>MainScreen 입니다.</Text>
            </View>
        );
    }
}
