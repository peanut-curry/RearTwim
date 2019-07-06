import React, {Component} from 'react';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    Home: StartScreen,
    Login: LoginScreen
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