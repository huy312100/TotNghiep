import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform ,Alert,Linking,Dimensions,FlatList,ActivityIndicator} from 'react-native';
import { Overlay,Header } from 'react-native-elements';
import { Entypo,MaterialCommunityIcons,AntDesign,Ionicons,FontAwesome } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {useDispatch,useSelector} from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications';

import * as authActions from '../../../../store/actions/Authen';
import * as calendarActions from '../../../../store/actions/Calendar';
import * as homeActions from '../../../../store/actions/Home';

import LoadingScreen from '../../LoadingScreen';
import TimelineCalendar from './timeline_calendar/TimelineCalendar';

import * as arrUtils from '../../../utils/Array';
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
  const modeCalendar = useSelector((state) => state.calendar.modeCalendar);

  const [labelTimestamp,setLabelTimestamp] = useState(new Date().getTime());

  const aDayTimestamp = 86400000;

  const [mode,setMode] = useState(modeCalendar);

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
  const [loadingWhenLoadData,setLoadingWhenLoadData] = useState(true);

  const [allEvents,setEvent] = useState([]);
  const dispatch = useDispatch();
  const unmounted = useRef(false);

  

  const toggleOverlay = () => {
    setVisibleOverlay(!visibleOverlay);
  };

  const handleConfirm = (a) => {

    let date = new Date(a);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    setMonthChanged(date.getMonth()+1);
    setYearChanged(date.getFullYear());
    setCurrentDate(year+'-' + month+'-'+dt);

    setLabelTimestamp(new Date(a).getTime());    
    setDatePickerVisibility(false);
  };


  const handleCancel = () => {
    setDatePickerVisibility(false);
  }

  //Call getCalendarThis Month Calendar
  const getAllActivitiesInMonth = ()=>{
    setLoadingWhenLoadData(true);
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
      let dataReversed = arrUtils.reverseArr(dataRes);
      if(statusCode === 200){
        const dataCalendar = [];
        for (const key in dataReversed) {
        
          if(dataReversed[key].TypeCalendar !== undefined){
            if(dataReversed[key].ListGuest.length===0){
              dataCalendar.push({
                id:dataReversed[key]._id,
                type:dataReversed[key].TypeEvent,
                title:dataReversed[key].Title,
                summary:dataReversed[key].Decription.text,
                start:dateUtils.ConvertTimestamp(dataReversed[key].StartHour),
                end:dateUtils.ConvertTimestamp(dataReversed[key].EndHour),
                url:dataReversed[key].Decription.url,
                typeGuest:"Cá nhân",
                color:dataReversed[key].Color,
                startTimestamp:dataReversed[key].StartHour,
                endTimestamp:dataReversed[key].EndHour,
                ListGuest:[],
                Notification:dataReversed[key].Notification
            })}
            else{               
              const listAllPeopleChoose = [];
              for(const pos in dataReversed[key].ListGuest){
                listAllPeopleChoose.push({
                  Email:dataReversed[key].ListGuest[pos].Email,
                  HoTen:dataReversed[key].ListGuest[pos].name,
                })
              };
              dataCalendar.push({
                id:dataReversed[key]._id,
                type:dataReversed[key].TypeEvent,
                title:dataReversed[key].Title,
                summary:dataReversed[key].Decription.text,
                start:dateUtils.ConvertTimestamp(dataReversed[key].StartHour),
                end:dateUtils.ConvertTimestamp(dataReversed[key].EndHour),
                url:dataReversed[key].Decription.url,
                typeGuest:"Nhóm",
                color:dataReversed[key].Color,
                startTimestamp:dataReversed[key].StartHour,
                endTimestamp:dataReversed[key].EndHour,
                ListGuest:listAllPeopleChoose,
                Notification:dataReversed[key].Notification
            })}
          }
          else{
            dataCalendar.push({
              id:"",
              //type:dataRes[0].TypeCalendar,
              title:dataReversed[key].nameCourese,
              summary:dataReversed[key].decription,
              startTimestamp: dataReversed[key].duedate-3600,
              endTimestamp: dataReversed[key].duedate,
              start:dateUtils.ConvertTimestamp(dataReversed[key].duedate-3600),
              end:dateUtils.ConvertTimestamp(dataReversed[key].duedate),
              type:"Deadline",
              color: '#66CCFF',
              url:dataReversed[key].url,
              typeGuest:"Cá nhân",
              ListGuest: [],
              Notification:dataReversed[key].duedate
          })
          }
        }
        dataCalendar.sort((a, b) => b.startTimestamp - a.startTimestamp);
        setEvent(dataCalendar);
        dispatch(calendarActions.getCalendarOfMonth(dataCalendar));
        console.log(dataCalendar);
      }
      else if (statusCode === 401){
        Alert.alert(
          "Phiên đăng nhập đã hết hạn",
          "Vui lòng tiến hành đăng nhập lại",
          [
            { text: "OK", 
              onPress: () => {
                AsyncStorage.removeItem('tokenValue').then(async () => {
                  dispatch(authActions.logout);
                  dispatch(homeActions.VisibleBotTab(false));
                  Notifications.cancelAllScheduledNotificationsAsync();
                  navigation.reset({
                    routes: [{ name: "Login" }]
                  });
                })
              }
            },
          ]
        );
      }
      else{
        console.log(statusCode);
      }
      setLoadingWhenLoadData(false);
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
        setLoading(false);
      }
    }).catch(error => console.log('error', error));
  };

  const renderItemViewMonth = ({ item }) => (
    <TouchableOpacity style={calendarStyle.card}
        onPress={() => {
          toggleOverlay();
          setIdEvent(item.id);
          setNameEvent(item.title);
          setStartTimeEvent(item.start);
          setEndTimeEvent(item.end);
          setDecriptionEvent(item.summary);
          setTypeEvent(item.type);
          setTypeGuest(item.typeGuest);
          setUrlEvent(item.url);           
          setColorEvent(item.color); 
          setStartTimestamp(item.startTimestamp);
          setEndTimestamp(item.endTimestamp);
          setAllMembers(item.ListGuest);
        }}
    >
      {/* <View style={{flexDirection:'row'}}>
       <View>
        <View style={viewMonthItem.info}>
            <View style={{flexDirection:'row'}}>
                <Text style={[viewMonthItem.title,{width:Dimensions.get("window").width*0.56}]} numberOfLines={1}>{item.title}</Text>
                <Text style={[viewMonthItem.title,viewMonthItem.onTheRight,{fontWeight:'normal'}]}>{dateUtils.ConvertDateDDMMYY(item.start.slice(0,10))}</Text>
            </View>

            <Text style={[viewMonthItem.title,{fontSize:12,marginTop:10,textAlign:'right',marginRight:20,fontStyle:'italic'}]}>{item.start.slice(11)} - {item.end.slice(11)}</Text>
            <Text style={[viewMonthItem.title,{fontWeight:'normal',marginTop:10}]} numberOfLines={4}>{item.summary}</Text>

        </View>
        
        <View style={[{marginBottom:10,flexDirection:'row',alignItems: 'center'}]}>
          <Text style={[viewMonthItem.title,viewMonthItem.onTheRight,{fontWeight:'normal'}]}>{item.type}</Text>
          {item.typeGuest === 'Nhóm' ? <FontAwesome style={{marginHorizontal:15}} name="group" size={22} color="#817c8f" /> : <Ionicons style={{marginHorizontal:15}} name="person" size={24} color="#817c8f" />}
        </View>
      </View> 
      </View> */}



      <View style={{ flexDirection: "row" }}>
           {item.color === '' || item.color == null ? (
             <View style={[calendarStyle.colorCalendar]} />
           ) : (
             <View
               style={[
                 calendarStyle.colorCalendar,
                 { backgroundColor: item.color },
               ]}
             />
           )}
   
           <View style={{ width: '100%'}}>
             <View style={{ flexDirection: "row", marginBottom: 10 }}>
               <Text style={calendarStyle.label} numberOfLines={1}>
                 {item.title}
               </Text>
               <Text style={{ position: "absolute", right: 10 }}>
                 {dateUtils.ConvertDateDDMMYY(item.start.slice(0, 10))}
               </Text>
             </View>
   
             <View style={{marginRight:10,marginBottom: 8}}>
               <Text style={{textAlign: "right",fontStyle:'italic',fontWeight:'400'}}>{item.start.slice(11)} - {item.end.slice(11)}</Text>
             </View>

             <Text style={[{fontWeight:'normal',marginTop:0,marginBottom:10}]} numberOfLines={4}>{item.summary}</Text>
   
             <View style={{ flexDirection: "row", alignItems: "center" }}>
               {item.typeGuest === "Nhóm" ? (
                 <FontAwesome name="group" size={22} color="black" />
               ) : (
                 <Ionicons name="person" size={24} color="black" />
               )}
               <Text style={{ position: "absolute", right: 10 }}>{item.type}</Text>
             </View>
           </View>
         </View>
      
      
            
    </TouchableOpacity>
);


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
            dispatch(calendarActions.getModeOfCalendar('day'));
            navigation.goBack()
            }}>
                <Entypo name="chevron-left" size={28} color="blue" />
            </TouchableOpacity>
        }

        rightComponent={
          <View style={{flexDirection:'row'}}>
            {/* <TouchableOpacity style={{marginTop:3,marginRight:5}}>
              <MaterialCommunityIcons name="filter" size={24} color="blue" />
            </TouchableOpacity> */}

            <Menu style={{marginRight:5,marginTop:3}}>

              <MenuTrigger>
                  <MaterialCommunityIcons name="filter" size={24} color="blue" />
              </MenuTrigger>

              <MenuOptions>
                <MenuOption onSelect={() => setMode('day')} style={{flexDirection:'row',alignItems: 'center'}}>
                  <Ionicons name="today-sharp" size={23} color="grey" />
                  <Text style={{color: 'grey',marginLeft:10}}>Theo ngày</Text>
                </MenuOption>

                <MenuOption onSelect={() => setMode('month')} style={{flexDirection:'row',alignItems: 'center'}}>
                  <MaterialCommunityIcons name="calendar-month" size={24} color="grey" />
                  <Text style={{color: 'grey',marginLeft:10}}>Theo tháng</Text>
                </MenuOption>
                
              </MenuOptions>
              
              </Menu>

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

        {/* display type of calendar depend mode that user choose  */}

        {/* choose day:type */}
        {mode === 'day' && <View style={headerCalendar.headerStyle}>
          <TouchableOpacity 
            onPress={() =>{
              const timestampConvert =labelTimestamp-aDayTimestamp;
              const date = new Date(timestampConvert);

              setLabelTimestamp(timestampConvert);
              const nextDate=dateUtils.ConvertTimestamp(timestampConvert);

              setMonthChanged(date.getMonth()+1);
              setYearChanged(date.getFullYear());
              setCurrentDate(nextDate.slice(0,10));
          }}>
            <AntDesign name="arrowleft" size={18} color="navy" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>{ setDatePickerVisibility(true); }}>
            <Text style={headerCalendar.labelDate}>{dateUtils.ConvertDateDDMMYY(currentDate)}</Text>
          </TouchableOpacity>
          

          <TouchableOpacity 
            onPress={() =>{
              const timestampConvert =labelTimestamp+aDayTimestamp;
              const date = new Date(timestampConvert);


              setLabelTimestamp(timestampConvert);
              const nextDate=dateUtils.ConvertTimestamp(timestampConvert);

              setMonthChanged(date.getMonth()+1);
              setYearChanged(date.getFullYear());
              setCurrentDate(nextDate.slice(0,10));
            }}
          >
            <AntDesign name="arrowright" size={18} color="navy" />
          </TouchableOpacity>

        </View>}

      {mode === 'day' && <TimelineCalendar
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
        upperCaseHeader
        uppercase
        scrollToFirst
      />}


      {mode === 'month' &&<View style={headerCalendar.headerStyle}>
        <TouchableOpacity onPress={() =>{
            const changed = dateUtils.PreviousMonth(monthChanged,yearChanged);
            setMonthChanged(changed[0]);
            setYearChanged(changed[1]);
            setEvent([]);
        }}>
            <AntDesign name="arrowleft" size={18} color="navy" />
        </TouchableOpacity>

        <TouchableOpacity >
            <Text style={headerCalendar.labelDate}>Tháng {monthChanged} , {yearChanged}</Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() =>{
            const changed = dateUtils.NextMonth(monthChanged,yearChanged);
            setMonthChanged(changed[0]);
            setYearChanged(changed[1]);
            setEvent([]);
        }}>
            <AntDesign name="arrowright" size={18} color="navy" />
        </TouchableOpacity>

      </View>}

      {mode === 'month' && <View style={{flex:1,backgroundColor:'#EEEEEE'}}>
        {loadingWhenLoadData && allEvents.length ===0 && <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue"/>
        </View>}

        {!loadingWhenLoadData && allEvents.length === 0 && <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{color:'#BBBBBB'}}>
              Không tìm thấy lịch sự kiện nào cho tháng này
          </Text>
        </View>}

        <View style={{height:15}}></View>
        <FlatList 
          data={allEvents}
          renderItem={renderItemViewMonth}
          keyExtractor={(item,index) => index.toString()}/>

      </View>}

      


    <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay} >
      <View style={overlayStyle.overlay}>
        <Text style={[overlayStyle.headerStyle,overlayStyle.bottomRow]}>Chi tiết sự kiện</Text>
          <View style={overlayStyle.bottomRow} >
            <View style={overlayStyle.row}>
            {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                <Text style={overlayStyle.label}>Tên</Text>
                <Text numberOfLines={2} style={overlayStyle.onTheRight}>{nameEvent}</Text>
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
                    <Text numberOfLines={3} style={overlayStyle.onTheRight}>{decriptionEvent}</Text>
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

            <View style={overlayStyle.row}>
            {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                <Text style={overlayStyle.label}>URL</Text>
                <TouchableOpacity style={overlayStyle.onTheRight} onPress={() =>{ 
                  Alert.alert(
                    "Chuyển tiếp",
                    "Ứng dụng muốn chuyển tiếp đến trang môn học của bạn",
                    [
                      {
                        text: "Đồng ý",
                        onPress: () => Linking.openURL(urlEvent),
                      },
                      { text: "Từ chối"},
                    ]
                  );}}>
                  <Text numberOfLines={1} style={{color:'blue',textDecorationLine:"underline"}}>
                  {urlEvent}
                  </Text>
                </TouchableOpacity>
            </View>
            

            {typeEvent !=='Deadline' &&<View style={[{marginBottom:0}]} >
              <View style={overlayStyle.row}>
              {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                <TouchableOpacity style={[overlayStyle.button,{backgroundColor:'red'}]}
                onPress={() =>{
                  toggleOverlay();
                  deleteEventInCalendar();
                }}>
                    <Text style={overlayStyle.textBtnConnect}>Xóa</Text>
              </TouchableOpacity>

              
                <TouchableOpacity style={[overlayStyle.button,{backgroundColor:'#3366FF'}]}
                onPress={() => {
                  toggleOverlay();
                  dispatch(calendarActions.addPeopleToCalendar(allMembers));
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
          </View>
        </Overlay>

        { Platform.OS === 'ios' ? <DateTimePickerModal
            display = "inline"
            locale="vi"
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
            locale="vi"
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
        {isLoading && LoadingScreen()}
    </View>
  );
};


const overlayStyle = StyleSheet.create({

  overlay:{
    width:Dimensions.get("window").width*0.75,
    //height:500,
  },

  bottomRow:{
    marginBottom:Dimensions.get("window").height*0.022
  },
 
  headerStyle: {
    textAlign: 'center',
    fontSize:20,
    fontWeight: "bold",
  },


  row:{
    flexDirection:'row',
    marginVertical:0,
    marginHorizontal:3
  },

  onTheRight: {
    width:Dimensions.get("window").width*0.48,
    marginLeft: 'auto',
  },

  label: {
    fontSize:15,
    marginLeft:5,
    fontWeight: "bold",
  },

  button:{
    borderRadius:30,
    paddingVertical:Dimensions.get("window").width*0.036,
    paddingHorizontal: Dimensions.get("window").width*0.1,
    marginTop:10,
    marginHorizontal:6
  },

  textBtnConnect: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});

const headerCalendar = StyleSheet.create({
  headerStyle: {
    flexDirection:'row',
    paddingVertical:15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor:'#DDDDDD',
    borderBottomWidth:1,
    
  },

  labelDate:{
    marginHorizontal:50,
    fontSize:15,
    color:'navy'
  },

});

const viewMonthItem = StyleSheet.create({
  card: {
    borderRadius:20,
    paddingBottom:10,
    marginHorizontal:15,
    marginTop:15,
    marginBottom:8,
  },

  onTheRight: {
      position: 'absolute',
      right: 5
  },

  title: {
      color:'#817c8f',
      fontWeight:'bold',
      marginHorizontal:15,
  },

  info: {
      justifyContent: 'center',
      marginVertical:10
  },

  date: {
      color:'red',
      marginRight:30,
      marginLeft:15,
      fontSize:12
  },
});

const calendarStyle = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "white",
    borderColor:'#DDDDDD',
    borderWidth:1,
    borderRadius: 10,
  },

  label: {
    width: width*0.52,
    fontWeight: "bold",
    fontSize: 15,
  },

  colorCalendar: {
    height: "100%",
    width: 8,
    backgroundColor: "#EEEEEE",
    marginRight: 8,
  },
});

export default CalendarScreen;