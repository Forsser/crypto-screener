import { useEffect, useState } from "react";

const useBinanceWebSocket = (symbol, interval) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`
    );

    ws.onopen = () => {
      console.log(
        `WebSocket з'єднання відкрите для ${symbol} на інтервалі ${interval}.`
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = data.k; // Поточна ціна закриття свічки

      setPrice(newPrice);
    };

    ws.onerror = (error) => {
      console.error("Помилка з WebSocket:", error);
    };

    ws.onclose = () => {
      console.log(`З'єднання закрито для ${symbol}`);
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  return price;
};

/* const useBinanceCandlestickData = (symbol, interval, limit = 10) => {
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const fetchCandlestickData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
        );
        const data = await response.json();

        const formattedData = data.map((candle) => ({
          openTime: candle[0],
          open: parseFloat(candle[1]),
          high: parseFloat(candle[2]),
          low: parseFloat(candle[3]),
          close: parseFloat(candle[4]),
          closeTime: candle[6],
        }));

        setCandlestickData(formattedData);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    };

    fetchCandlestickData();
  }, [symbol, interval, limit]);

  return candlestickData;
}; */

export { useBinanceWebSocket };
