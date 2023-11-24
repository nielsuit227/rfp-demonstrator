import { useState, useEffect, useRef } from "react";

const useDataSocket = (onMessage) => {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 1;
  const webSocketRef = useRef(null); // useRef to store WebSocket instance

  const initializeWebSocket = () => {
    console.log("Initializing");
    // if deployed to a site supporting SSL, use wss://
    const protocol = window.location.protocol.startsWith("https")
      ? "wss://"
      : "ws://";
    webSocketRef.current = new WebSocket(protocol + window.location.host);
    webSocketRef.current.onopen = () => {
      console.log("WebSocket connected!");
      setRetryCount(0); // Reset retry count on successful connection
    };
    webSocketRef.current.onerror = (err) => {
      console.error("WebSocket Error:", err);
      attemptReconnect();
    };
    webSocketRef.current.onclose = (event) => {
      console.error("Connection died");
      attemptReconnect();
    };
    webSocketRef.current.onmessage = onMessage;
  };
  const attemptReconnect = () => {
    console.log("Retrying");
    if (retryCount < maxRetries) {
      setTimeout(() => {
        initializeWebSocket();
        setRetryCount(retryCount + 1);
      }, 500); // Retry after 5 seconds
    } else {
      console.log("Max retries reached. No further attempts will be made.");
    }
  };
  useEffect(() => {
    initializeWebSocket();
    return () => {
      if (webSocketRef.current) webSocketRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};
export default useDataSocket;
