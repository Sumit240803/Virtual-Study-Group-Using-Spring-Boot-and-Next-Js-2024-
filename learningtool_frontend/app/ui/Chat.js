import React, { useState, useEffect } from 'react';
import useWebSocket from '../lib/stompClient';
import { getUser } from '../lib/getUserDetails';

export default function ChatComponent({ groupId }) {
    const { messages, sendMessage } = useWebSocket(groupId);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const user = getUser();
    
    // Set the username only once when the component mounts
    useEffect(() => {
        if (user) {
            setUsername(user.username);
           
        }
    }, [user]);

    const handleSendMessage = () => {
        if (input.trim()) {
            sendMessage(input, username);  // Pass the username as part of the message
            setInput('');
        }
    };

    return (
        <div>
            <div>
                <h2>Group Chat</h2>
                {messages ? messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.sender}:</strong> {msg.content}</p>
                    </div>
                )): ""}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}
