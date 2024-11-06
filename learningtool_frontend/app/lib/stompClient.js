import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react"


const stompClient = (groupId , onMessage) => {
  const[client , setClient] = useState(null);
  useEffect(()=>{
    if(!groupId) return;
    const myClient = new Client({
        brokerURL : `ws://${process.env.NEXT_PUBLIC_API_URL}/ws/websocket`,
        reconnectDelay : 5000,
        heartbeatIncoming : 4000,
        heartbeatOutgoing : 4000
    });
    myClient.onConnect = () =>{
        console.log(`Connected ${groupId}`);
        myClient.subscribe(`topic/${groupId}`, (message)=>{
            if(onMessage) onMessage(JSON.parse(message.body));
        })
    };
    myClient.onStompError = (frame) => {
        console.error('Broker error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
    };
    myClient.activate();
    setClient(myClient);
    return ()=>myClient.deactivate();
    

  },[groupId,onMessage])
  const sendMessage  = (message)=>{
    if(client && client.connected){
        client.publish({
            destination : `/app/chat/${groupId}/sendMessage`,
            body : JSON.stringify(message)
        })
    }
  }
  return{sendMessage};
}

export default stompClient