import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class TwimGradientButton extends Component{
    static defaultProps = {
        onPress: null,
        title: 'button',
        textColor: 'black',
        width: 150,
        height: 40,
        textSize: 15,
        borderRadius: 90,
      }

    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={{
                borderRadius: this.props.borderRadius, width: this.props.width, height: this.props.height}}>
                <LinearGradient style={{
                   borderRadius: this.props.borderRadius, alignItems:'center', justifyContent:'center',
                   width: this.props.width, height: this.props.height}} colors={['#FCEB50', '#EF4058']}
                   start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                    <Text style={{color:this.props.textColor, fontSize:this.props.textSize, textAlign:'center', textAlignVertical:'center', 
                    backgroundColor:'transparent', alignSelf:'center'}}>
                        {this.props.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}
