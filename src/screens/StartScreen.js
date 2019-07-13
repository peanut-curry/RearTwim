import React, { Component } from 'react';
import { StyleSheet, Image, View, Dimensions, StatusBar, Text } from 'react-native';
import { Button } from 'react-native-elements'

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    callFun = () => {this.props.navigation.navigate('Login');}

    render() {
        var {height, width} = Dimensions.get('window');
        var buttonHeight = height*0.1;
        var textHeight = height*0.35;
        var rightMargin = width*0.05;
        return (
            <View style={StartStyles.container}>
                <StatusBar hidden={true} />
                <Image source={require('../assets/twimLoading.png')}
                    style={{width:width, height:height}}/>
                <Text style={{color:'#2D2D2D', width:width, height:textHeight, position:"absolute", left:0, bottom:buttonHeight, textAlign: 'right', 
                        fontSize:28, paddingRight:rightMargin, textAlignVertical: 'center'}}
                    >Travel with map,{'\n'}Travel with me,{'\n'}twim!</Text>
                <Button titleStyle={{fontSize:25}} buttonStyle={{flex:1, backgroundColor:'rgba(0, 0, 0, 0)'}}
                    containerStyle={{borderRadius:0, flex:1, width:width, height:buttonHeight, position:"absolute", 
                            bottom:0, left:0, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent:'center'}}
                    title="Let's twim!" onPress={this.callFun}/>
            </View>
        );
    }
}

const StartStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
