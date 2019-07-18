import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, Image, TouchableOpacity, Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
                        longitudeDelta: 0.0421,
                    }} />

                    <ActionButton buttonColor="rgba(156,39,176,100)">     
                        <ActionButton.Item buttonColor='#1abc9c' title="여행 시작!" onPress={() => { }}>
                            <Icon src="../assets/map.svg" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                </ActionButton>

               
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

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});      
