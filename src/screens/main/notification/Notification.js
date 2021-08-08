import React,{useState,useEffect,useRef} from 'react';
import { Text, View, StyleSheet,FlatList,TouchableOpacity,Image,Button,RefreshControl,SafeAreaView } from 'react-native';
import {useDispatch,useSelector} from "react-redux";
import { Badge } from 'react-native-paper';

//import * as homeActions from "../../.";

import * as dateUtils from "../../../utils/Date";

// const dataTmp =[
//   {
//       "State": false,
//       "_id": "60fa9dfc29f1b50022d5dcbc",
//       "Title": "Tin Tức Khoa",
//       "Data": "CONTEMI TUYỂN DỤNG 25 INTERN/FRESHER",
//       "Date": "1627037180948"
//   },
//   {
//       "State": true,
//       "_id": "60fa9dfc29f1b50022d5dcba",
//       "Title": "Tin Tức Khoa",
//       "Data": "CONTEMI TUYỂN DỤNG 25 INTERN/FRESHER",
//       "Date": "1627037180913"
//   },
//   {
//       "State": false,
//       "_id": "60f906c8a45dee0022f3e410",
//       "Title": "Tin Tức Khoa",
//       "Data": "Thông báo về Quy định thi trực tuyến và Hướng dẫn sinh viên thi trực tuyến",
//       "Date": "1626932936850"
//   },
//   {
//       "State": false,
//       "_id": "60f906c8a45dee0022f3e40b",
//       "Title": "Tin Tức Khoa",
//       "Data": "Thông báo về Quy định thi trực tuyến và Hướng dẫn sinh viên thi trực tuyến",
//       "Date": "1626932936829"
//   },
//   {
//       "State": false,
//       "_id": "60f55501e0f10d0022bc7095",
//       "Title": "Tin Tức Khoa",
//       "Data": "[CQ] Danh sách sinh viên được duyệt vào lớp Khởi nghiệp - 18/1, HK3, NH 2020-2021",
//       "Date": "1626690817603"
//   },
//   {
//       "State": false,
//       "_id": "60f55501e0f10d0022bc7093",
//       "Title": "Tin Tức Khoa",
//       "Data": "[CQ] Danh sách sinh viên được duyệt vào lớp Khởi nghiệp - 18/1, HK3, NH 2020-2021",
//       "Date": "1626690817601"
//   },
//   {
//       "State": false,
//       "_id": "60f506919b63e00022cecbae",
//       "Title": "Tin Tức Khoa",
//       "Data": "CHÀO ĐÓN SỰ TRỞ LẠI CỦA KMS ONE-DAY HIRING THÁNG 7 NÀY",
//       "Date": "1626670737461"
//   }
// ];
const NotificationScreen=({navigation})=>{

  const token = useSelector((state) => state.authen.token);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const unmounted = useRef(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllNotifications();
    });

    return()=>{
      unmounted.current=true;
      unsubscribe();
    };
 

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

    const triggerNotifications = async () => {

      var s = new Date(1624872240000);

      console.log(s.getDate(),s.getMonth()+1,s.getFullYear(),s.getHours(),s.getMinutes());

      // socket.on("Request-Accept",(data)=>{
      //   console.log(data);
      // });

      // socket.emit('Private-Message',['a','nguyenngocduchuy','abc']);
  
      const id=await Notifications.scheduleNotificationAsync({
        content:{
          title:'Test',
          body:'We are testing new feature'
        },
        trigger: {
          //date:new Date(new Date(1331209044000).toISOString()).getTime(),
          day:s.getDate(),
          month:s.getMonth()+1,
          year:s.getFullYear(),
          hour:s.getHours(),
          minute:s.getMinutes()
        }
      });
      console.log(id);
    };


    //call api get all notifications
    const getAllNotifications = () => {
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
            console.log(statusCode,dataRes);
          if (statusCode === 200) {
            let countNotRead = 0;
            for (const key in dataRes) {
              if(!dataRes[key].State){
                countNotRead++;
              };
            };
            //dispatch(homeActions.NotiNotRead(countNotRead));
            if(dataRes.message !== "Dont have notification"){
                setData(dataRes);
            }
            setRefreshing(false);
          }        
          //console.log(dataUniversity);
        }).catch((err) => console.log(err, "error"));
    };

    //call api change state notifications
    const changeStateNoti = (idNoti) => {
      let details = {
        IDNotification: idNoti,
      };
  
      let formBody = [];
  
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
  
      console.log(formBody);
  
      fetch("https://hcmusemu.herokuapp.com/notification/changestate", {
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

    //refresh page
    const onRefresh = () => {
      setRefreshing(true);
      getAllNotifications();
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
        changeStateNoti(item._id);

      }}>
        <View style={styles.info}>
          <View style={styles.imgWrapper}>
              <View >
                  <Image style={styles.img} source={require("../../../../assets/notification-icon.png")} />
                  
              </View>
          </View>

          <View style={styles.textSection}>
            <View style={styles.infoText}>
              <Text style={[styles.titleName,!item.State && styles.boldWhenNotRead]}>{item.Title}</Text>
              {/* <Text style={[styles.postTime,!item.State && styles.boldWhenNotRead]}>{dateUtils.ConvertToTimeAgoGeneral(parseInt(item.Date))}</Text> */}
            </View>
            <Text style={[styles.contentText,!item.State && styles.boldWhenNotRead]}>{item.Data}</Text>
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

            {data.length==0 && <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                
                <Text style={{color:'#BBBBBB'}}>
                    Không có thông báo nào
                </Text>
             </View>}

            <FlatList
              data={data}
              keyExtractor={item =>item._id}
              renderItem={renderItem}
              refreshControl={<RefreshControl
                colors={["blue", "red"]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
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

    info:{
        flexDirection:"row",
        justifyContent: "space-between",
      },
    
      imgWrapper:{
        paddingTop: 15,
        paddingBottom: 15,
      },
    
      img:{
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
    
      infoText:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      },
    
      titleName:{
        fontSize: 14,
      },
    
      postTime: {
        fontSize: 12,
        color:"#666",
      },
    
      contentText:{
        fontSize: 14,
        color: "#333333",
      },

      boldWhenNotRead: {
        fontWeight: "bold",
      }
})

export default NotificationScreen;