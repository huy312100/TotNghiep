import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat,Bubble,Send,InputToolbar,LeftAction, ChatInput, SendButton } from 'react-native-gifted-chat';
import { View }  from 'react-native';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
import { useSelector ,} from 'react-redux';
import io from 'socket.io-client';



const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const socket = useSelector((state) => state.authen.socket);

  const [roomID,setRoomID] = useState('xxx');

  useEffect(() => {
      //var socket=io("https://hcmusemu.herokuapp.com");

      socket.emit('Create-Room',[route.params.token,route.params.email]);

      //console.log(socket);

      socket.on('Reply-Create-Room',(data)=>{
        console.log(data);
        setRoomID(data);
        //console.log(roomID);
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
  }, []);

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


  const onSend = useCallback((messages = []) => {
    //console.log(roomID);
    socket.emit('Private-Message',['60b7be14e2cfac00228ccba8',route.params.email,messages[0].text]);
    socket.on('Private-Message',(user) => {
      console.log(user[3]);
    });

    // socket.on("Request-Accept",(data)=>{
    //   console.log(data);
    // });

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);

  const onReceive = () => {
    socket.emit('Server-to-Client',)
  }

  return (
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
  )
};

export default ChatScreen;