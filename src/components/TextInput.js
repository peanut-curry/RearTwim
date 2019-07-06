import React, { Component } from 'react';
import { Input, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

export default class TextInput extends Component{
    static defaultProps = {
        placeholder: ' ',
        iconSrc: null,
      }
    
      constructor(props){
        super(props);
      }

    render(){
        return(
        <Input placeholder={this.props.placeholder}
            placeholderTextColor='#B9B9B9'
            inputContainerStyle={textInputStyle.inputContainer}
            leftIcon={<Image source={this.props.iconSrc}
                            style={{width: 24, height: 24, marginRight: 10, marginLeft:8}}></Image>}
        ></Input>
        );
    }
}

const textInputStyle = StyleSheet.create({
    inputContainer:{
        backgroundColor: '#E0F9F8',
        borderRadius: 90,
        marginVertical: 8,
        borderBottomWidth: 0
    }
})