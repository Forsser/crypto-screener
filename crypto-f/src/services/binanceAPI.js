import { useEffect, useState, useRef } from "react";

const useBinanceWebSocket = (symbol, interval, onMessageCallback) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const streamUrl = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
    const socket = new WebSocket(streamUrl);
    socketRef.current = socket;

    // Коли з'єднання відкрите
    socket.onopen = () => {
      console.log(`З'єднання відкрите для ${symbol} на інтервалі ${interval}.`);
      setIsConnected(true);
    };

    // Коли надходять нові повідомлення
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (onMessageCallback) {
        onMessageCallback(data);
      }
    };

    // Коли з'єднання закривається
    socket.onclose = (event) => {
      console.log("З'єднання закрито:", event);
      setIsConnected(false);
    };

    // Коли трапляється помилка
    socket.onerror = (error) => {
      console.error("Помилка з WebSocket:", error);
    };

    // Очищення з'єднання при демонтажі компонента
    return () => {
      if (socket) {
        socket.close();
        console.log("WebSocket з'єднання закрито.");
      }
    };
  }, [symbol, interval, onMessageCallback]); // Запускається щоразу, коли змінюються ці залежності

  // Функція для закриття WebSocket з'єднання вручну
  const closeConnection = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  return { isConnected, closeConnection };
};

export default useBinanceWebSocket;
