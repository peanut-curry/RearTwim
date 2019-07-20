import React, { Component } from 'react';
import { Image, Button } from 'react-native-elements';
import { View, StyleSheet, Text, StatusBar, Dimensions, ToastAndroid } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { AsyncStorage } from "react-native";

export default class LoginScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    tempLogin = () => {
        this.props.navigation.navigate('Main');
    }

    googleLoginClicked = async() => {
        try {
            //로그인 로딩 컴포넌트 띄우기  
            await GoogleSignin.configure({
                webClientId: "971126083783-ii32s55udvr060d2e6rgcv05h23mu95l.apps.googleusercontent.com",
                offlineAccess: false,
            });

            if (await GoogleSignin.isSignedIn()){
                ToastAndroid.show("이미 구글 계정으로 로그인 되었습니다.", ToastAndroid.SHORT);
                this.props.navigation.navigate('Main');
            }
            else{
                const data = await GoogleSignin.signIn();
                if (data==null){
                    ToastAndroid.show("구글 계정으로 로그인 중 문제가 발생했습니다.\n 다시 시도해주세요.", ToastAndroid.SHORT);
                }
                else{
                    //Send Credential
                    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
                    
                    //1.첫 로그인이라면,
                    await AsyncStorage.setItem("isTraveling", "false"); //여행중 아님

                    /*2. 첫 로그인이 아니라면
                    UserId를 이용해서 클라우드에서 유저의 기존 일지와 프로필을 동기화해야함.
                    기존 일지의 마지막 여행을 확인해서, AsyncStorage를 설정해야함.
                    */

                    //로딩중 컴포넌트 지우기
                    this.props.navigation.navigate('Main'); 
                }
            }
    
        } catch (e) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
                ToastAndroid.show("이미 로그인이 진행중입니다.",ToastAndroid.SHORT);} 
            else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                ToastAndroid.show("Twim을 이용하려면 GooglePlayService가 활성화되어야 합니다.",ToastAndroid.SHORT);
            } else{
                ToastAndroid.show("구글 계정으로 로그인 중 문제가 발생했습니다.\n 다시 시도해주세요.", ToastAndroid.SHORT);
            }
        }
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
                    <Image style={{width:iconSize, height:iconSize}} source={require('../assets/LOGO.png')}></Image>
                    <Text style={{textAlign:'center', fontSize:20, textAlignVertical:'center', marginTop:textMargin}}>Travel with map,{'\n'}Travel with me,{'\n'}twim!</Text>
                </View>
                <View style={loginStyles.bottomContainer}>
                    <Button title="로그인안하고 Main으로" onPress={this.tempLogin}></Button>
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