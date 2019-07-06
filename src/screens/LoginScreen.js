import React, { Component } from 'react';
import { Image, Button, Divider } from 'react-native-elements';
import { View, StyleSheet, Text } from 'react-native';
import TextInput from '../components/TextInput';

export default class LoginScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    render(){
        return(
            <View style={loginStyles.container}>
                <View style={loginStyles.topContainer}></View>
                <View style={loginStyles.topContainer}>
                <Image source={require('../assets/LOGO.png')}
                        style={{ width: 80, height:85, alignSelf:'center', marginBottom:10 }}></Image>
                </View>

                <View style={loginStyles.loginTwimContainer}>
                    <TextInput placeholder='Email Address'
                        iconSrc={require('../assets/mail.png')} ></TextInput>
                    <TextInput placeholder='Password' 
                        iconSrc={require('../assets/lock.png')}></TextInput>
                    <Button title="Log in with Twim" titleStyle={loginStyles.buttonText}
                        buttonStyle={loginStyles.twimLoginButton}></Button>
                    <View style={{flexDirection:"row"}} alignSelf='center' justifyContent='center'>
                        <Text style={loginStyles.smallText} >Sign up</Text>
                        <Text style={loginStyles.smallText} >Forgot password?</Text>
                    </View>
                </View>
                
                <View style={loginStyles.loginNaverContainer}>
                    <Divider style={{ backgroundColor: '#DEDEDE', height: 1.5 }} />
                    <Button title="Log in with Naver"
                        buttonStyle={loginStyles.naverLoginButton}></Button>
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
    loginTwimContainer:{
        flex: 2.7,
        backgroundColor: 'white',
        justifyContent:'center',
        marginHorizontal: '5%'
    },
    loginNaverContainer:{
        flex: 1.3,
        backgroundColor: 'white',
        justifyContent:'flex-start',
        marginHorizontal: '5%'
    },
    naverLoginButton:{
        marginHorizontal: '12%',
        backgroundColor: '#2DB400',
        marginTop: 15,
        borderRadius : 90
    },
    twimLoginButton:{
        marginHorizontal: '12%',
        marginVertical: 15,
        backgroundColor: '#23C3B8',
        borderRadius : 90
    },
    smallText:{
        textDecorationLine: 'underline',
        color: '#AEABAB', 
        marginHorizontal: '4%',
        marginVertical: '1%'
    },
    buttonText:{
        fontSize: 18
    }
})