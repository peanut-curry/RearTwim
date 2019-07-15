import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, Image, TouchableOpacity, Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MainScreen extends Component{
    componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Accessing Permission",
              message: "App needs access to your location"
            }
          );
        console.log("위치 가져오기 시작");
        navigator.geolocation.getCurrentPosition(
          function(position) {
            console.log(position);
          }, 
          function(error) {
            console.log(error);
          },
          {enableHighAccuracy:false, timeout:50000}
        );
      }

    static navigationOptions = ({ navigation }) => {
        var iconSize = ((Dimensions.get('window').height/9.0)-StatusBar.currentHeight)*0.6;
        return {
            headerLeft:(
                <TouchableOpacity style={{justifyContent:'center', width:iconSize, height:iconSize, marginLeft:(iconSize/2.0)}}>
                    <Image style={{width:iconSize, height:iconSize}} source={require('../assets/menuIcon.png')}></Image>
                </TouchableOpacity>
            )
        };
      };

    render(){
        return(
            <View style={MainStyles.container}>
                <StatusBar backgroundColor={'transparent'} translucent={true} hidden={false} barStyle='dark-content'></StatusBar>
                    <MapView style={MainStyles.map} provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,}}/>
            </View>
        );
    }
}

const MainStyles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        flex:1
    }
});