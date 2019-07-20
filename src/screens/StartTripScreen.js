import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class StartTripScreen extends Component{
    static navigationOptions = {
        title: '여행 시작',
      };

    render(){
        return(
            <View>
                <Text>StartTripScreen</Text>
            </View>
        );
    }
}