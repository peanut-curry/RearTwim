import React, {Component} from 'react';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import StartTripScreen from './StartTripScreen';
import EndTripScreen from './EndTripScreen';
import WriteTripScreen from './WriteTripScreen';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, Dimensions } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
//import DrawerNavigator from './DrawerNavigator';

var StatusBarHeight = StatusBar.currentHeight;
var {height, width} = Dimensions.get('window');
var HeaderHeight = height/9.0;

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
        isLoading: true,
        isLogin: false
    }
  }
  
  componentDidMount(){
    //로그인 여부를 확인.
    this.checkLogin();
  }

  checkLogin = async() =>{
    var Login = await GoogleSignin.isSignedIn();
    if (Login) this.setState({
      isLoading:false, isLogin:true
    })
    else this.setState({
      isLoading:false, isLogin:false
    })
  }


  render() {
    if (this.state.isLoading==true){
      //로딩중 컴포넌트 띄우기
      return null;
    }
    else{
      //로그인 여부에 따라 initial 결정
      var initialRoute= (this.state.isLogin)? "Main":"Start";
      const AppNavigator = createStackNavigator(
      {
        Start: StartScreen,
        Login: LoginScreen,
        Main: MainScreen,
        StartTrip: StartTripScreen,
        EndTrip: EndTripScreen,
        WriteTrip: WriteTripScreen
      },
      {
        initialRouteName: initialRoute,
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#FCEB50',
            paddingTop: StatusBarHeight,
            height: HeaderHeight
          },
          headerBackground: (
            <LinearGradient
              colors={['#FCEB50', '#EF4058']}
              style={{ flex: 1 }}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              </LinearGradient>)
        }
      }
      );
      const AppContainer = createAppContainer(AppNavigator);
      return (<AppContainer />/*, <DrawerNavigator/>*/);
    }
  }
}