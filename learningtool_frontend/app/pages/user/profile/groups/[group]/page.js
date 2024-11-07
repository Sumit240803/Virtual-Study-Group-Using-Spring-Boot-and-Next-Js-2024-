"use client"
import useStompClient from '@/app/lib/stompClient';

import Header from '@/app/ui/Header';
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const {group} = useParams();
    const[messages, setMessages] = useState([]);
    const[messageContent , setMessageContent] = useState('');
    const handleIncomingMessage = (message)=>{
        setMessages((prev)=>[...prev , message]);
    }
    const {sendMessage} = useStompClient(group,handleIncomingMessage);
    const handleSendMessage = () =>{
        if(messageContent.trim()){
            const newMessage = {sender : "User" , content : messageContent , time : new Date().toISOString(), groupId : group}
            sendMessage(newMessage);
            setMessages((prev)=>[...prev , newMessage]);
            setMessageContent('');
        }
    };
  return (
    <div className="chat-container">
    <h2>Group Chat - {group}</h2>
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.sender}:</strong> {msg.content}
          <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
      ))}
    </div>
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="input-field"
      />
      <button onClick={handleSendMessage} className="send-button">Send</button>
    </div>
  </div>
);
}

export default page