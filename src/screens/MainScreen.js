import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Image, TouchableOpacity, Dimensions, 
    AsyncStorage, ToastAndroid, Modal, TextInput } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import CurrentTimeComponent from '../components/currentTime';
import GradientButton from '../components/gradientButton';
import { DrawerAction } from 'react-navigation';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const {height, width} = Dimensions.get('window');
const floatheight = height/4.0;
var tripName = "";
const UserDB = null;

export default class MainScreen extends Component{
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Image source={require('../assets/home.png')} />
        ),
    }
    constructor(){
        super();
        this.state = {
            isLoading: true,
            isTraveling: false,
            region : [],
            modalVisible: false,
        }
    }

    modalVisibleToggle = () => {
        this.setState({
            isLoading: this.state.isLoading,
            isTraveling: this.state.isTraveling,
            region : this.state.region,
            modalVisible: !(this.state.modalVisible),
        })
    }

    isTravelingToggle = () => {
        this.setState({
            isLoading: this.state.isLoading,
            isTraveling: !(this.state.isTraveling),
            region : this.state.region,
            modalVisible: (this.state.modalVisible),
        })
    }

    goToCurLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var currentLongitude = parseFloat(JSON.stringify(position.coords.longitude));
                var currentLatitude = parseFloat(JSON.stringify(position.coords.latitude));
                this.setState({
                    isLoading: false,
                    isTraveling: this.state.isTraveling,
                    region: {
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    modalVisible: this.state.modalVisible
                })
            }, 
            (error) => {
                ToastAndroid.show("현재 위치를 불러오는데 오류 발생. 다시 시도해주세요", ToastAndroid.SHORT);
            },
            {enableHighAccuracy:false, timeout:1000}
        );
    }

    componentDidMount = async() => {
        var isTraveling = await AsyncStorage.getItem("isTraveling");
        if (isTraveling=='true'){ //여행중인 경우
            //최근 일지 가져와서 State에 넣기.
        } 
        else{ //여행 중 아닌 경우
            //현재 위치 가져오기.
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    var currentLongitude = parseFloat(JSON.stringify(position.coords.longitude));
                    var currentLatitude = parseFloat(JSON.stringify(position.coords.latitude));
                    this.setState({
                        isLoading: false,
                        isTraveling: false,
                        region: {
                            latitude: currentLatitude,
                            longitude: currentLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        modalVisible: this.state.modalVisible
                    })
                }, 
                (error) => {
                    ToastAndroid.show("현재 위치를 불러오는데 오류 발생. 다시 시도해주세요", ToastAndroid.SHORT);
                },
                {enableHighAccuracy:false, timeout:1000}
            );
        }   
    }

    startTripButtonClicked = () => {
        this.modalVisibleToggle();
    }

    writeTripButtonClicked = () => {
        this.props.navigation.navigate('WriteTrip');
    }

    endTripButtonClicked = () => {
        this.props.navigation.navigate('EndTrip');
    }

    static navigationOptions = ({ navigation }) => {
        var iconSize = ((height/9.0)-StatusBar.currentHeight)*0.6;
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerAction.openDrawer())}
                    style={{ justifyContent: 'center', width: iconSize, height: iconSize, marginLeft: (iconSize / 2.0) }}>
                    <Image style={{ width: iconSize, height: iconSize }}
                    source={require('../assets/menuIcon.png')}>
                    </Image>
                </TouchableOpacity>
            )
        };
      };

    startTrip = async() => {
        var tripNum = -1;
        var MyUserDB = SQLite.openDatabase({name: "UserData.db", createFromLocation : 1},this.openCB,this.errorCB);
        MyUserDB.transaction((UserDB)=>{
            UserDB.executeSql('INSERT INTO 여행(여행이름, 종료여부, 여행번호) VALUES (?, 0, NULL);', [tripName],
            (UserDB, results) => {
                   tripNum=results.insertId
                    UserDB.executeSql('INSERT INTO 일지(여행번호, 일지번호, 위도, 경도) VALUES (?, 0, ?, ?);', 
                    [tripNum, this.state.region.latitude, this.state.region.latitude],
                        async(UserDB, results) => {
                            await AsyncStorage.setItem("isTraveling", "true"); //여행중 상태로 설정
                            await AsyncStorage.setItem("lastTripNum", tripNum+'');
                            this.setState({
                                isLoading: this.state.isLoading,
                                isTraveling: true,
                                region : this.state.region,
                                modalVisible: false,
                            })
                            setTimeout(()=>{MyUserDB.close(this.closeCB, this.errorCB);}, 5000);
                        }, this.errorCB);
            }, this.errorCB);
        });
    }

    closeCB(err){
        console.log("closeDB");
    }

    errorCB(err) {
        console.log("SQL Error: " + err + JSON.stringify(err));
        ToastAndroid.show("문제가 발생했습니다. 다시 시도해주세요", ToastAndroid.SHORT);
    }

    successCB() {
        console.log("SQL executed fine");
    }
      
    openCB() {
        console.log("Database OPENED");
    }
      

    render(){
        if(this.state.isLoading){
            //로딩 컴포넌트 띄우기
            return null;
        }
        else{
            if(this.state.isTraveling){ //1.여행중이라면,
                return(
                    <View style={MainStyles.container}>
                        <StatusBar backgroundColor={'transparent'} translucent={true} hidden={false} barStyle='dark-content'></StatusBar>
                            <MapView style={MainStyles.map} provider={PROVIDER_GOOGLE}
                                region={this.state.region}/>
                            <View style={MainStyles.locationButtonContainer}>
                                <TouchableOpacity style={MainStyles.locationButton} onPress={this.goToCurLocation}>
                                    <Image style={{width:40, height:40}} source={require('../assets/location.png')}></Image>
                                </TouchableOpacity>
                             </View> 
                            <ActionButton buttonColor="rgba(156,39,176,100)" spacing={12}>     
                            <ActionButton.Item buttonColor='#1abc9c' title="친구 찾기" onPress={()=>{}}>
                                    <Icon src="../assets/map.svg" style={MainStyles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#1abc9c' title="여행 종료하기" onPress={this.endTripButtonClicked}>
                                    <Icon src="../assets/map.svg" style={MainStyles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#1abc9c' title="일지 작성하기" onPress={this.writeTripButtonClicked}>
                                    <Icon src="../assets/map.svg" style={MainStyles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                    </View>
                );
            }else{ //2.여행중이 아니라면,
                return(
                    <View style={MainStyles.container}>
                        <StatusBar backgroundColor={'transparent'} translucent={true} hidden={false} barStyle='dark-content'></StatusBar>
                            <MapView style={MainStyles.map} provider={PROVIDER_GOOGLE}
                                region={this.state.region}/>
                            <View style={MainStyles.locationButtonContainer}>
                                <TouchableOpacity style={MainStyles.locationButton} onPress={this.goToCurLocation}>
                                    <Image style={{width:40, height:40}} source={require('../assets/location.png')}></Image>
                                </TouchableOpacity>
                             </View> 
                            <ActionButton buttonColor="rgba(156,39,176,100)" spacing={12}>     
                                <ActionButton.Item buttonColor='#1abc9c' title="여행 시작!" onPress={this.startTripButtonClicked}>
                                    <Icon src="../assets/map.svg" style={MainStyles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                            <Modal style={MainStyles.tripStartModal} visible={this.state.modalVisible} animationType="slide" transparent={true} >
                                <View style={{width:width, height:height, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)'}}>
                                    <View style={MainStyles.tripStartDialog}>
                                        <View style={{flex:0.5, justifyContent:'center'}}>
                                            <TouchableOpacity onPress={this.modalVisibleToggle}>
                                                <Image style={{width:25, height:25}} source={require('../assets/back_x.png')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flex:0.7, justifyContent:'center'}}>
                                            <CurrentTimeComponent textSize={15}></CurrentTimeComponent>
                                            <TextInput placeholder='여행 이름' style={{width:180, height:50, textAlign:'center'}} 
                                            underlineColorAndroid='#B5B5B5' onChangeText={(text)=>{tripName=text;}}></TextInput>
                                        </View>
                                        <View style={{flex:0.5, justifyContent:'flex-start'}}>
                                            <GradientButton title='여행시작' textSize={15} width={100} height={35}
                                                onPress={this.startTrip}></GradientButton>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                    </View>
                );
            }
        }
    }
}

const MainStyles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        flex:1
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    locationButton:{
        borderRadius: 90,
        width: 40,
        height: 40,
    },
    locationButtonContainer:{
        width: width,
        height: floatheight,
        position: 'absolute',
        bottom: 98,
        right: 37.5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    tripStartModal:{
        width:floatheight,
        height:floatheight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tripStartDialog:{
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 220,
    }
});
  
