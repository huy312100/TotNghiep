import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

export function ChatScreen() {
    const [messages, setMessages] = useState([]);
    var socket ;

    useEffect(() => {
        socket=io("http://192.168.0.102:3002");
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
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
      socket.emit('messageApp', messages[0].text);
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