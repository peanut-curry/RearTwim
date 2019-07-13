import React, {Component} from 'react';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, Dimensions } from 'react-native';

var StatusBarHeight = StatusBar.currentHeight;
var {height, width} = Dimensions.get('window');
var HeaderHeight = height/9.0;

const AppNavigator = createStackNavigator(
  {
    Home: StartScreen,
    Login: LoginScreen,
    Main: MainScreen
  },
  {
    initialRouteName: "Home",
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

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}