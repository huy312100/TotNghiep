import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat,Bubble,Send,InputToolbar,LeftAction, ChatInput, SendButton } from 'react-native-gifted-chat';
import { View }  from 'react-native';
import io from 'socket.io-client';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';


const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  var socket ;

  const [roomID,setRoomID] = useState('');

  useEffect(() => {
      socket=io("https://hcmusemu.herokuapp.com");

      socket.emit('Create-Room',[route.params.token,route.params.email]);

      socket.on('Reply-Create-Room',(data)=>{
        console.log(data);
        setRoomID(data);
      });

      setMessages([
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
    ])
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

    socket.emit('Message-to-Server',[roomID,route.params.token,messages[0].text])
    console.log(messages[0].text);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

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