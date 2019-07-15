import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class EndTripScreen extends Component{
    static navigationOptions = {
        title: '여행 종료',
      };
    

    render(){
        return(
            <View>
                <Text>EndTripScreen</Text>
            </View>
        );
    }
}