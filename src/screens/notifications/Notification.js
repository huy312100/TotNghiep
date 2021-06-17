import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,FlatList,TouchableOpacity,Image ,Button } from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { Icon,Badge } from 'react-native-elements';
import {useDispatch,useSelector} from "react-redux";


const Notification =[
    {
        id: '1',
        titleNotification: 'Title Notification',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'10 mins ago',
    },
    {
        id: '2',
        titleNotification: 'Title Notification 2',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'31/01/2021',
    },
    {
        id: '3',
        titleNotification: 'Title Notification 3',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'25/01/2021',
    },
    {
        id: '4',
        titleNotification: 'Title Notification 4',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'31/12/2020',
    },

];

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

const NotificationScreen=({navigation})=>{

  const token = useSelector((state) => state.authen.token);
  const tokenNoti = useSelector((state) => state.authen.tokenNotification);
  const socket = useSelector((state) => state.authen.socket);

  const [data, setData] = useState([]);

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
    // ie: 24-04-2014, 3:00 PM
    time = dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
    return time;
  };

  useEffect(() => {
    getAllNotifications();

  //   const backgroundSubscription= Notifications.addNotificationResponseReceivedListener(
  //     (response)=>{
  //     console.log(response);
  //     navigation.navigate('Profile',{
  //       screen:"Change Profile"
  //     });
  //   });

  //   const foregroundSubscription= Notifications.addNotificationsDroppedListener(
  //     (notification)=>{
  //     console.log(notification);
  //   });

  //   return ()=>{
  //     backgroundSubscription.remove();
  //     foregroundSubscription.remove();
  //   } 
  },[]);

    //I wrote code below just for testing

    const triggerNotifications = () => {

      // socket.on("Request-Accept",(data)=>{
      //   console.log(data);
      // });

      // socket.emit('Private-Message',['a','nguyenngocduchuy','abc']);
      
  
      Notifications.scheduleNotificationAsync({
        content:{
          title:'Test',
          body:'We are testing new feature'
        },
        trigger:{
          seconds:10
        }
      })
    };

    const getAllNotifications = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${token}`);

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch("https://hcmusemu.herokuapp.com/notification",requestOptions)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
          //console.log(dataUniversity);
        }).catch((err) => console.log(err, "error"));
    };

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.card} onPress={() =>{
        if(item.Title ==='Tin Tức Trường'){
          navigation.navigate('University Info');
        }
        else if(item.Title === 'Tin Tức Khoa'){
          navigation.navigate('University Info',{
            screen:'Faculty New'
          });
        }
        else{
          
        }
      }}>
        <View style={styles.userInfo}>
          <View style={styles.userImgWrapper}>
              <View >
                  <Image style={styles.userImg} source={require("../../../assets/notification-flat.png")} />
                  {!item.State && <Badge
                      status="error"
                      containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                  />}
              </View>
          </View>
          <View style={styles.textSection}>
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{item.Title}</Text>
              <Text style={styles.postTime}>{convertTimestamp(parseInt(item.Date)/1000)}</Text>
            </View>
            <Text style={styles.messageText}>{item.Data}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );


    //   fetch("https://exp.host/--/api/v2/push/send",{
    //       method:'POST',
    //       headers:{
    //         'Accept': 'application/json',
    //         'Accept-Encoding': 'gzip,deflate',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         to:tokenNoti,
    //         title:'Sent via app',
    //         body:'Im just testing'
    //       })
    //     })
    // };

    return(
        <SafeAreaView style={styles.container}>

          {/* <Button
            title="Trigger Notifications"
            onPress={() => {
              triggerNotifications();
            }}
          /> */}
            <FlatList
              data={data}
              keyExtractor={item =>item._id}
              renderItem={renderItem}
            />
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    card: {
        width: '100%',
    },

    userInfo:{
        flexDirection:"row",
        justifyContent: "space-between",
      },
    
      userImgWrapper:{
        paddingTop: 15,
        paddingBottom: 15,
      },
    
      userImg:{
        width: 50,
        height: 50,
        borderRadius: 25,
      },
    
      textSection:{
        flexDirection: "column",
        justifyContent: "center",
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
      },
    
      userInfoText:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      },
    
      userName:{
        fontSize: 14,
        fontWeight: "bold",
      },
    
      postTime: {
        fontSize: 12,
        color:"#666",
      },
    
      messageText:{
        fontSize: 14,
        color: "#333333",
      }
})

export default NotificationScreen;