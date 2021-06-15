import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import {useDispatch,useSelector} from "react-redux";

import * as homeActions from "../../../store/actions/Home";
import * as profileActions from "../../../store/actions/Profile";
import * as authActions from "../../../store/actions/Authen";
import * as msgActions from "../../../store/actions/Message";

import LoadingScreen from '../LoadingScreen';

const DeviceWidth = Dimensions.get('window').width;

const HomeScreen=({navigation}) =>{

  var socket=io("https://hcmusemu.herokuapp.com");
  const token = useSelector((state) => state.authen.token);
  const [tokenNotification,setTokenNotification] = useState('');

  const unmounted = useRef(false);
  const [isLoading,setLoading]=useState(false);
  const [newDeadline,setNewDeadline]=useState([]);

  //const newDeadline = useSelector((state) => state.home.newDeadline);

  const dispatch = useDispatch();

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;
    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }
    // ie: 2014-03-24, 3:00 PM
    time = dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
    return time;
};

  useEffect(() =>{
    const getAllHomeInfo = async() =>{
      await getPermissionNotifications();
      await getNewestDeadline();
      //console.log(newDeadline);


      await connectToSocket();
      
      await getRequestChatting();
      
      await getProfile();
      
    }
    getAllHomeInfo();
    return()=>{
      unmounted.current = true
    };
  },[]);

  const getProfile = async() =>{
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
        //console.log(json);

        //console.log(dataUniversity);
        dispatch(profileActions.getProfile(json));
        setLoading(false);
      }).catch((err) => console.log(err, "error"));
  };

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

    console.log(formBody);

    fetch("https://hcmusemu.herokuapp.com/account/tokennotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `bearer ${token}`,
      },
      body: formBody,
    }).then((response) => response.json())
      .then((json) => {
        console.log(json);
      }).catch((err) => console.log(err, "error"));
  };
  
  return (

    
    <SafeAreaView style={styles.container}>
      
      {isLoading && LoadingScreen()}
      {!isLoading && <View>
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
            <TouchableOpacity style={styles.gridTouchable} >
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
            <TouchableOpacity style={styles.gridTouchable}>
            <Icon name="pencil-alt" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Điểm số</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable}>
            <Icon name="envelope-open-text" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Mail</Text>
            </TouchableOpacity> 
          </View>

        </View>
              
      </View>
        

      <Text style={styles.label}>Deadline trong tháng</Text>
      
      {newDeadline.length > 0 &&
        <FlatList 
        data={newDeadline}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
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
                  <Text style={styles.courseName}>{item.nameCourese}</Text>
                  <Text style={styles.timeDeadline}>{convertTimestamp(item.duedate)}</Text>
                </View>
                <Text style={styles.contentDeadline}>{item.decription}</Text>
              </View>
            </View>
          </TouchableOpacity>)}/>
      }

    </View>}
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
    margin:10,
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
    width: '100%',
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
    backgroundColor: "transparent",
    marginLeft:5
  },

  card: {
    width: '100%',
  },
})

export default HomeScreen;