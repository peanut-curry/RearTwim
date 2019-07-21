import React, { Component } from 'react';
import {
    StyleSheet, StatusBar, View, Image, TouchableOpacity, TouchableHightlight, Dimensions,
    AsyncStorage, ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerAction } from 'react-navigation';

export default class Screen2 extends Component {
    static navigationOptions = {
        drawerLabel: 'Talk',
        drawerIcon: () => (
            <Image source={require('../assets/home.png')} />
        ),
    }
    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.text}>This is Talk list</Text>
                <TouchableHighlight onPress={() => this.props.navigation.goBack()}
                    style={styles.touchableHighlight} underlayColor={'#f1f1f1'}>
                    <Text style={styles.text}>Go Back </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
    touchableHighlight: {
        backgroundColor: 'orange',
        paddingVertical: 20,
        paddingHorizontal: 50,
        margin: 10
    }
});