import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ScrollView,ImageBackground,SafeAreaView } from 'react-native';
import { Icon } from "react-native-elements";
import io from 'socket.io-client';
import { FontAwesome , Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


import {useDispatch,useSelector} from "react-redux";

import * as homeActions from "../../../store/actions/Home";
import * as profileActions from "../../../store/actions/Profile";
import * as authActions from "../../../store/actions/Authen";
import * as msgActions from "../../../store/actions/Message";
import * as calendarActions from "../../../store/actions/Calendar";
import * as newsActions from "../../../store/actions/News";

import * as dateUtils from "../../utils/Date";

import LoadingScreen from '../LoadingScreen';

const DeviceWidth = Dimensions.get('window').width;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen= ({navigation}) =>{

  const token = useSelector((state) => state.authen.token);
  var socket=io("https://hcmusemu.herokuapp.com");
  const [tokenNotification,setTokenNotification] = useState('');

  const unmounted = useRef(false);
  const [isLoading,setLoading]=useState(false);
  const [newDeadline,setNewDeadline]=useState([]);
  const [calendar,setCalendar] = useState([]);
  const [uniNews,setUniNews] = useState([]);
  const [facultNews,setFacultNews] = useState([]);
  const [webCustomed,setWebCustomed] = useState([]);

  //const newDeadline = useSelector((state) => state.home.newDeadline);

  const dispatch = useDispatch();

  var countMsgNotRead = 0;

  useEffect(() =>{
      console.log(token);
      getPermissionNotifications();
      connectToSocket();
      getNewestDeadline();
      const unsubscribe = navigation.addListener('focus', () => {
        getAllActivitiesInMonth();
        getWebCustomed();
        localNotification();
      });
      getUniversityNew();
      getFacultyNew();
      getRequestChatting();
      getNotReadNotifications();
      getAwaitMsgNotRead();
      getMsgNotRead();
      getProfile();

      const backgroundSubscription= Notifications.addNotificationResponseReceivedListener(
        (response)=>{
        console.log(response);
        if(response.notification.request.content.title === 'Tin Tức Trường'){
          navigation.navigate('University Info');
        }
        else if(response.notification.request.content.title === 'Tin Tức Khoa'){
          navigation.navigate('University Info',{
            screen:'Faculty New'
          });
        }
        else if(response.notification.request.content.title === 'Môn học mới'){
          navigation.navigate("Course")
        }
        else if(response.notification.request.content.title === 'Deadline môn học' || response.notification.request.content.title === 'Nội dung môn học'){
          navigation.navigate('Content Course',{
            idCourse: 1468,
            name: '',
          });
        }
        else{
          
        }
      });
  
      const foregroundSubscription= Notifications.addNotificationsDroppedListener(
        (notification)=>{
        //console.log(notification);
      });
    return()=>{
      unmounted.current = true;
      unsubscribe();
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  },[]);

   
  //call api get not read notifications
  const getNotReadNotifications = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/notification",requestOptions)
    .then((response) => {
      const statusCode = response.status;
      const dataRes = response.json();
      return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
      if (statusCode === 200) {
        let countNotRead = 0;
        for (const key in dataRes) {
          if(!dataRes[key].State){
            countNotRead++;
          };
        };
        dispatch(homeActions.NotiNotRead(countNotRead));
      }        
    }).catch((err) => console.log(err, "error"));
  };

  //call api get not read await message
  const getAwaitMsgNotRead = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("https://hcmusemu.herokuapp.com/chat/findchatawait",requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=> {
      console.log(statusCode,dataRes);
      if (statusCode === 200) {
        for (const key in dataRes.awaittext) {
          if(!dataRes.awaittext[key].state){
            countMsgNotRead++;
          }
        }
      }        
      else{
          console.log(statusCode)
      }
    }).catch((err) => console.log(err, "error"));
  };

  //call api get not read message
  const getMsgNotRead = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://hcmusemu.herokuapp.com/chat/findchat",requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=> {
        console.log(statusCode,dataRes);
        if (statusCode === 200) {
          if(dataRes.message==='Message is Empty'){
            return;
          }
          else{
            for (const key in dataRes) {
              if(!dataRes[key].state){
                countMsgNotRead++;
              }
            }
          }
        }
        else{
          console.log(statusCode)
        }
        // setLoadingFacultScreen(false);
        dispatch(homeActions.MessageNotRead(countMsgNotRead));
    }).catch((err) => console.log(err, "error"));
  };

  //Call getCalendarThis Month Calendar
  const getAllActivitiesInMonth = ()=>{
    let details = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
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
                type:dataRes[key].TypeCalendar,
                title:dataRes[key].Title,
                summary:dataRes[key].Decription.text,
                start:dateUtils.ConvertTimestamp(dataRes[key].StartHour),
                end:dateUtils.ConvertTimestamp(dataRes[key].StartHour),
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
              type:dataRes[0].TypeCalendar,
              title:dataRes[key].nameCourese,
              summary:dataRes[key].Decription.text,
              start:dateUtils.ConvertTimestamp(dataRes[key].duedate-3600),
              end:dateUtils.ConvertTimestamp(dataRes[key].duedate),
              type:"Deadline",
              color: '#99FF99',
              url:dataRes[key].url,
              typeGuest:"Cá nhân",
              Notification:dataRes[key].duedate-1800
            })
          }
        }
        console.log(dataCalendar);
        dispatch(calendarActions.getCalendarOfMonth(dataCalendar));
        setCalendar(dataCalendar)
      }
      else if (statusCode === 401){
        console.log("Token het han");
      }
      else{
        console.log(statusCode);
      }
    }).catch(error => console.log('error', error));
  };

  //call api get all university news
  const getUniversityNew = () =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/info/newsuniversity",requestOptions)
    .then((responseNewUni) => {
        const statusCodeNewUni = responseNewUni.status;
        const dataResNewUni = responseNewUni.json();
        return Promise.all([statusCodeNewUni, dataResNewUni]);
    }).then(([statusCodeNewUni, dataResNewUni]) => {
        if(statusCodeNewUni === 200){
            const tmpNew =[];
            for (const key in dataResNewUni) {
                tmpNew.push(
                {
                  title: dataResNewUni[key].Title,
                  link:dataResNewUni[key].Link,
                  date:dataResNewUni[key].Date,
                });
            };
            setUniNews(tmpNew);
            dispatch(newsActions.getUniNews(tmpNew));
        }

        else if (statusCodeNewUni === 500){
        }
        else if (statusCodeNewUni === 503){
        }
        else{
        }
        
    }).catch((err) => console.log(err, "error"));
  };

  //call api get all faculty news
  const getFacultyNew = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/info/newsfaculty",requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=> {
        console.log(statusCode,dataRes);
        if (statusCode === 200) {
            const tmpNew =[];
            for (const key in dataRes) {
                tmpNew.push(
                {
                    title: dataRes[key].Title,
                    link:dataRes[key].Link,
                    date:dataRes[key].Date,
                });
            }
            setFacultNews(tmpNew);
            dispatch(newsActions.getFacultNews(tmpNew));
        }
        else if (statusCode === 500){
            setStatusCode(statusCode);
        }
        else if (statusCode === 503){
            setStatusCode(statusCode)
        }
        else{
            setStatusCode(statusCode);
        }
    })
    .catch((err) => console.log(err, "error"));
  };


  //call api get web customed
  const getWebCustomed = () =>{
    //console.log(token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/web/getcustomlink",requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
        const tmp =[];
        if (statusCode === 200){
          for (const key in dataRes) {
              tmp.push(
              {
                  Type: dataRes[key].Type,
                  Url:dataRes[key].Url,
              });
          };
          setWebCustomed(tmp)
          dispatch(profileActions.getAllWebCustomed(tmp));
        }  
    })
    .catch((err) => console.log(err, "error"));
  };

  //call api get profile
  const getProfile = () =>{
    //console.log(token);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/profile/view",requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        //console.log(dataUniversity);
        dispatch(profileActions.getProfile(json));
        dispatch(homeActions.VisibleBotTab(true));
        setLoading(false);
      }).catch((err) => console.log(err, "error"));
  };

  //call api get newest deadline
  const getNewestDeadline = () =>{
    setLoading(true);
    //console.log(token);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month",requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);

        dispatch(homeActions.NewestDeadline(json));
        //console.log(dataUniversity);
        setNewDeadline(json);
        
      }).catch((err) => console.log(err, "error"));
  };

  //Get permission to notifications on iOS 
  const getPermissionNotifications = () =>{
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
    }).then((res)=>{
      setTokenNotification(res.data);
      dispatch(authActions.storeTokenNotification(res.data));
      //console.log(tokenNotification);
      postTokenNotification(res.data);
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  };

  //Connect to socket
  const connectToSocket = () => {
    socket.emit("Start",token);
    dispatch(authActions.connectToSocket(socket));
  };

  //get request to chatting
  const getRequestChatting = () => {
    socket.on("Request-Accept",(data)=>{
      console.log(data);
      dispatch(msgActions.FirstReadMessage(data));
    });
  };

  const postTokenNotification = (tokenNotification) => {
    let details = {
      TokenNotification: tokenNotification,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/account/tokennotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `bearer ${token}`,
      },
      body: formBody,
    }).then((response) => response.json())
      .then((json) => {

      }).catch((err) => console.log(err, "error"));
  };


  //local notifications calendar
  const localNotification = async () =>{

    for (const key in calendar){
      const date = new Date(calendar[key].Notification);
      const id=await Notifications.scheduleNotificationAsync({
        content:{
          title:calendar[key].title,
          body:calendar[key].summary
        },
        trigger: {
          //date:new Date(new Date(1331209044000).toISOString()).getTime(),
          day:date.getDate(),
          month:date.getMonth()+1,
          year:date.getFullYear(),
          hour:date.getHours(),
          minute:date.getMinutes()
        }
      });
      console.log(id);
    }
  };



  //Render

  const renderNewestDeadlineItem = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() =>{
      Alert.alert(
        "Chuyển tiếp",
        "Ứng dụng muốn chuyển tiếp đến trang môn học của bạn",
        [
          { text: "Từ chối", 
            style: "cancel"
          },
          {
            text: "Cho phép",
            onPress: () => Linking.openURL(item.url),
          },
        ]
      );
      
    }}>
      <View style={styles.deadlineInfo}>
        <View style={styles.deadlineImgWrapper}>
          <Image style={styles.deadlineImg} source={require("../../../assets/moodle-deadline.png")} />
        </View>
        <View style={styles.textSection}>
          <View style={styles.courseInfoText}>
            <Text style={styles.courseName}>{item.nameCourese}</Text> */
            <Text style={styles.timeDeadline}>{dateUtils.ConvertTimestamp(item.duedate)}</Text>
          </View>
          <Text style={styles.contentDeadline}>{item.decription}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyNewsetDeadline = (
    <View style={{marginLeft:50}}> 
      <Text>Không có deadline nào trong tháng này</Text>
    </View>
  );

  const renderEmptyCalendarInMonth = (
    <View style={{marginLeft:50}}> 
      <Text>Không có sự kiện nào trong tháng này</Text>
    </View>
  );

  const renderCalendarInMonth = ({item}) =>(
    <TouchableOpacity style={calendarStyle.card}>
      <View style={{flexDirection:'row'}}>

        {item.color === '' ? 
          <View style={[calendarStyle.colorCalendar]}/>
          :
          <View style={[calendarStyle.colorCalendar,{backgroundColor:item.color}]}/>
        }

        <View style={{width:300}}>
          <View style={{flexDirection:'row',marginBottom:10}}> 
            <Text style={calendarStyle.label} numberOfLines={1}>{item.title}</Text>
            <Text style={{position:'absolute',right:0}}>{dateUtils.ConvertDateDDMMYY(item.start.slice(0,10))} </Text>
          </View>

          

          <View style={{flexDirection:'row',marginBottom:10}}> 
            <Text>{item.start.slice(11)} - </Text>
            <Text>{item.end.slice(11)}</Text>
          </View>

          <View style={{flexDirection:'row'}}> 
            {item.typeGuest === 'Nhóm' ? <FontAwesome name="group" size={22} color="black" /> : <Ionicons name="person" size={24} color="black" />}
            <Text style={{position:'absolute',right:0}}>{item.type}</Text>
          </View>

        </View>
        
      </View>
      
    </TouchableOpacity>
  );

  const renderNewsItem = ({item}) => (
    <TouchableOpacity style={newsStyle.card}>
      <Text numberOfLines={2} style={newsStyle.title}>{item.title}</Text>
      <Text>{item.date}</Text>
    </TouchableOpacity>
  )
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && LoadingScreen()}
      
      {!isLoading &&<ScrollView>
        <Text style={styles.label}>Khám phá ngay</Text>
      <View >
        <View style={styles.gridMainFunctions} >
          
          <View style={styles.gridItemShape} >
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("Calendar");
            }}>
                <Icon name="calendar-alt" type="font-awesome-5" color="red" size={40}/>
                <Text style={styles.textItem}>Lịch hoạt động</Text>
              </TouchableOpacity>
          </View>
          
          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("Course")
            }}>
            <Icon name="graduation-cap" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}> Khóa học</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.gridItemShape} >
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("Forum");
            }}>
            <Icon name="forum" type="material-community" color="red" size={40}/>
                <Text style={styles.textItem}>Diễn đàn</Text>
            </TouchableOpacity> 
          </View> 

        </View>

        <View style={styles.gridMainFunctions}>

          <View style={styles.gridItemShape}  >          
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("University Info")
            }}>
            <Icon name="info-circle" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Thông tin trường</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable}
              onPress={() => {
                var obj = webCustomed.find(item => item.Type === 'Portal');
                console.log(obj);
                if(obj !== undefined){
                  Linking.openURL(obj.Url)
                }
                else{
                  Alert.alert(
                    "Chưa kết nối",
                    " Vui lòng vô phần cài đặt để thiết lập kết nối đến portal",
                    [
                      { text: "OK", 
                        style: "cancel"
                      },
                    ]
                  );
                }
              }}
            >
            <Icon name="pencil-alt" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Điểm số</Text>
            </TouchableOpacity> 
          </View>

          {/* <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable}>
            <Icon name="envelope-open-text" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Mail</Text>
            </TouchableOpacity> 
          </View> */}

        </View>
              
      </View>
        

      <Text style={styles.label}>Deadline trong tháng</Text>
      
      <FlatList 
        data={newDeadline}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNewestDeadlineItem}
        ListEmptyComponent={renderEmptyNewsetDeadline}/>
      

      <Text style={styles.label}>Lịch trong tháng</Text>

      <FlatList
        data={calendar}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCalendarInMonth}
        ListEmptyComponent={renderEmptyCalendarInMonth}/>


      <Text style={styles.label}> Top 5 tin tức trường mới nhất</Text>

      <FlatList
        data={uniNews.slice(0,5)}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNewsItem}/>

      <Text style={styles.label}> Top 5 tin tức khoa mới nhất</Text>

      <FlatList
        data={facultNews.slice(0,5)}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNewsItem}/>

      </ScrollView>
    }
    

    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gridMainFunctions: {
    flexDirection: 'row',
  },

  gridItemShape:{
    borderWidth: 1,
    borderColor:"#DDDDDD",
    borderRadius: 1,// Must add to change border style
    borderStyle: 'dotted',
    width: DeviceWidth/3,
    height: DeviceWidth*0.3,
  },

  label: {
    marginVertical:15,
    marginHorizontal:10,
    fontSize:16,
    fontWeight: "bold",
  },

  gridTouchable: {
    width:"100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center"
  },

  textItem: {
    marginTop:15,
  },

  deadlineInfo:{
    flexDirection:"row",
    justifyContent: "space-between",
  },

  textSection:{
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  courseInfoText:{
    flexDirection: "row",
    marginBottom: 10,
  },

  courseName:{
    fontSize: 13,
    fontWeight: "bold",
  },

  timeDeadline: {
    fontSize: 11,
    color:"#666",
    marginLeft:25
  },

  contentDeadline:{
    fontSize: 15,
    color: "#333333",
  },

  deadlineImgWrapper:{
    paddingTop: 10,
    paddingBottom: 10,
  },

  deadlineImg:{
    width: 50,
    height: 50,
    marginLeft:5
  },

  card:{
    marginHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
  },
});

const calendarStyle = StyleSheet.create({
  card:{
    marginHorizontal: 8,
    padding:15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
  },

  label:{
    fontWeight:'bold',
    fontSize:15
  },

  colorCalendar: {
    height:'100%',
    width:8,
    backgroundColor:'#EEEEEE',
    marginRight:8
  }
});

const newsStyle = StyleSheet.create({
  card:{
    marginHorizontal: 8,
    padding:15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    width:300,
  },

  title: {
    marginBottom:10
  }

})

export default HomeScreen;