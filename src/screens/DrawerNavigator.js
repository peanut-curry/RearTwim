import React, { Component } from 'react';
import { CreateDrawerNavigator, createAppContainer } from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';


const MyDrawerNavigator = CreateDrawerNavigator({
    Home: { screen: MainScreen },
    Screen1: { screen: Screen1 },
    Screen2: { screen: Screen2 },
    Screen3: { screen: Screen3 },
},
    {
        initialRouteName: 'Home',
        drawerWidth: 300,
        drawerPosition: 'left',
    }
);

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class DrawerNavigator extends Comment {
    render() {
        return <AppContainer />;
    }
}

