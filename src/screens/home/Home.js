import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Alert,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  SectionList
} from "react-native";

import io from "socket.io-client";

import {
  FontAwesome,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { useDispatch, useSelector } from "react-redux";

import * as homeActions from "../../../store/actions/Home";
import * as profileActions from "../../../store/actions/Profile";
import * as authActions from "../../../store/actions/Authen";
import * as msgActions from "../../../store/actions/Message";
import * as calendarActions from "../../../store/actions/Calendar";
import * as newsActions from "../../../store/actions/News";

import * as dateUtils from "../../utils/Date";
import * as arrUtils from "../../utils/Array";

import LoadingScreen from "../LoadingScreen";

const DeviceWidth = Dimensions.get("window").width;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ navigation }) => {
  const token = useSelector((state) => state.authen.token);
  var socket = io("https://hcmusemu.herokuapp.com");
  const [tokenNotification, setTokenNotification] = useState("");

  const unmounted = useRef(false);
  const [isLoading, setLoading] = useState(false);
  const [newDeadline, setNewDeadline] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [uniNews, setUniNews] = useState([]);
  const [facultNews, setFacultNews] = useState([]);
  const [webCustomed, setWebCustomed] = useState([]);

  //const newDeadline = useSelector((state) => state.home.newDeadline);

  const dispatch = useDispatch();

  var countMsgNotRead = 0;

  const currentTimestamp = new Date().getTime();

  useEffect(() => {
    console.log(token);
    getPermissionNotifications();
    connectToSocket();
    const unsubscribe = navigation.addListener("focus", () => {
      getNewestDeadline();
      getAllActivitiesInMonth();
      getWebCustomed();
      localNotification();
      getUniversityNew();
      getFacultyNew();
    });
    getRequestChatting();
    getNotReadNotifications();
    getAwaitMsgNotRead();
    getMsgNotRead();
    getProfile();

    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        if (response.notification.request.content.title === "Tin Tức Trường") {
          navigation.navigate("University Info");
        } else if (
          response.notification.request.content.title === "Tin Tức Khoa"
        ) {
          navigation.navigate("University Info", {
            screen: "Faculty New",
          });
        } else if (
          response.notification.request.content.title === "Môn học mới"
        ) {
          navigation.navigate("Course");
        } else if (
          response.notification.request.content.title === "Deadline môn học" ||
          response.notification.request.content.title === "Nội dung môn học"
        ) {
          navigation.navigate("Content Course", {
            idCourse: 1468,
            name: "",
          });
        } else {
        }
      });

    const foregroundSubscription =
      Notifications.addNotificationsDroppedListener((notification) => {
        //console.log(notification);
      });
    return () => {
      unmounted.current = true;
      unsubscribe();
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  //call api get not read notifications
  const getNotReadNotifications = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://hcmusemu.herokuapp.com/notification", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        if (statusCode === 200) {
          let countNotRead = 0;
          if (dataRes.message !== "Dont have notification") {
            for (const key in dataRes) {
              if (!dataRes[key].State) {
                countNotRead++;
              }
            }
          }
          dispatch(homeActions.NotiNotRead(countNotRead));
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  //call api get not read await message
  const getAwaitMsgNotRead = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://hcmusemu.herokuapp.com/chat/findchatawait", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        console.log(statusCode, dataRes);
        if (statusCode === 200) {
          if (dataRes.message === "Message await is Empty") {
            return;
          } else {
            for (const key in dataRes.awaittext) {
              if (!dataRes.awaittext[key].state) {
                countMsgNotRead++;
              }
            }
          }
        } else {
          console.log(statusCode);
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  //call api get not read message
  const getMsgNotRead = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://hcmusemu.herokuapp.com/chat/findchat", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        console.log(statusCode, dataRes);
        if (statusCode === 200) {
          if (dataRes.message === "Message is Empty") {
            return;
          } else {
            for (const key in dataRes) {
              if (!dataRes[key].state) {
                countMsgNotRead++;
              }
            }
          }
        } else {
          console.log(statusCode);
        }
        // setLoadingFacultScreen(false);
        dispatch(homeActions.MessageNotRead(countMsgNotRead));
      })
      .catch((err) => console.log(err, "error"));
  };

  //Call getCalendarThis Month Calendar
  const getAllActivitiesInMonth = () => {
    let details = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
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
        let dataReversed = arrUtils.reverseArr(dataRes);
        if (statusCode === 200) {
          console.log(dataRes);
          if (dataReversed.length >= 5) {
            dataReversed = dataReversed.slice(0, 5);
          }
          const dataCalendar = [];
          for (const key in dataReversed) {
            if (dataReversed[key].TypeCalendar !== undefined) {
              if (dataReversed[key].ListGuest.length === 0) {
                dataCalendar.push({
                  id: dataReversed[key]._id,
                  type: dataReversed[key].TypeEvent,
                  title: dataReversed[key].Title,
                  summary: dataReversed[key].Decription.text,
                  start: dateUtils.ConvertTimestamp(dataReversed[key].StartHour),
                  end: dateUtils.ConvertTimestamp(dataReversed[key].EndHour),
                  url: dataReversed[key].Decription.url,
                  typeGuest: "Cá nhân",
                  color: dataReversed[key].Color,
                  startTimestamp: dataReversed[key].StartHour,
                  endTimestamp: dataReversed[key].EndHour,
                  ListGuest: dataReversed[key].ListGuest,
                  Notification: dataReversed[key].Notification,
                });
              } else {
                dataCalendar.push({
                  id: dataReversed[key]._id,
                  type: dataReversed[key].TypeEvent,
                  title: dataReversed[key].Title,
                  summary: dataReversed[key].Decription.text,
                  start: dateUtils.ConvertTimestamp(dataReversed[key].StartHour),
                  end: dateUtils.ConvertTimestamp(dataReversed[key].StartHour),
                  url: dataReversed[key].Decription.url,
                  typeGuest: "Nhóm",
                  color: dataReversed[key].Color,
                  startTimestamp: dataReversed[key].StartHour,
                  endTimestamp: dataReversed[key].EndHour,
                  ListGuest: dataReversed[key].ListGuest,
                  Notification: dataReversed[key].Notification,
                });
              }
            } else {
              dataCalendar.push({
                id: "",
                title: dataReversed[key].nameCourese,
                summary: dataReversed[key].decription,
                start: dateUtils.ConvertTimestamp(dataReversed[key].duedate - 3600),
                end: dateUtils.ConvertTimestamp(dataReversed[key].duedate),
                type: "Deadline",
                color: "#66CCFF",
                url: dataReversed[key].url,
                typeGuest: "Cá nhân",
                Notification: dataReversed[key].duedate,
              });
            }
          }
          console.log(dataCalendar);
          dispatch(calendarActions.getCalendarOfMonth(dataCalendar));
          setCalendar(dataCalendar);
        } else if (statusCode === 401) {
          console.log("Token het han");
        } else {
          console.log(statusCode);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //call api get all university news
  const getUniversityNew = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://hcmusemu.herokuapp.com/info/newsuniversity", requestOptions)
      .then((responseNewUni) => {
        const statusCodeNewUni = responseNewUni.status;
        const dataResNewUni = responseNewUni.json();
        return Promise.all([statusCodeNewUni, dataResNewUni]);
      })
      .then(([statusCodeNewUni, dataResNewUni]) => {
        if (statusCodeNewUni === 200) {
          const tmpNew = [];
          for (const key in dataResNewUni) {
            tmpNew.push({
              title: dataResNewUni[key].Title,
              link: dataResNewUni[key].Link,
              date: dataResNewUni[key].Date,
            });
          }
          setUniNews(tmpNew);
          dispatch(newsActions.getUniNews(tmpNew));
        } else if (statusCodeNewUni === 500) {
        } else if (statusCodeNewUni === 503) {
        } else {
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  //call api get all faculty news
  const getFacultyNew = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://hcmusemu.herokuapp.com/info/newsfaculty", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        console.log(statusCode, dataRes);
        if (statusCode === 200) {
          const tmpNew = [];
          for (const key in dataRes) {
            tmpNew.push({
              title: dataRes[key].Title,
              link: dataRes[key].Link,
              date: dataRes[key].Date,
            });
          }
          setFacultNews(tmpNew);
          dispatch(newsActions.getFacultNews(tmpNew));
        }
        // else if (statusCode === 500){
        //     setStatusCode(statusCode);
        // }
        // else if (statusCode === 503){
        //     setStatusCode(statusCode)
        // }
        else {
          //setStatusCode(statusCode);
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  //call api get web customed
  const getWebCustomed = () => {
    //console.log(token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://hcmusemu.herokuapp.com/web/getcustomlink", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        const tmp = [];
        if (statusCode === 200) {
          for (const key in dataRes) {
            tmp.push({
              Type: dataRes[key].Type,
              Url: dataRes[key].Url,
              Username: dataRes[key].Username,
            });
          }
          setWebCustomed(tmp);
          dispatch(profileActions.getAllWebCustomed(tmp));
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  //call api get profile
  const getProfile = () => {
    //console.log(token);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        //console.log(dataUniversity);
        dispatch(profileActions.getProfile(json));
        dispatch(homeActions.VisibleBotTab(true));
        setLoading(false);
      })
      .catch((err) => console.log(err, "error"));
  };

  //call api get newest deadline
  const getNewestDeadline = () => {
    //console.log(token);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        //console.log(json);
        let dataReversed = arrUtils.reverseArr(dataRes);
        if (dataReversed.length >= 5) {
          dataReversed = dataReversed.slice(0, 5);
        }
        console.log(statusCode,dataReversed);
        if (statusCode === 200) {
          dispatch(homeActions.NewestDeadline(dataReversed));
          console.log(dataReversed);
          setNewDeadline(dataReversed);
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  //Get permission to notifications on iOS
  const getPermissionNotifications = () => {
    setLoading(true);
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted");
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((res) => {
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
    socket.emit("Start", token);
    dispatch(authActions.connectToSocket(socket));
  };

  //get request to chatting
  const getRequestChatting = () => {
    socket.on("Request-Accept", (data) => {
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
        Authorization: `bearer ${token}`,
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((json) => {})
      .catch((err) => console.log(err, "error"));
  };

  //local notifications calendar
  const localNotification = async () => {
    for (const key in calendar) {
      const date = new Date(calendar[key].Notification);
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: calendar[key].title,
          body: calendar[key].summary,
        },
        trigger: {
          //date:new Date(new Date(1331209044000).toISOString()).getTime(),
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          hour: date.getHours(),
          minute: date.getMinutes(),
        },
      });
      console.log(id);
    }
  };

  //Render

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
                <FontAwesome5 name="calendar-alt" size={40} color="red" />
                <Text style={styles.textItem}>Lịch hoạt động</Text>
              </TouchableOpacity>
          </View>
          
          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("Course")
            }}>
            <FontAwesome5 name="graduation-cap" size={40} color="red" />
                <Text style={styles.textItem}> Khóa học</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.gridItemShape} >
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("Forum");
            }}>
            <MaterialCommunityIcons name="forum" size={40} color="red" />
                <Text style={styles.textItem}>Diễn đàn</Text>
            </TouchableOpacity> 
          </View> 

        </View>

        <View style={styles.gridMainFunctions}>

          <View style={styles.gridItemShape}  >          
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("University Info")
            }}>
            <FontAwesome5 name="info-circle" size={40} color="red" />
                <Text style={styles.textItem}>Tin tức</Text>
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
                    " Vui lòng vô phần tài khoản để thiết lập kết nối đến portal",
                    [
                      { text: "OK", 
                        style: "cancel"
                      },
                    ]
                  );
                }
              }}
            >
            <FontAwesome5 name="pencil-alt" size={40} color="red" />
                <Text style={styles.textItem}>Điểm số</Text>
            </TouchableOpacity> 
          </View>

        </View>
              
      </View>
        

      <View style={styles.labelRowTitle}>
        <Text style={styles.label}>Deadline mới nhất trong tháng</Text>
        <TouchableOpacity style={styles.detailInfoBtn}
            onPress={() =>{
                navigation.navigate('Deadline In Month');
            }}>
            <Text style={{fontSize:12,color:'blue'}}>Xem thêm</Text>
            <MaterialIcons name="keyboard-arrow-right" size={15.5} color="blue" />
        </TouchableOpacity>
      </View>
      
      {/* <FlatList 
        data={newDeadline}
        //horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNewestDeadlineItem}
        ListEmptyComponent={renderEmptyNewsetDeadline}/> */}

      {newDeadline.length ===0 && <View style={{ marginLeft: 50 }}>
        <Text>Không có deadline nào trong tháng này</Text>
      </View>}

      {newDeadline.map((item, index) => ( 
         <TouchableOpacity key={index}
          style={styles.card}
          onPress={() => {
            Alert.alert(
              "Chuyển tiếp",
              "Ứng dụng muốn chuyển tiếp đến trang môn học của bạn",
              [
                {
                  text: "Đồng ý",
                  onPress: () => Linking.openURL(item.url),
                },
                { text: "Từ chối"},
              ]
            );
          }}
        >
          <View style={styles.deadlineInfo}>
            <View style={styles.deadlineImgWrapper}>
              <Image
                style={styles.deadlineImg}
                source={require("../../../assets/moodle-deadline.png")}
              />
            </View>
            <View style={styles.textSection}>
              <View style={styles.courseInfoText}>
                <Text numberOfLines={1} style={[styles.courseName]}>
                  {item.nameCourese}
                </Text>
              </View>
              <Text numberOfLines={2} style={styles.contentDeadline}>{item.decription}</Text>
              <Text style={[styles.timeDeadline,{color: currentTimestamp > item.duedate * 1000 ? "blue" :"red"}]}>
                Hạn chót: {dateUtils.ConvertTimestampToVNTime(item.duedate)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.labelRowTitle}>
        <Text style={styles.label}>Sự kiện mới nhất trong tháng</Text>
        <TouchableOpacity style={styles.detailInfoBtn}
            onPress={() =>{
                dispatch(calendarActions.getModeOfCalendar('month'));
                navigation.navigate('Calendar');
            }}>
            <Text style={{fontSize:12,color:'blue'}}>Xem thêm</Text>
            <MaterialIcons name="keyboard-arrow-right" size={15.5} color="blue" />
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={calendar}
        //horizontal={true}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCalendarInMonth}
        ListEmptyComponent={renderEmptyCalendarInMonth}/> */}
      
      {calendar.length ===0 && <View style={{ marginLeft: 50 }}>
        <Text>Không có sự kiện nào trong tháng này</Text>
      </View>}

      {calendar.map((item, index) => ( 
         <TouchableOpacity key={index} style={calendarStyle.card}
            onPress={() =>{
              dispatch(calendarActions.getModeOfCalendar('month'));
              navigation.navigate('Calendar');
            }}
        >
         <View style={{ flexDirection: "row" }}>
           {item.color === "" ? (
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
      ))}

      <View style={styles.labelRowTitle}>
        <Text style={styles.label}>Top 5 tin tức khoa mới nhất</Text>
        <TouchableOpacity style={styles.detailInfoBtn}
            onPress={() =>{
              navigation.navigate('University Info',{
                screen:'Faculty New'
              });
            }}>
            <Text style={{fontSize:12,color:'blue'}}>Xem thêm</Text>
            <MaterialIcons name="keyboard-arrow-right" size={15.5} color="blue" />
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={facultNews.slice(0,5)}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNewsItem}
        ListEmptyComponent={renderEmptyFacultyNew}
      /> */}

      {facultNews.slice(0,5).length ===0 && <View style={{ marginLeft: 50 }}>
        <Text>Không có tin tức khoa nào</Text>
      </View>}

      {facultNews.slice(0,5).map((item, index) => ( 
         <TouchableOpacity key={index} style={newsStyle.card}
          onPress={() =>{
            Linking.openURL(item.link)
          }}>
          <Text numberOfLines={2} style={newsStyle.title}>
            {item.title}
          </Text>
          <Text>{item.date}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.labelRowTitle}>
        <Text style={styles.label}>Top 5 tin tức trường mới nhất</Text>
        <TouchableOpacity style={styles.detailInfoBtn}
            onPress={() =>{
              navigation.navigate('University Info',{
                screen:'University New'
              });
            }}>
            <Text style={{fontSize:12,color:'blue'}}>Xem thêm</Text>
            <MaterialIcons name="keyboard-arrow-right" size={15.5} color="blue" />
        </TouchableOpacity>
          
      </View>

      {/* <FlatList
        data={uniNews.slice(0,5)}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNewsItem}
        ListEmptyComponent={renderEmptyUniversityNew}
      /> */}

      {uniNews.slice(0,5).length ===0 && <View style={{ marginLeft: 50 }}>
        <Text>Không có tin tức trường nào</Text>
      </View>}

      {uniNews.slice(0,5).map((item, index) => ( 
         <TouchableOpacity key={index} style={newsStyle.card}
            onPress={() =>{
              Linking.openURL(item.link)
          }}>
            
          <Text numberOfLines={2} style={newsStyle.title}>
            {item.title}
          </Text>
          <Text>{item.date}</Text>
        </TouchableOpacity>
      ))}

      </ScrollView>
    }
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  gridMainFunctions: {
    flexDirection: "row",
  },

  gridItemShape: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 1, // Must add to change border style
    borderStyle: "dotted",
    width: DeviceWidth / 3,
    height: DeviceWidth * 0.3,
  },

  label: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  gridTouchable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  textItem: {
    marginTop: 15,
  },

  deadlineInfo: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  courseInfoText: {
    flexDirection: "row",
    marginBottom: 10,
  },

  courseName: {
    width: '90%',
    fontSize: 13,
    fontWeight: "bold",
  },

  timeDeadline: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop:10
  },

  contentDeadline: {
    width: '67%',
    fontSize: 15,
    color: "#333333",
    
  },

  deadlineImgWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  deadlineImg: {
    width: 50,
    height: 50,
    marginLeft: 5,
  },

  card: {
    marginHorizontal: 8,
    marginBottom:10,
    backgroundColor: "white",
    borderColor:'#DDDDDD',
    borderWidth:1,
    borderRadius: 10,
    paddingVertical:10
  },

  labelRowTitle: {
    marginVertical: 10,
    justifyContent: "center",
  },

  detailInfoBtn: {
    position: "absolute",
    right: 5,
    flexDirection: "row",
    justifyContent: "center",
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
    width: DeviceWidth*0.52,
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

const newsStyle = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom:10,
    backgroundColor: "white",
    borderColor:'#DDDDDD',
    borderWidth:1,
    borderRadius: 10,
    padding:15
  },

  title: {
    marginBottom: 10,
  },
});

export default HomeScreen;
