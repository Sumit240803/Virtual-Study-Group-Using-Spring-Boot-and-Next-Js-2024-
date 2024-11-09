import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from '../lib/stompClient';
import { getUser } from '../lib/getUserDetails';
import { getToken } from '../lib/getToken';
import Header from './Header';

export default function ChatComponent({ groupId }) {
    const { messages: websocketMessages, sendMessage } = useWebSocket(groupId);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [previousMessages, setPreviousMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const user = getUser();
    
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const scrollPositionRef = useRef(0);  // Store the scroll position before loading

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user]);

    const fetchPreviousMessages = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group/messages/${groupId}?page=${page}&size=20`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPreviousMessages(prevMessages => {
                    const combinedMessages = [...data.messages, ...prevMessages];
                    const uniqueMessages = [...new Map(combinedMessages.map(msg => [msg.id, msg])).values()];
                    return uniqueMessages;
                });
                
                // Restore the previous scroll position after messages load
                setTimeout(() => {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - scrollPositionRef.current;
                }, 0);
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPreviousMessages();
    }, [page, groupId]);

    const handleSendMessage = () => {
        if (input.trim()) {
            sendMessage(input, username);
            setInput('');
        }
    };

    // Combine and deduplicate messages
    const allMessages = [...new Map([...previousMessages, ...websocketMessages].map(msg => [msg.id, msg])).values()];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [websocketMessages]);  // Only scroll on new WebSocket messages

    const handleScroll = (e) => {
        if (e.target.scrollTop === 0 && !loading) {
            scrollPositionRef.current = chatContainerRef.current.scrollHeight;  // Save the current scroll height before loading more
            setPage(prevPage => prevPage + 1);
        }
    };
    
    const [myGroup, setMyGroup] = useState([]);
    const groupInfo = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currentGroup?query=${groupId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setMyGroup(data.group);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        groupInfo();
    }, []);

    return (
        <div className='custom-scrollbar'>
            <div>
                <Header />
            </div>
            <div
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="custom-scrollbar min-h-[50%] max-h-screen mb-10 overflow-y-auto bg-gray-800 rounded-lg shadow-lg mt-10 border w-[90%] m-auto"
            >
                <h2 className="sticky top-0 z-10 bg-black py-5 mt-8 text-2xl font-bold mb-4 text-center text-blue-300">
                    {myGroup.length > 0 ? myGroup.map((group) => (
                        <div key={group.id}>{group.name}</div>
                    )) : "Group"}
                </h2>
                <div>
                    {allMessages.length > 0 ? (
                        allMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex my-1 ${msg.sender === username ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`w-96 mx-10 p-5 rounded-tr-xl rounded-bl-xl shadow-md ${
                                        msg.sender === username
                                            ? 'bg-gray-950 text-blue-200 text-right shadow-green-700'
                                            : 'bg-sky-900 text-blue-200 shadow-md shadow-blue-700 text-left'
                                    }`}
                                >
                                    <p className="font-bold text-left">{msg.sender}</p>
                                    <p className="text-xl font-semibold text-left">{msg.content}</p>
                                    <small className="block text-xs text-gray-500">
                                        {new Date(msg.time).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No messages yet</p>
                    )}
                    {loading && <p className="text-center text-blue-500">Loading...</p>}
                </div>

                <div ref={messagesEndRef} />

                <div className="sticky bottom-0 z-10 w-1/3 m-auto mt-4 flex mb-3 ">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message"
                        className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="w-1/4 bg-gray-700 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
