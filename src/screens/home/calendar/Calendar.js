import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform ,Alert,Linking,Dimensions} from 'react-native';
import { Overlay,Header } from 'react-native-elements';
import { Entypo,MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import {useDispatch,useSelector} from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import * as calendarActions from '../../../../store/actions/Calendar';
import LoadingScreen from '../../LoadingScreen';
import TimelineCalendar from './timeline_calendar/TimelineCalendar';

import * as dateUtils from '../../../utils/Date';

let { width } = Dimensions.get('window');



const CalendarScreen =({navigation})=> {
  // const events=[
    
  //   {
  //     start: '2021-06-13 12:10:00',
  //     end: '2021-06-13 13:45:00',
  //     title: 'Dr. Mariana Joseph',
  //     summary: '3412 Piedmont Rd NE, GA 3032',
  //     color: '#F4EFDB',
  //   },
  // ];

  const getCurrenDay = ()=>{
    var today = new Date(); 
    var day= today.getDate();
    return day;
  };

  const getCurrentMonth =()=> {
    var today = new Date();
    var month = today.getMonth() + 1;
    return month; 
  };

  const getCurrentYear = () => {
    var today = new Date(); 
    var year= today.getFullYear();
    return year;
  };

  const getCurrentDate = () =>{
    var day = '' + getCurrenDay();
    var year = getCurrentYear();
    var month = '' + getCurrentMonth();

    console.log(month.length);

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  };


  const token = useSelector((state) => state.authen.token);

  const [visibleOverlay, setVisibleOverlay] = useState(false);
  const [currentDate,setCurrentDate] = useState(getCurrentDate());
  const [monthChanged,setMonthChanged] = useState(getCurrentMonth());
  const [yearChanged,setYearChanged] = useState(getCurrentYear());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [idEvent,setIdEvent]=useState('');
  const [nameEvent,setNameEvent] = useState('');
  const [startTimeEvent,setStartTimeEvent] = useState('');
  const [endTimeEvent,setEndTimeEvent] = useState('');
  const [decriptionEvent,setDecriptionEvent] = useState('');
  const [typeEvent,setTypeEvent] = useState('');
  const [typeGuest,setTypeGuest] = useState('');
  const [urlEvent,setUrlEvent] = useState('');
  const [colorEvent,setColorEvent] = useState('');
  const [allMembers,setAllMembers] = useState([]);

  const [startTimestamp,setStartTimestamp] = useState('');
  const [endTimestamp,setEndTimestamp] = useState('');

  const [isLoading,setLoading] = useState(false);

  const [allEvents,setEvent] = useState([]);
  const dispatch = useDispatch();
  const unmounted = useRef(false);

  

  const toggleOverlay = () => {
    setVisibleOverlay(!visibleOverlay);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    // console.log(date.getMonth()+1);
    // console.log(date.getFullYear());
    setMonthChanged(date.getMonth() + 1);
    setYearChanged(date.getFullYear());
    setCurrentDate(date);
    setDatePickerVisibility(false);
  };

  const handleCancel = () => {
    setDatePickerVisibility(false);
  }

  //Call getCalendarThis Month Calendar
  const getAllActivitiesInMonth = ()=>{
    let details = {
      year: yearChanged,
      month: monthChanged,
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
    }).then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=>{
      console.log(dataRes,statusCode); 
      if(statusCode === 200){
        const dataCalendar = [];
        for (const key in dataRes) {
          if(dataRes[key].TypeCalendar !== undefined){
            if(dataRes[key].ListGuest.length===0){
              dataCalendar.push({
                id:dataRes[key]._id,
                type:dataRes[key].TypeEvent,
                title:dataRes[key].Title,
                summary:dataRes[key].Decription.text,
                start:dateUtils.ConvertTimestamp(dataRes[key].StartHour),
                end:dateUtils.ConvertTimestamp(dataRes[key].EndHour),
                url:dataRes[key].Decription.url,
                typeGuest:"Cá nhân",
                color:dataRes[key].Color,
                startTimestamp:dataRes[key].StartHour,
                endTimestamp:dataRes[key].EndHour,
                ListGuest:dataRes[key].ListGuest,
                Notification:dataRes[key].Notification
            })}
            else{
              dataCalendar.push({
                id:dataRes[key]._id,
                type:dataRes[key].TypeEvent,
                title:dataRes[key].Title,
                summary:dataRes[key].Decription.text,
                start:dateUtils.ConvertTimestamp(dataRes[key].StartHour),
                end:dateUtils.ConvertTimestamp(dataRes[key].EndHour),
                url:dataRes[key].Decription.url,
                typeGuest:"Nhóm",
                color:dataRes[key].Color,
                startTimestamp:dataRes[key].StartHour,
                endTimestamp:dataRes[key].EndHour,
                ListGuest:dataRes[key].ListGuest,
                Notification:dataRes[key].Notification
            })}
          }
          else{
            dataCalendar.push({
              id:"",
              //type:dataRes[0].TypeCalendar,
              title:dataRes[key].nameCourese,
              summary:dataRes[key].decription,
              start:dateUtils.ConvertTimestamp(dataRes[key].duedate-3600),
              end:dateUtils.ConvertTimestamp(dataRes[key].duedate),
              type:"Deadline",
              color: '#99FF99',
              url:dataRes[key].url,
              typeGuest:"Cá nhân",
              Notification:dataRes[key].duedate
          })
          }
        }
        setEvent(dataCalendar);
        dispatch(calendarActions.getCalendarOfMonth(dataCalendar));
        console.log(dataCalendar);
      }
      else if (statusCode === 401){
        console.log("Token het han");
      }
      else{
        console.log(statusCode);
      }
    }).catch(error => console.log('error', error));
  };

    useEffect(() => {
      console.log(getCurrentDate());
        //console.log(token);
    getAllActivitiesInMonth();
    return()=>{
      unmounted.current=true;
      //unsubscribe();
    };
  },[monthChanged,yearChanged]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentDate(getCurrentDate());
      getAllActivitiesInMonth();
    });
    return()=>{
      unmounted.current=true;
      unsubscribe();
    };
  },[]);

  //Call api delete event in calendar
  const deleteEventInCalendar = () => {
    setLoading(true);
    let details = {
      id:idEvent
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/calendar/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `bearer ${token}`
      },
      body: formBody,
    }).then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=>{
      console.log(dataRes,statusCode); 
      if(statusCode === 200){
        getAllActivitiesInMonth();
        toggleOverlay();
        setLoading(false);
      }
    }).catch(error => console.log('error', error));
  }


  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            borderBottomColor:'#DDDDDD'
        }}

        centerComponent={
            <Text style={{fontSize:20,fontWeight:'500'}}>Lịch hoạt động</Text>
        }

        leftComponent={
          <TouchableOpacity onPress={() =>{ 
            //socket.emit('Return-Chat',[roomID,route.params.email]);
            navigation.goBack()
            }}>
                <Entypo name="chevron-left" size={28} color="blue" />
            </TouchableOpacity>
        }

        rightComponent={
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{marginRight:5}} onPress={() =>{ setDatePickerVisibility(true); }}>
                <AntDesign name="calendar" size={26} color="blue" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => 
                  navigation.navigate('Add Event',{
                    nameEvent: '',
                    decriptionEvent:'',
                    urlEvent:''
                  })
              
              }>
                <MaterialCommunityIcons name="plus" size={30} color={"blue"} />
              </TouchableOpacity>
          </View>
        }
        />


      <TimelineCalendar
        eventTapped={e => {
          toggleOverlay();
          setIdEvent(e.id);
          setNameEvent(e.title);
          setStartTimeEvent(e.start);
          setEndTimeEvent(e.end);
          setDecriptionEvent(e.summary);
          setTypeEvent(e.type);
          setTypeGuest(e.typeGuest);
          setUrlEvent(e.url);           
          setColorEvent(e.color); 
          setStartTimestamp(e.startTimestamp);
          setEndTimestamp(e.endTimestamp);
          setAllMembers(e.ListGuest);
        }}
        events={allEvents}
        width={width}
        initDate={currentDate}
        scrollToFirst
        upperCaseHeader
        uppercase
        scrollToFirst={false}
      />

    <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay} >
      <View style={overlayStyle.overlay}>
        <Text style={overlayStyle.headerStyle}>Chi tiết sự kiện</Text>
          <View style={overlayStyle.bottomRow} >
            <View style={overlayStyle.row}>
            {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                <Text style={overlayStyle.label}>Tên</Text>
                <Text style={overlayStyle.onTheRight}>{nameEvent}</Text>
            </View>
          </View>

          <View style={overlayStyle.bottomRow} >
                <View style={overlayStyle.row}>
                {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                    <Text style={overlayStyle.label}>Bắt đầu</Text>
                    <Text style={overlayStyle.onTheRight}>{startTimeEvent}</Text>
                </View>
            </View>

          <View style={overlayStyle.bottomRow} >
                <View style={overlayStyle.row}>
                {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                    <Text style={overlayStyle.label}>Kết thúc </Text>
                    <Text style={overlayStyle.onTheRight}>{endTimeEvent}</Text>
                </View>
            </View>

            <View style={overlayStyle.bottomRow} >
                <View style={overlayStyle.row}>
                {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                    <Text style={overlayStyle.label}>Mô tả</Text>
                    <Text style={overlayStyle.onTheRight}>{decriptionEvent}</Text>
                </View>
            </View>

            <View style={overlayStyle.bottomRow} >
                <View style={overlayStyle.row}>
              {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                    <Text style={overlayStyle.label}>Loại</Text>
                    <Text style={overlayStyle.onTheRight}>{typeEvent}</Text>
                </View>
            </View>

            <View style={overlayStyle.bottomRow} >
                <View style={overlayStyle.row}>
                {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                    <Text style={overlayStyle.label}>Lịch</Text>
                    <Text style={overlayStyle.onTheRight}>{typeGuest}</Text>
                </View>
            </View>

            <View style={overlayStyle.bottomRow} >
                <View style={overlayStyle.row}>
                {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                    <Text style={overlayStyle.label}>URL</Text>
                    <TouchableOpacity style={overlayStyle.onTheRight} onPress={() =>{ 
                      Alert.alert(
                        "Chuyển tiếp",
                        "Ứng dụng muốn chuyển tiếp đến trang môn học của bạn",
                        [
                          { text: "Từ chối", 
                            style: "cancel"
                          },
                          {
                            text: "Cho phép",
                            onPress: () => Linking.openURL(urlEvent),
                          },
                        ]
                      );}}>
                      <Text style={{color:'blue',textDecorationLine:"underline"}}>
                      {urlEvent}
                      </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {typeEvent !=='Deadline' &&<View style={[{marginBottom:0}]} >
              <View style={overlayStyle.row}>
              {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                <TouchableOpacity style={[overlayStyle.button,{backgroundColor:'red'}]}
                onPress={() =>{
                  deleteEventInCalendar();
                }}>
                    <Text style={overlayStyle.textBtnConnect}>Xóa</Text>
              </TouchableOpacity>

              
                <TouchableOpacity style={[overlayStyle.button,{backgroundColor:'#3366FF'}]}
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate('Modify Event',{
                    idEvent:idEvent,
                    nameEvent: nameEvent,
                    startTimeEvent:Date.parse(startTimeEvent),
                    endTimeEvent:Date.parse(endTimeEvent),
                    decriptionEvent:decriptionEvent,
                    typeEvent:typeEvent,
                    urlEvent:urlEvent,
                    colorEvent:colorEvent,
                    startTimestamp:startTimestamp,
                    endTimestamp:endTimestamp,
                    listGuest:allMembers
                  });
                  }}>
                    <Text style={overlayStyle.textBtnConnect}>Cập nhật</Text>
                </TouchableOpacity>


              </View>
            </View>}

            {isLoading && LoadingScreen()}
          </View>
        </Overlay>

           { Platform.OS === 'ios' ? <DateTimePickerModal
                   // display="inline"
                    display = "inline"
                    isVisible={isDatePickerVisible }
                    time="date"
                    value={currentDate}
                    headerTextIOS={"Lịch"}
                    cancelTextIOS="Huỷ bỏ"
                    confirmTextIOS="Xác nhận"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    // onHide={()=>{
                    //     dispatch(calendarActions.getStatusOfDate(checkValidDate()));
                    // }}
                    />
            :
            <DateTimePickerModal
                   // display="inline"
              isVisible={isDatePickerVisible }
              time="date"
              value={currentDate}
              headerTextIOS={"Lịch"}
              cancelTextIOS="Huỷ bỏ"
              confirmTextIOS="Xác nhận"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              // onHide={()=>{
              //     dispatch(calendarActions.getStatusOfDate(checkValidDate()));
              // }}
              />
          }
         
    </View>
  );
};


const overlayStyle = StyleSheet.create({

  overlay:{
    width:350
  },

  bottomRow:{
    marginBottom:35
  },
 
  headerStyle: {
    textAlign: 'center',
    fontSize:20,
    fontWeight: "bold",
  },


  row:{
    flexDirection:'row',
    marginHorizontal:20,
    marginVertical:10,
  },

  onTheRight: {
    width:200,
    position: 'absolute',
    right: 0
  },

  label: {
    fontSize:15,
    marginLeft:5,
    fontWeight: "bold",
  },

  button:{
    borderRadius:30,
    paddingVertical:15,
    paddingHorizontal: 50,
    marginVertical:30,
    marginHorizontal:15
  },

  textBtnConnect: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
})

export default CalendarScreen;