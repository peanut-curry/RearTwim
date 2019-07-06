import React, { Component } from 'react';
import { Image, Button, Text } from 'react-native-elements';
import { View, StyleSheet, Animated } from 'react-native';

export default class LoginScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    render(){
        return(
            <View style={loginStyles.container}>
                <View style={loginStyles.topContainer}></View>
                <View style={loginStyles.mainContainer}>
                    <Image source={require('../assets/LOGO.png')}
                        style={{ width: 80, height:85, alignSelf:'center', marginBottom:10 }}
                    ></Image>
                    <Text style={loginStyles.text}>
                        Travel with map,{"\n"}
                        Travel with me,{"\n"}
                        Twim
                    </Text>
                </View>
                <View style={loginStyles.mainContainer}>
                    <Button title="Log in with Naver"
                        buttonStyle={loginStyles.naverLoginButton}></Button>
                    <Button title="Log in with Twim" 
                        buttonStyle={loginStyles.twimLoginButton}></Button>
                </View>
                <View style={loginStyles.bottomContainer}></View>
            </View>
        );
    }
}

const loginStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    topContainer:{
        flex:2,
        backgroundColor: 'white'
    },
    mainContainer:{
        flex: 4,
        backgroundColor: 'white',
        justifyContent:'center'
    },
    bottomContainer:{
        flex:1,
        backgroundColor: 'white',
    },
    naverLoginButton:{
        marginHorizontal: '8%',
        marginVertical: 10,
        backgroundColor: '#2DB400',
        borderRadius : 90
    },
    twimLoginButton:{
        marginHorizontal: '8%',
        marginVertical: 10,
        backgroundColor: '#23C3B8',
        borderRadius : 90
    },
    text:{
        alignSelf:'center',
        color: '#303030',
        textAlign: 'center',
        fontSize: 20
    }
})