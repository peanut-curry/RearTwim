import React, { Component } from 'react';
import { Text } from 'react-native';

export default class currentTimeComponent extends Component{
    static defaultProps = {
        textSize: 20,
        textColor:'#525252'
      }

    constructor(props){
        super(props);
        var curDate = new Date();
        var date = curDate.getDate();
        var month = curDate.getMonth() + 1;
        var year = curDate.getFullYear(); 
        var hours = curDate.getHours(); 
        var min = curDate.getMinutes();
        this.state = {
            year: year,
            month: month,
            date: date,
            hours: hours,
            min: min,
        }
    }

    render(){
        return(
            <Text style={{fontSize:this.props.textSize, color:this.props.textColor} }>
            {this.state.year}년 {this.state.month}월 {this.state.date}일 {this.state.hours}시 {this.state.min}분</Text>
        )
    }
}