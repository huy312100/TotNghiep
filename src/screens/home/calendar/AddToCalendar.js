import React,{useState} from 'react';
import { StyleSheet, View, Text,TouchableOpacity,TouchableWithoutFeedback,Keyboard,TextInput,Switch,KeyboardAvoidingView,ScrollView,FlatList } from 'react-native';
import { Ionicons,Entypo,SimpleLineIcons,MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Overlay,Header } from 'react-native-elements';
import { useDispatch,useSelector } from 'react-redux';

import * as calendarActions from '../../../../store/actions/Calendar';

import LoadingScreen from '../../LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


const AddToCalendarScreen = ({navigation}) => {

    const getCurrentTimestamp=()=>{
        return Date.now();
    };

    const token = useSelector((state) => state.authen.token);

    const [isLoading,setLoading] = useState(false);

    
    const [title,setTitle]=useState('');
    

    const [startTimestamp,setStartTimestamp]=useState(getCurrentTimestamp());
    const [endTimestamp,setEndTimestamp]=useState(getCurrentTimestamp()+3600*1000);
    const [isEnabled, setIsEnabled] = useState(false);

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [visibleOverlayAddPeople, setVisibleOverlayAddPeople] = useState(false);
    const [visibleOverlayAddTypeEvent, setVisibleOverlayAddTypeEvent] = useState(false);
    const [visibleOverlayAddColor, setVisibleOverlayAddColor] = useState(false);
    const [visibleOverlayRemindNoti, setVisibleOverlayRemindNoti] = useState(false);


    const [typeEvent,setTypeEvent]= useState('');
    const [colorEvent,setColorEvent] =useState('');
    const [urlEvent,setUrlEvent] =useState('');
    const [decriptionEvent,setDecriptionEvent] =useState('');
    const [timestampRemindNoti,setTimestampRemindNoti] = useState(startTimestamp);

    const [listGuestEmail,setGuestEmail] = useState([]);
    const [listGuestName,setGuestName] = useState([]);


    const [dataOfAllPeolple,setDataOfAllPeolple] = useState([]);


    const [labelRemindNoti,setLabelRemindNoti] = useState('');

    const dispatch=useDispatch();

    const statusTitle = useSelector((state) => state.calendar.statusTitle);
    const statusDate = useSelector((state) => state.calendar.statusDate);

    const toggleOverlayAddPeople = () => {
        setVisibleOverlayAddPeople(!visibleOverlayAddPeople);
    };

    const toggleOverlayAddTypeEvent = () => {
        setVisibleOverlayAddTypeEvent(!visibleOverlayAddTypeEvent);
    };

    const toggleOverlayAddColor = () => {
        setVisibleOverlayAddColor(!visibleOverlayAddColor);
    };

    const toggleOverlayAddRemindNoti = () => {
        setVisibleOverlayRemindNoti(!visibleOverlayRemindNoti);
    };


    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //Handle for start time event
    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    
    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const handleStartConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        setStartTimestamp(date.getTime());
        hideStartDatePicker();
    };


    //Handle for end time event
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };
    
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleEndConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        setEndTimestamp(date.getTime());
        //console.log(checkValidDate());
        hideEndDatePicker();
    };

    //Handle for current time
    const getCurrenDay = (timestamp)=>{
        var today = new Date(timestamp); 
        var day= today.getDate();
        return day;
    };

    const getCurrentMonth =(timestamp)=> {
    var today = new Date(timestamp);
    var month = today.getMonth() + 1;
    return month; 
    };

    const getCurrentYear = (timestamp) => {
    var today = new Date(timestamp); 
    var year= today.getFullYear();
    return year;
    }
    
    const addZero=(i) =>{
    if (i < 10) {
        i = "0" + i;
    }
    return i;
    }
    
    const getCurrentTime = (timestamp) => {
    var d = new Date(timestamp);
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    return h + ":" + m;
    }

    //Handle Start and End Date
    const checkValidDate = () =>{
        //console.log(startTimestamp,endTimestamp);
        
        if(startTimestamp >= endTimestamp){
        return false;
        }
        return true;
    };

    const checkTitle = (value) =>{
        if(value.trim().length === 0){
        return false;
        }
        return true;
    };

    //Back button handler
    const backButtonHandler = ()=>{

        dispatch(calendarActions.getStatusOfTitle(false));
        dispatch(calendarActions.getStatusOfDate(true));
        navigation.navigate("Calendar")
    }

    //Handle for clickable add button
    const checkDisableAddButton =() =>{
        console.log(statusTitle,statusDate);
        if(statusTitle && statusDate){
        return false;
        }
        return true;
    }

    //Handle for Add Button
    const addButtonHandler = async() => {
        await addNewEvent();
    };


    //Call getCalendarThis Month Calendar
  const getAllActivitiesInMonth = ()=>{
    let details = {
      year: getCurrentMonth(),
      month: getCurrentYear(),
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/calendar/getthismonth", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `bearer ${token}`
      },
      body: formBody,
    }).then((response) => {})
    .then(([statusCode, dataRes])=>{
        //console.log(dataRes,statusCode); 
        dispatch(calendarActions.getCalendarOfMonth(dataRes));
    }).catch(error => console.log('error', error));
  };

    //call Api post calendar
    const addNewEvent = async ()=>{
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "Title": title,
        "TypeEvent": typeEvent,
        "year": getCurrentYear(startTimestamp).toString(),
        "month": getCurrentMonth(startTimestamp).toString(),
        "day": getCurrenDay(startTimestamp).toString(),
        "StartHour": Math.floor(startTimestamp/1000),
        "EndHour": Math.floor(endTimestamp/1000),
        "desciptionText": decriptionEvent,
        "url": urlEvent,
        "UnderLine": false,
        "Italic": false,
        "Bold": false,
        "Color": colorEvent,
        "listguestEmail": [],
        "listguestName": [],
        "Notification": timestampRemindNoti
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/calendar/post", requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes])=>{
            console.log(raw);
            console.log(dataRes);
            if(statusCode === 200){
                getAllActivitiesInMonth();
                //dispatch(calendarActions.addNewEventToCalendar());
                setLoading(false);
                navigation.navigate('Calendar');
            }  
        })
        .catch(error => console.log('error', error));

        
    
        // fetch("https://hcmusemu.herokuapp.com/calendar/post", {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     "Authorization": `bearer ${token}`
        //     },
        //     body: formBody,
        // }).then((response) => {
        //     const statusCode = response.status;
        //     const dataRes = response.json();
        //     return Promise.all([statusCode, dataRes]);
        // }).then(([statusCode, dataRes])=>{
        //     if(statusCode === 200){
        //         dispatch(calendarActions.addNewEventToCalendar());
        //         setLoading(false);
        //     }  
        // }).done();
    };

    
      

    return(
        <KeyboardAvoidingView
        //keyboardVerticalOffset = {Header.HEIGHT + 20} // adjust the value here if you need more padding
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.container}>
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
          }}>
         
        <View style={styles.container}>

        
         <Header containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
            }}
            leftComponent={
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() =>{backButtonHandler()}}>
                    <Entypo name="chevron-thin-left" size={24} color="red" />
                    <Text style={headerStyle.textLeftComponent}>Hủy</Text>
                </TouchableOpacity>
            }
            centerComponent={
                <Text style={headerStyle.textCenterComponent}>Sự kiện mới</Text>
            }
            rightComponent={
              <TouchableOpacity disabled={checkDisableAddButton()}
                onPress={() =>{addNewEvent()}}>
                    <Text style={[headerStyle.textRightComponent,{color: checkDisableAddButton() ? 'silver' : 'blue'}]}>
                        Thêm
                    </Text>
                </TouchableOpacity>
               
            }/>


            <ScrollView>

                <View style={styles.card}>
                    <TextInput style={styles.titleName} placeholder='Tiêu đề'
                    onChangeText={(title)=>{
                        //console.log(checkTitle(title));
                        setTitle(title);
                        dispatch(calendarActions.getStatusOfTitle(checkTitle(title)))
                        }}/>
                </View> 

                <View style={[styles.card,{marginBottom:0}]}>
                    <View style={styles.date}>
                        <SimpleLineIcons name="clock" size={20} color="red" />
                        <Text style={styles.label}>Cả ngày</Text>
                        <Switch
                            style={[{ transform: [{ scaleX: .8 }, { scaleY: .8 }],marginTop:-5,marginRight:-10},styles.onTheRight]}
                            trackColor={{ false: "white", true: "green" }}
                            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="white"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            size="medium"/>  
                    </View>
                </View>

                <View style={[styles.card,{marginTop:0}]}>
                    <TouchableOpacity style={styles.date} onPress={showStartDatePicker}>
                        <Text style={[styles.label,{marginLeft:32}]}>Bắt đầu</Text>
                        <View style={[styles.onTheRight,{flexDirection:'row'}]}>
                            <Text style={styles.label} >
                                {getCurrenDay(startTimestamp)+" tháng "+ getCurrentMonth(startTimestamp)+"," + getCurrentYear(startTimestamp)}    
                            </Text>

                            {!isEnabled &&<Text style={[styles.label,{marginLeft:20}]} >
                                {getCurrentTime(startTimestamp)}
                            </Text>}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.date} onPress={showEndDatePicker}>
                        <Text style={[styles.label,{marginLeft:32}]}>Kết thúc</Text>
                        <View style={[styles.onTheRight,{flexDirection:'row'}]}>
                            <Text style={[styles.label,{ textDecorationLine: checkValidDate() ? 'none' : 'line-through'}]} >
                                {getCurrenDay(endTimestamp)+" tháng "+ getCurrentMonth(endTimestamp)+"," + getCurrentYear(endTimestamp)}
                            </Text>
                            {!isEnabled && <Text style={[styles.label,{marginLeft:20,textDecorationLine: checkValidDate() ? 'none' : 'line-through'}]}>
                                {getCurrentTime(endTimestamp)}
                            </Text>}
                        </View>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={[styles.card,{marginBottom:0}]} onPress={() =>{navigation.navigate('Add people to calendar')}}>
                    <View style={styles.date}>
                    <Ionicons name="people-outline" size={23} color="red" />
                        <Text style={styles.label}>Thêm người</Text>
                        <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                    </View>
                </TouchableOpacity> 

                <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0}]} onPress={toggleOverlayAddTypeEvent}>
                    <View style={styles.date}>
                    <SimpleLineIcons name="event" size={21} color="red" />
                        <Text style={styles.label}>Loại sự kiện</Text>
                        <Text style={[styles.onTheRight,styles.showChooseOnTheRight,colorStyle.colorLabelOnTheRight]}>{typeEvent}</Text>
                        <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                    </View>
                </TouchableOpacity> 

                <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0}]} onPress={toggleOverlayAddColor}>
                    <View style={styles.date}>
                    <Ionicons name="color-palette-outline" size={23 } color="red" />
                        <Text style={styles.label}>Màu sắc</Text>
                        <View style={[styles.onTheRight,colorStyle.SquareShapeView,styles.showChooseOnTheRight,{backgroundColor: colorEvent}]}/>
                        <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card,{marginTop:0}]} onPress={toggleOverlayAddRemindNoti}>
                    <View style={styles.date}>
                    <Ionicons name="ios-notifications-outline" size={23} color="red" />
                        <Text style={styles.label}>Thông báo</Text>
                        <Text style={[styles.onTheRight,styles.showChooseOnTheRight,colorStyle.colorLabelOnTheRight]}>{labelRemindNoti}</Text>
                        <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                    </View>
                </TouchableOpacity> 

                <View style={[styles.card,{marginBottom:0}]}>
                    <View style={styles.date}>
                    <SimpleLineIcons name="link" size={20} color="red" />
                    <TextInput style={[styles.label,{width:"100%"}]} placeholder="URL"
                    onChangeText={(url) => setUrlEvent(url)}/>
                    </View>
                </View> 
                <View style={[styles.card,{marginTop:0,height:"25%"}]}>
                    <View style={styles.date}>
                        <SimpleLineIcons name="note" size={20} color="red" />
                        <TextInput style={[styles.label,{width:"100%",marginTop:-5,height:"600%"}]} placeholder="Mô tả" multiline={true}
                        onChangeText={(decription) => setDecriptionEvent(decription)}/>
                    </View>
                </View> 


                <DateTimePickerModal
                    locale={'vi'}
                    isVisible={isStartDatePickerVisible && !isEnabled}
                    mode="datetime"
                    value={startTimestamp}
                    headerTextIOS="Chọn thời điểm bắt đầu"
                    cancelTextIOS="Huỷ bỏ"
                    confirmTextIOS="Xác nhận"
                    onConfirm={handleStartConfirm}
                    onCancel={hideStartDatePicker}
                    onHide={()=>{
                        dispatch(calendarActions.getStatusOfDate(checkValidDate()));
                    }}/>

                <DateTimePickerModal
                    locale={'vi'}
                    isVisible={isEndDatePickerVisible && !isEnabled}
                    mode="datetime"
                    headerTextIOS="Chọn thời điểm kết thúc"
                    cancelTextIOS="Huỷ bỏ"
                    confirmTextIOS="Xác nhận"
                    onConfirm={handleEndConfirm}
                    onCancel={hideEndDatePicker}
                    onHide={()=>{
                        dispatch(calendarActions.getStatusOfDate(checkValidDate()));
                    }}/>

                <DateTimePickerModal
                    locale={'vi'}
                    isVisible={isStartDatePickerVisible && isEnabled}
                    mode="date"
                    headerTextIOS="Chọn thời điểm bắt đầu"
                    cancelTextIOS="Huỷ bỏ"
                    confirmTextIOS="Xác nhận"
                    onConfirm={handleStartConfirm}
                    onCancel={hideStartDatePicker}/>

                <DateTimePickerModal
                    locale={'vi'}
                    isVisible={isEndDatePickerVisible && isEnabled}
                    mode="date"
                    headerTextIOS="Chọn thời điểm kết thúc"
                    cancelTextIOS="Huỷ bỏ"
                    confirmTextIOS="Xác nhận"
                    onConfirm={handleEndConfirm}
                    onCancel={hideEndDatePicker}/>


                {isLoading && LoadingScreen()}


                <Overlay isVisible={visibleOverlayAddPeople} onBackdropPress={toggleOverlayAddPeople}>
                    
        
                
                        
                </Overlay>

                <Overlay isVisible={visibleOverlayAddTypeEvent} onBackdropPress={toggleOverlayAddTypeEvent}>
                    <TouchableOpacity style={[styles.card,{marginBottom:0,marginTop:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddTypeEvent();setTypeEvent('Công việc')}}>
                        <View style={styles.date}>
                        <MaterialCommunityIcons name="office-building" size={24} color="black" />
                        <Text style={styles.label}>Công việc</Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddTypeEvent();setTypeEvent('Nhà')}}>
                        <View style={styles.date}>
                        <FontAwesome5 name="home" size={20} color="black" />
                        <Text style={styles.label}>Nhà</Text>
                        </View>
                    </TouchableOpacity>        

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddTypeEvent();setTypeEvent('Gia đình')}}>
                        <View style={styles.date}>
                        <MaterialIcons name="family-restroom" size={24} color="black" />
                        <Text style={styles.label}>Gia đình</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddTypeEvent();setTypeEvent('Giải trí')}}>
                        <View style={styles.date}>
                        <Ionicons name="game-controller" size={24} color="black" />
                        <Text style={styles.label}>Giải trí</Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddTypeEvent();setTypeEvent('Bạn bè')}}>
                        <View style={styles.date}>
                        <MaterialCommunityIcons name="party-popper" size={24} color="black" />
                        <Text style={styles.label}>Bạn bè</Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddTypeEvent();setTypeEvent('Thể thao')}}>
                        <View style={[styles.date,]}>
                        <MaterialIcons name="sports" size={24} color="black" />
                        <Text style={styles.label}>Thể thao </Text>
                        </View>
                    </TouchableOpacity> 
                </Overlay>


                <Overlay isVisible={visibleOverlayAddColor} onBackdropPress={toggleOverlayAddColor}> 
                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#00BCD4')}}>
                        <View style={[styles.date,]}>
                            <View style={[colorStyle.SquareShapeView,{backgroundColor: '#00BCD4'}]}/>
                            <Text style={styles.label}> Xanh dương </Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#FF6666')}}>
                        <View style={[styles.date,]}>
                        <View style={[colorStyle.SquareShapeView,{backgroundColor: '#FF6666'}]}/>
                            <Text style={styles.label}> Đỏ </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#CCFF00')}}>
                        <View style={[styles.date,]}>
                        <View style={[colorStyle.SquareShapeView,{backgroundColor: '#CCFF00'}]}/>
                            <Text style={styles.label}> Vàng </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#669966')}}>
                        <View style={[styles.date,]}>
                        <View style={[colorStyle.SquareShapeView,{backgroundColor: '#669966'}]}/>
                            <Text style={styles.label}> Xanh lá </Text>
                        </View>
                    </TouchableOpacity>  

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#FF99CC')}}>
                        <View style={[styles.date,]}>
                        <View style={[colorStyle.SquareShapeView,{backgroundColor: '#FF99CC'}]}/>
                            <Text style={styles.label}> Hồng </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#330099')}}>
                        <View style={[styles.date,]}>
                        <View style={[colorStyle.SquareShapeView,{backgroundColor: '#330099'}]}/>
                            <Text style={styles.label}> Tím </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#663300')}}>
                        <View style={[styles.date,]}>
                        <View style={[colorStyle.SquareShapeView,{backgroundColor: '#663300'}]}/>
                            <Text style={styles.label}> Nâu </Text>
                        </View>
                    </TouchableOpacity>  

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddColor();setColorEvent('#DDDDDD')}}>
                        <View style={[styles.date,]}>
                        <View style={[colorStyle.SquareShapeView,{backgroundColor: '#DDDDDD'}]}/>
                            <Text style={styles.label}> Xám </Text>
                        </View>
                    </TouchableOpacity>       
                </Overlay>

                    {/* Overlay for remind notification */}
                <Overlay isVisible={visibleOverlayRemindNoti} onBackdropPress={toggleOverlayAddRemindNoti}>
                    <TouchableOpacity style={[styles.card,{marginBottom:0,marginTop:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddRemindNoti();
                        setLabelRemindNoti('Trước 15 phút');
                        setTimestampRemindNoti(Math.floor(startTimestamp/1000)-(60*15))}}
                    >
                        <View style={styles.date}>
                        <Text style={styles.label}>Trước 15 phút</Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddRemindNoti();
                        setLabelRemindNoti('Trước 30 phút');
                        setTimestampRemindNoti(Math.floor(startTimestamp/1000)-(60*30))}}
                    >
                        <View style={styles.date}>
                        <Text style={styles.label}>Trước 30 phút</Text>
                        </View>
                    </TouchableOpacity>        

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddRemindNoti();
                        setLabelRemindNoti('Trước 1 giờ');
                        setTimestampRemindNoti(Math.floor(startTimestamp/1000)-(60*60))}}
                    >
                        <View style={styles.date}>
                            <Text style={styles.label}>Trước 1 giờ</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddRemindNoti();
                        setLabelRemindNoti('Trước 2 giờ');
                        setTimestampRemindNoti(Math.floor(startTimestamp/1000)-(60*60*2))}}
                    >
                        <View style={styles.date}>
                        <Text style={styles.label}>Trước 2 giờ</Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddRemindNoti();
                        setLabelRemindNoti('Trước 3 giờ');
                        setTimestampRemindNoti(Math.floor(startTimestamp/1000)-(60*60*3))}}
                    >
                        <View style={styles.date}>
                            <Text style={styles.label}>Trước 3 giờ</Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:0}]} 
                    onPress={() => {toggleOverlayAddRemindNoti();
                        setLabelRemindNoti('Trước 4 giờ');
                        setTimestampRemindNoti(Math.floor(startTimestamp/1000)-(60*60*4))}}
                    >
                        <View style={[styles.date,]}>
                        <Text style={styles.label}>Trước 4 giờ </Text>
                        </View>
                    </TouchableOpacity> 
                </Overlay>
                

            </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#EEEEEE",
        marginVertical:20
    },

    titleName:{
        marginLeft: 48,
        marginVertical:10,
        fontSize:20
    },

    date:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:10,
    },

    label: {
        fontSize:18,
        marginLeft:15
    },

    onTheRight: {
        position: 'absolute',
        right: 0
    },

    showChooseOnTheRight:{
        marginRight:20,
    }
});

const colorStyle = StyleSheet.create({
    SquareShapeView: { 
        width: 20,
        height: 20,
        borderRadius:7,
    },

    colorLabelOnTheRight: {
        fontSize:18,
        color:'#DDDDDD',
    }
});

const headerStyle = StyleSheet.create({
    textRightComponent:{
        fontSize:19,
        marginHorizontal:5
    },

    textLeftComponent:{
        color:'red',
        fontSize:19,
    },

    textCenterComponent:{
        color: 'black',
        fontSize:17,
        fontWeight:'bold',
        marginTop:2
    }
});

const addPeopleStyle = StyleSheet.create({
    

    input:{
        flexDirection:'row',
        width:'95%',
        backgroundColor:"#cccc",
        borderRadius:10,
        padding:10,
    },

    card: {
        paddingHorizontal:10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#cccccc",
        flexDirection: "row",

    },
    name:{
        marginTop:10,
        marginHorizontal:20
    },
    nameUniversity:{
        fontSize:12,
        marginHorizontal:20
    },

    header: {
        flexDirection:'row',
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomColor:'#DDDDDD',
        borderBottomWidth:.2,
    },
})


export default AddToCalendarScreen;