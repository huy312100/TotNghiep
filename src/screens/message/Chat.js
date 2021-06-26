import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat,Bubble,Send,InputToolbar,LeftAction, ChatInput, SendButton } from 'react-native-gifted-chat';
import { View,Alert,Text,TouchableOpacity }  from 'react-native';
import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';
import { useSelector,useDispatch } from 'react-redux';
import { Header} from 'react-native-elements';
import uuid from 'react-native-uuid';

import SyncStorage from 'sync-storage';
//import io from 'socket.io-client';



const ChatScreen = ({route,navigation}) => {
  const [messages, setMessages] = useState([]);
  const socket = useSelector((state) => state.authen.socket);
  const profile = useSelector((state) => state.profile.profile);
  const token = SyncStorage.get('tokenValue');

  const dispatch = useDispatch();

  const dataMsgFirstRead = useSelector((state) => state.message.firstReadMsg);

  const [roomID,setRoomID] = useState(route.params.idChatRoom);


  

  useEffect(() => {
      //var socket=io("https://hcmusemu.herokuapp.com");

      //setRoomID(route.params.idChatRoom);
      
      // socket.emit('Create-Room',[route.params.token,route.params.email]);

      // //console.log(socket);

      // socket.on('Reply-Create-Room',(data)=>{
      //   console.log(data);
      //   setRoomID(data);
      //   console.log(roomID);
      // });

      loadMessage();

      socket.on('Private-Message-To-Client',(data)=>{
        console.log(data);
        setMessages(previousMessages => GiftedChat.append(previousMessages, {
          _id:uuid.v4(),
          text: data[2],
          createdAt: new Date(data[3]),
          user:{
            _id:2,
            name:data[1], 
          }
        }));
      });
      
    //   setMessages([
    //     {
    //       _id: 1,
    //       text: 'Hello',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    // ])
    // return () => {
    //   socket.close();
    // }
  },[]);


  //call api load all messages  
  const loadMessage =() => {
    let details = {
      IDRoom:roomID,
      page: 0,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //console.log(formBody);

    fetch("https://hcmusemu.herokuapp.com/chat/loadmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `bearer ${token}`,
      },
      body: formBody,
    }).then((response) => {
      const statusCode = response.status;
      const dataRes = response.json();
      return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=> {
      if(statusCode===200) {
        const tmpAttrMsg =[];
        for (const key in dataRes) {
          if(dataRes[key].from !== profile[0].Email){
            if(route.params.avatar === undefined || route.params.avatar === "" || route.params.avatar === null ){
              tmpAttrMsg.push(
                {
                  _id: key,
                  text: dataRes[key].text,
                  //createdAt: new Date(dataRes[key].time).toISOString(),
                  createdAt: new Date(parseInt(dataRes[key].time)).toISOString(),
                  user:{
                    _id:2,
                    name:dataRes[key].from,
                    avatar:`https://ui-avatars.com/api/?background=random&color=fff&name=${route.params.name}`
                  }
                });
            }
            else{
              tmpAttrMsg.push(
                {
                  _id: key,
                  text: dataRes[key].text,
                  //createdAt: new Date(dataRes[key].time).toISOString(),
                  createdAt: new Date(parseInt(dataRes[key].time)).toISOString(),
                  user:{
                    _id:2,
                    name:dataRes[key].from,
                    avatar: route.params.image,
                  }
                });
            }
          }
          else{
            tmpAttrMsg.push(
              {
                _id: key,
                text: dataRes[key].text,
                //createdAt: new Date(dataRes[key].time).toISOString(),
                createdAt: new Date(parseInt(dataRes[key].time)).toISOString(),
                user:{
                  _id:1,
                  name:dataRes[key].from,
                }
              });
          }  
        }
        console.log(tmpAttrMsg);
        setMessages(tmpAttrMsg);
      }
    }).catch((err) => console.log(err, "error"));
  }

  const renderBubble = (props) =>{
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: 'red',
            
          },
        }}

        timeTextStyle={{
          left: {
            color: 'white',
          }
        }}
      />);
  };


  const renderSend = (props) =>{
    return (
    <Send {...props}>
      <View style={{marginBottom:10,marginRight:5}}>
        <Ionicons name="ios-send" size={26} color="blue" />
      </View>
    </Send>
    )
  };

  const renderInputToolbar= (props) => {
    return (
          <InputToolbar {...props} 
            containerStyle={{borderRadius:25,}} 
            placeholder="Nhập tin nhắn ..."/>
    )
  }

  const scrollToBottomComponent = () =>{
    return (
      <FontAwesome5 name="angle-double-down" size={28} color="#888888" />
    )
  };


  // const onSend = useCallback((messages = []) => {

  // }, [roomID]);


  const onSend =(messages = []) => {
    //console.log(roomID);
    //console.log(route.params.email);
    socket.emit('Private-Message',[roomID,route.params.email,messages[0].text]);
    
    console.log(dataMsgFirstRead);

    // if(dataMsgFirstRead === 'message_await'){
    //   Alert.alert(
    //     "Lỗi",
    //     "Vui lòng chờ đợi chấp nhận tin nhắn",
    //     [
    //       { text: "OK", 
    //         style: "cancel"
    //       },
    //     ]
    //   );
    // }
    // else if (dataMsgFirstRead === 'error'){
    //   Alert.alert(
    //     "Lỗi",
    //     "Đã xảy ra lỗi ",
    //     [
    //       { text: "OK", 
    //         style: "cancel"
    //       },
    //     ]
    //   );
    // }
    // else{
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
      //console.log(messages);
    // }
  }

  return (

    <View style={{flex: 1}}>
       <Header
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                borderBottomColor:'#DDDDDD'
            }}
            centerComponent={
                <Text style={{fontSize:20,fontWeight:'500'}}>{route.params.name}</Text>
            }
            leftComponent={
              <TouchableOpacity onPress={() =>{ 
                socket.emit('Return-Chat',[roomID,route.params.email]);
                navigation.goBack()
                }}>
                    <Entypo name="chevron-left" size={28} color="blue" />
                </TouchableOpacity>

            }/>


      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
    />
    </View>
    

  )
};

export default ChatScreen;