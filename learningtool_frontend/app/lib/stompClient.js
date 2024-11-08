import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getToken } from './getToken';

export default function useWebSocket(groupId) {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    

    useEffect(() => {
      
        // Use SockJS if native WebSocket fails
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            
           
            onConnect: () => {
                console.log('Connected to WebSocket');

                // Subscribe to the group topic
                stompClient.subscribe(`/topic/${groupId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
            onStompError: (error) => {
                console.error('WebSocket error', error);
            },
        });

        // Activate the client
        stompClient.activate();
        setClient(stompClient);

        // Cleanup function to disconnect
        return () => {
            stompClient.deactivate();
        };
    }, [groupId]);

    // Function to send a message
    const sendMessage = (messageContent , sender) => {
        if (client) {
            client.publish({
                destination: `/app/chat/${groupId}/sendMessage`,
                body: JSON.stringify({
                    content: messageContent,
                    sender: sender,
                }),
            });
        }
    };

    return { messages, sendMessage };
}
