
import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image } from 'react-native';
import { Icon } from "react-native-elements";
import {SafeAreaView} from 'react-native-safe-area-context';
import 'localstorage-polyfill' 
global.localStorage ;

const DeviceWidth = Dimensions.get('window').width

const HomeScreen=({navigation}) =>{

  const [courseName,setCourseName]=useState('');
  const [day,setDay]=useState('');
  const [month,setMonth]=useState('');
  const [year,setYear]=useState('');
  const [fulldate,setFullDate]=useState('');
  const [eventName,setEventName]=useState('');

  var d = new Date();
  console.log(localStorage.getItem("tokenModdle"));
  //console.log(eventName);a

  // componentDidMount()=async()=>{
    const ConnectApi = async () => {
      // var myHeaders = new Headers();
      //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      //   var urlencoded = new URLSearchParams();
      //   urlencoded.append(moodlewsrestformat, "json");
      //   urlencoded.append(wstoken, localStorage.getItem("tokenModdle"));
      //   urlencoded.append(wsfunction, core_calendar_get_calendar_monthly_view);
      //   urlencoded.append(year, d.getFullYear());
      //   urlencoded.append(month, d.getMonth()+1);

      //   var requestOptions = {
      //       method: 'POST',
      //       headers: myHeaders,
      //       body: urlencoded,
      //       redirect: 'follow'
      //   };

      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      await fetch(`https://courses.ctda.hcmus.edu.vn/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${localStorage.getItem("tokenModdle")}&wsfunction=core_calendar_get_calendar_monthly_view&year=${d.getFullYear()}&month=${d.getMonth()+1}`, requestOptions)
        .then(response => response.json())
        .then(result => {             

            //localStorage.setItem("tokenModdle",result.token);
            //console.log(localStorage.getItem("tokenModdle"));
            console.log();
            //moodleObj.courseName=;
            setCourseName(result.weeks[2].days[6].events[0].course.fullname);
            setDay(result.weeks[2].days[6].mday);
            setMonth(d.getMonth()+1);
            setYear(d.getFullYear());
            setFullDate(result.weeks[2].days[6].mday+"/"+"4"+"/"+d.getFullYear());
            setEventName(result.weeks[2].days[6].events[0].name);
            })
        .catch(error => console.log('error', error));
 

  }
  
    return (
      <SafeAreaView style={styles.container}>
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
                  <Text style={styles.textItem}>Thông tin khóa học</Text>
              </TouchableOpacity> 
            </View>
  
            <View style={styles.gridItemShape}  >
              <TouchableOpacity style={styles.gridTouchable}>
              <Icon name="forum" type="material-community" color="red" size={40}/>
                  <Text style={styles.textItem}>Diễn đàn</Text>
              </TouchableOpacity> 
            </View> 
  
          </View>
  
          <View style={styles.gridMainFunctions}>
  
            <View style={styles.gridItemShape}  >          
              <TouchableOpacity style={styles.gridTouchable}>
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
          
  
        <Text style={styles.label}>Deadline gần nhất</Text>
        
        <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                    <View >
                        <Image style={styles.userImg} source={require("../../../assets/moodle-deadline.png")}/>
                        
                    </View>
                </View>
                <View style={styles.textSection}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.userName}>{courseName}</Text>
                    <Text style={styles.postTime}>{fulldate}</Text>
                  </View>
                  <Text style={styles.messageText}>{eventName}</Text>
                </View>
              </View>


        <TouchableOpacity
                style={styles.button}
                onPress={() => {ConnectApi()}}
                >
                <Text>tset</Text>
            </TouchableOpacity>
  
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

  userInfo:{
    flexDirection:"row",
    justifyContent: "space-between",
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
    fontSize: 10,
    color:"#666",
  },

  messageText:{
    fontSize: 14,
    color: "#333333",
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
    backgroundColor: "transparent",
    marginLeft:15
  },
})

export default HomeScreen;