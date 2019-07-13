import React, {Component} from 'react';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    Home: StartScreen,
    Login: LoginScreen,
    Main: MainScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}