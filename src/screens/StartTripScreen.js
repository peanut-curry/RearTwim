import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CurrentTimeComponent from '../components/currentTime';

export default class StartTripScreen extends Component{
    static navigationOptions = {
        title: '여행 시작',
    };

    render(){
        return(
            <View>
                <CurrentTimeComponent textSize={10}></CurrentTimeComponent>
            </View>
        );
    }
}