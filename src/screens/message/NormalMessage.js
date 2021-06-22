import React,{useState,useEffect,useRef} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image,RefreshControl } from 'react-native';

import { useSelector,useDispatch } from 'react-redux';

import{SafeAreaView} from 'react-native-safe-area-context';
import {Header,SearchBar} from 'react-native-elements';
import { MaterialCommunityIcons} from '@expo/vector-icons';


const Messages = [
  // {
  //   id: '1',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '2',
  //   userName: 'Hoang Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '2 hours ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '3',
  //   userName: 'Vien Du',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '1 hours ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '4',
  //   userName: 'Trong Dat',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '1 day ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '5',
  //   userName: 'Quoc Duy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '2 days ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '6',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '7',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '8',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '9',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '10',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '11',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '12',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '13',
  //   userName: 'Duc Huy',
  //   userImg: require("../../../assets/user-icon.png"),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
];

const NormalMessageScreen = ({navigation}) => {

    const[dataMsg,setDataMsg] = useState([]);

    const token = useSelector((state) => state.authen.token);
    const [refreshing, setRefreshing] = useState(false);
    const unmounted = useRef(false);

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

  useEffect(() => {
    getAllMessage();
    return()=>{
      unmounted.current = true;
    };
  },[])

    //call api get all message screen
    const getAllMessage =() => {
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
              setDataMsg([]);
            }
            else{
              const tmpMsg =[];
              for (const key in dataRes) {
                  tmpMsg.push(
                  {
                    idRoom: dataRes[key].idRoom,
                    name: dataRes[key].name,
                    Email: dataRes[key].Email,
                    Anh: dataRes[key].Anh,
                    TypeRoom: dataRes[key].TypeRoom,
                    text: dataRes[key].text,
                    time: dataRes[key].time,
                    state:dataRes[key].state
                  });
              }
              setDataMsg(tmpMsg);
            }
          }
         
          else{
              console.log(statusCode)
          }
          // setLoadingFacultScreen(false);
          setRefreshing(false);
      })
      .catch((err) => console.log(err, "error"));
  };

  //refresh control trigger
  const onRefresh = () => {
    setRefreshing(true);
    getAllMessage();
  };

  
  const renderItem =({ item })=>(
    <TouchableOpacity style={styles.card} onPress={() =>{ 
      navigation.navigate("Chat",{
        name:item.name,
        idChatRoom:item.idRoom,
        email:item.Email,
        avatar:item.Anh
      });
    }}>
        <View style={styles.userInfo}>
        <View style={styles.userImgWrapper}>
            <Image style={styles.userImg} source={{uri: item.Anh === "" || item.Anh === null ? `https://ui-avatars.com/api/?background=random&color=fff&name=${item.name}`: item.Anh}}/>
        </View>
        <View style={styles.textSection}>
            <View style={styles.userInfoText}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.postTime}>{convertTimestamp(item.time/1000)}</Text>
            </View>
            <Text style={[styles.messageText,{fontWeight : (item.state) ? "normal":"bold"}]}>{item.text}</Text>
        </View>
        </View>
    </TouchableOpacity>
  )


    return (
      <View style={styles.container}>
         {/* <Header
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                borderBottomColor:'#DDDDDD'
            }}

            centerComponent={
                <Text style={headerStyle.centerText}>Tin nhắn</Text>
            }
            rightComponent={
              <TouchableOpacity onPress={() =>{ navigation.navigate('Find to Chat')}}>
                    <MaterialCommunityIcons name="plus" size={30} color={"blue"} />
                </TouchableOpacity>

            }/> */}


        {/* {data.length==0 && <ImageBackground style={styles.img}
             source={require('../../../assets/chat.png')}
             resizeMode='contain'/>} */}


        <FlatList
          data={dataMsg}
          renderItem={renderItem}
          keyExtractor={(item,index) => index.toString()}
          refreshControl={<RefreshControl
            colors={["blue", "red"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        />
      </View>
    );
};

export default NormalMessageScreen;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  paddingLeft:15,
  alignItems: 'center',
  backgroundColor: '#ffffff',
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
  },

  img: {
    width:'100%',
    height:'100%',
    backgroundColor:'transparent'
  },
});

const headerStyle = StyleSheet.create({
  centerText:{
    fontSize: 18,
    fontWeight: "bold"
  }
})
