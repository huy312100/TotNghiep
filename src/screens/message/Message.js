import React,{useState} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image,ImageBackground } from 'react-native';
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

const MessageScreen = ({navigation}) => {

    const[data,setData] = useState([]);

    return (
      <View style={styles.container}>
         <Header
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

            }/>


        {/* {data.length==0 && <ImageBackground style={styles.img}
             source={require('../../../assets/chat.png')}
             resizeMode='contain'/>} */}


        <FlatList
          data={data}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() =>navigation.navigate("Chat",{userName:item.userName})}>
              <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                  <Image style={styles.userImg} source={item.userImg} />
                </View>
                <View style={styles.textSection}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.postTime}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.messageText}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
};

export default MessageScreen;

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
