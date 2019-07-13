import React, { Component } from 'react';
import { Image, Button } from 'react-native-elements';
import { View, StyleSheet, Text, StatusBar, Dimensions } from 'react-native';

export default class LoginScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    naverLoginClicked = () => {
        //네이버 로그인 코드 넣기
        this.props.navigation.navigate('Main');
    }
    googleLoginClicked = () => {
        //구글 로그인 코드 넣기
        this.props.navigation.navigate('Main');
    }

    render(){
        var {height, width} = Dimensions.get('window');
        var iconSize = width/4.0;
        var textMargin = iconSize/6.0;
        var buttonWidth = width/3.0*2.2;
        return(
            <View style={loginStyles.container}>
                <StatusBar backgroundColor="white" barStyle="dark-content" hidden={false}/>
                <View style={loginStyles.topContainer}></View>
                <View style={loginStyles.middleContainer}>
                    <Image style={{width:iconSize, height:iconSize}} source={require('../assets/logo.png')}></Image>
                    <Text style={{textAlign:'center', fontSize:20, textAlignVertical:'center', marginTop:textMargin}}>Travel with map,{'\n'}Travel with me,{'\n'}twim!</Text>
                </View>
                <View style={loginStyles.bottomContainer}>
                    <Button buttonStyle={loginStyles.naverLoginButton} containerStyle={{width:buttonWidth, marginBottom:textMargin}}
                        title="네이버로 로그인하기" onPress={this.naverLoginClicked}></Button>
                    <Button buttonStyle={loginStyles.googleLoginButton} containerStyle={{width:buttonWidth}}
                        title="Google로 로그인하기" onPress={this.googleLoginClicked}></Button>
                </View>
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
        flex:1,
        backgroundColor: 'white'
    },
    middleContainer:{
        flex:2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer:{
        flex:2.5,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems:'center'
    },
    naverLoginButton:{
        backgroundColor: '#2DB400',
        borderRadius : 90,
    },
    googleLoginButton:{
        backgroundColor: '#23C3B8',
        borderRadius : 90
    }
})