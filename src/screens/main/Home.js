import React,{useState,useEffect,useRef} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Linking } from 'react-native';

import { MaterialIcons,Entypo } from '@expo/vector-icons';

import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import {useSelector} from "react-redux";

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import * as authenServices from '../../services/Authen';
import * as dateUtils from '../../utils/Date';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

LocaleConfig.locales['fr'] = {
  monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  monthNamesShort: ['Thg 1','Thg 2','Thg 3','Thg 4','Thg 5','Thg 6','Thg 7','Thg 8','Thg 9','Thg 10','Thg 11','Thg 12'],
  dayNames: ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật'],
  dayNamesShort: ['T2','T3','T4','T5','T6','T7','CN'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'fr';

const HomeScreen =({navigation}) =>{
    const token = useSelector((state) => state.authen.token);

    const unmounted = useRef(false);

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const currentDate = dateUtils.CurrentDateYYMMDD();
    const [isLoading,setLoading]=useState(false);
    const [allDeadlineOfMonth,setAllDeadlineOfMonth] = useState([]);
    const [deadlineThisMonth,setDeadlineThisMonth] = useState([]);
    const [tokenNotification,setTokenNotification] = useState('');
    const [markDate,setMarkDate] = useState({});


    useEffect(()=>{
        getPermissionNotifications();
        getAllDeadlineInMonth();
        return()=>{
            unmounted.current = true;
        }
    },[month,year]);

    const getAllDeadlineInMonth = async () => {
      setLoading(true);
      let details = {
        month: month,
        year: year,
      };
  
      let formBody = [];
  
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
  
      console.log(formBody);
  
      await fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month/parent", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `bearer ${token}`,
        },
        body: formBody,
      })
        .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        })
        .then(([statusCode, dataRes]) => {
          if (statusCode === 200) {
            let dataReversed = dataRes.reverse();
            if (dataReversed.length >= 5) {
              dataReversed = dataReversed.slice(0, 5);
            }
            setDeadlineThisMonth(dataReversed);
            const dataCalendar = [];
            for (const key in dataRes) {
              dataCalendar.push(
                dateUtils.ConvertTimestampToDate(dataRes[key].duedate)
              )
            };
            //console.log(dataCalendar);
            setAllDeadlineOfMonth(dataCalendar);
            pushToCalendar(dataCalendar);
          }
          setLoading(false);
          //tmp.concat(json)
        })
        .catch((err) => console.log(err, "error"));
    };

    //Get permission to notifications on iOS 
    const getPermissionNotifications = () =>{
      setLoading(true);
      Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) =>{
        if(statusObj.status !== 'granted'){
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      }).then((statusObj) =>{
        if(statusObj.status !== 'granted'){
          throw new Error('Permission not granted');
        }
      }).then(()=>{
        return Notifications.getExpoPushTokenAsync();
      }).then(async(res)=>{
        console.log(res);
        setTokenNotification(res.data);
        //console.log(tokenNotification);
        await authenServices.postTokenNotification(token,res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    };

    const pushToCalendar =(data) => {
      let tmp = {};

      data.forEach((day) => {
        tmp[day] = {
            selected: true,
            marked: true,
            selectedColor: 'orange'
        };
      });
      setMarkDate(tmp);
    };

    

    return(
        <View style={styles.container}>
            <View style={{marginVertical:10,marginHorizontal:10,justifyContent:'center'}}>
                <Text style={styles.label}>Hoạt động trong tháng </Text>
                <TouchableOpacity style={styles.detailCalendarBtn}
                    onPress={() =>{
                        navigation.navigate('Detail Calendar');
                    }}>
                    <Text style={{fontSize:12,color:'#BBBBBB'}}>Chi tiết</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={15.5} color="#BBBBBB" />
                </TouchableOpacity>
                
            </View>

            <View>{console.log(markDate)}</View>

            <Calendar 
                //current={dateUtils.CurrentDateYYMMDD()}
                //showWeekNumbers={true}
                enableSwipeMonths={true}

                onMonthChange={(obj) => {
                  setMonth(obj.month);
                  setYear(obj.year);
                }}

                

                //onDayPress={(day) => {console.log('selected day', day)}}
                
                markedDates={markDate}
            />

            <Text style={[styles.label,{marginVertical:10,marginHorizontal:10}]}>Các sự kiện trong tháng</Text>

            {deadlineThisMonth.length === 0 && <View style={{alignItems: 'center'}}>
                <Text style={{marginVertical:10}}>Không có sự kiện nào </Text>
            </View>}

            {deadlineThisMonth.map((item, index)=>( 
            <TouchableOpacity key={index}
              style={styles.card}
              onPress={() => {
                Linking.openURL(item.url);
              }}
            >
              <View style={styles.info}>
                <View>
                  <Text style={styles.title}>{item.nameCourese}</Text>
                  <Text style={[styles.title, { fontWeight: "normal", marginTop: 10 }]}>
                    {item.decription}
                  </Text>
                </View>

                <Entypo
                  style={styles.onTheRight}
                  name="chevron-thin-right"
                  size={20}
                  color="blue"
                />
              </View>

              <View tyle={[styles.info, { marginBottom: 20 }]}>
                <Text style={styles.date}>
                  Hạn chót: {dateUtils.ConvertTimestampToVNTime(item.duedate)}
                </Text>
              </View>
            </TouchableOpacity>))}
            </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    label:{
        fontSize:15,
        fontWeight:'bold'
    },

    detailCalendarBtn:{
        position:'absolute',
        right:0,
        flexDirection:'row',
        justifyContent:'center'
    },

    card: {
      borderRadius: 20,
      backgroundColor: "white",
      paddingBottom: 10,
      marginHorizontal: 15,
      marginTop: 15,
      borderWidth: 0.3,
      borderColor: "silver",
    },
  
    onTheRight: {
      position: "absolute",
      right: 5,
    },
  
    title: {
      fontWeight: "bold",
      marginRight: 30,
      marginLeft: 15,
    },
  
    info: {
      justifyContent: "center",
      marginVertical: 10,
    },
  
    date: {
      color: "red",
      marginRight: 30,
      marginLeft: 15,
      fontSize: 12,
    },
});

export default HomeScreen; 