import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class WriteTripScreen extends Component{
    static navigationOptions = {
        title: '일지 작성하기',
      };
    

    render(){
        return(
            <View>
                <Text>WriteTripScreen</Text>
            </View>
        );
    }
}