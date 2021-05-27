import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

export function ChatScreen({route}) {
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
    }, [])
  
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
      />
    )
  }