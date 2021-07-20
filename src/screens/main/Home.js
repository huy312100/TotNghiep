import React,{useState,useEffect,useRef} from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import {useDispatch,useSelector} from "react-redux";

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

    const dispatch = useDispatch();
    const unmounted = useRef(false);

    const currentDate =dateUtils.CurrentDateYYMMDD();
    const [isLoading,setLoading]=useState(false);
    const [deadlineThisMonth,setDeadlineThisMonth] = useState([]);
    const [tokenNotification,setTokenNotification] = useState('');


    useEffect(()=>{
        getPermissionNotifications();
        getDeadlineThisMonth();
        return()=>{
            unmounted.current = true;
        }
    },[]);


    const getDeadlineThisMonth = () =>{
        //console.log(token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month/parent",requestOptions)
          .then((response) => response.json())
          .then((json) => {
            console.log(json);    
            //dispatch(homeActions.NewestDeadline(json));
            //console.log(dataUniversity);
            setDeadlineThisMonth(json);
            setLoading(false);
            
          }).catch((err) => console.log(err, "error"));
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
          setTokenNotification(res.data);
          //console.log(tokenNotification);
          await authenServices.postTokenNotification(token,res.data);
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      };

    return(
        <View style={styles.container}>
            <View style={{marginVertical:10,marginHorizontal:10,justifyContent:'center'}}>
                <Text style={styles.label}>Hoạt động trong tháng </Text>
                <TouchableOpacity style={styles.detailCalendarBtn}
                    onPress={() =>{
                        console.log(currentDate);
                        navigation.navigate('Detail Calendar');
                    }}>
                    <Text style={{fontSize:12,color:'#BBBBBB'}}>Chi tiết</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={15.5} color="#BBBBBB" />
                </TouchableOpacity>
                
            </View>
            <Calendar 
                //current={dateUtils.CurrentDateYYMMDD()}
                //showWeekNumbers={true}
                enableSwipeMonths={true}

                onDayPress={(day) => {console.log('selected day', day)}}

                markedDates={{
                    //currentDate: {selectedColor:'blue',selected:true},
                     '2021-07-08': {selected: true, marked: true, selectedColor: 'blue'},
                    '2021-05-13': {marked: true,selected: true, selectedColor: 'red'},
                    // '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                    // '2012-05-19': {disabled: true, disableTouchEvent: true}
                }}
            />

            <Text style={[styles.label,{marginVertical:10,marginHorizontal:10}]}>Các sự kiện sắp kết thúc</Text>

            <View style={{alignItems: 'center'}}>
                <Text style={{marginVertical:10}}>Không có sự kiện nào </Text>
            </View>
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
    }
});

export default HomeScreen; 