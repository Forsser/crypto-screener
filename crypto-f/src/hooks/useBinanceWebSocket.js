import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const BACKEND_WS_URL = "http://localhost:5000/api/binance/klines/ws";
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 20000;

export const useBinanceWebSocket = (onNewKline) => {
  const wsRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const { selectedTicker, interval } = useSelector((state) => state.ticker);

  useEffect(() => {
    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(
        `${BACKEND_WS_URL}?symbol=${selectedTicker}&interval=${interval}`
      );

      ws.onopen = () => {
        console.log("WebSocket connection established");
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received data:", data);
          if (onNewKline && data.e === "kline") {
            onNewKline(data);
          }
        } catch (error) {
          console.error("Error parsing received data:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
        if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts.current++;
          console.log(
            `Attempting to reconnect (${reconnectAttempts.current}/${MAX_RECONNECT_ATTEMPTS})...`
          );
          setTimeout(connectWebSocket, RECONNECT_INTERVAL);
        } else {
          console.log(
            "Max reconnection attempts reached. Please check your connection and try again later."
          );
        }
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [selectedTicker, interval, onNewKline]);
};
