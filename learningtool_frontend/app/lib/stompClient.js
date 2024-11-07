import { useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";

const useStompClient = (groupId, onMessage) => {
  const clientRef = useRef(null); // Ref to store the STOMP client instance

  // Memoize onMessage to prevent unnecessary re-renders
  const stableOnMessage = useCallback(onMessage, [onMessage]);

  useEffect(() => {
    if (!groupId) return;

    // Initialize the STOMP client once on mount
    const stompClient = new Client({
      brokerURL: `ws://localhost:8080/ws`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log(`Connected to group: ${groupId}`);
      stompClient.subscribe(`topic/${groupId}`, (message) => {
        if (stableOnMessage) stableOnMessage(JSON.parse(message.body));
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker error:", frame.headers["message"]);
      console.error("Additional details:", frame.body);
    };

    // Store the client in the ref
    clientRef.current = stompClient;

    // Activate the client when the component mounts
    stompClient.activate();

    // Cleanup when the component unmounts or groupId changes
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [groupId, stableOnMessage]);

  // Function to send messages through the STOMP client
  const sendMessage = (message) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/app/chat/${groupId}/sendMessage`,
        body: JSON.stringify(message),
      });
    }
  };

  return { sendMessage };
};

export default useStompClient;
