import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useBinanceWebSocket } from "../hooks/useBinanceWebSocket"; // Підключення нашого хуку
import { fetchKlines } from "../redux/actions/fetchKlinesActions";

const BinanceChart = () => {
  const [priceData, setPriceData] = useState([]);
  const [candlestick, setCandlestick] = useState([]);
  const dispatch = useDispatch();

  // Використовуємо хук для підключення до WebSocket
  const price = useBinanceWebSocket("btcusdt", "15m");
  /*   const candlestickData = useBinanceCandlestickData("btcusdt", "15m"); */

  useEffect(() => {
    setPriceData(price);
  }, [price]);

  useEffect(() => {
    dispatch(fetchKlines({ symbol: "BTCUSDT", interval: "15m" }));
  }, []);

  return (
    <div>
      <h1>Binance Candlestick Chart</h1>
      {<p>Статус з'єднання: {price ? "Підключено" : "Не підключено"}</p>}
      <button>Закрити з'єднання</button>
      <div>
        <button
          onClick={() =>
            dispatch(fetchKlines({ symbol: "BTCUSDT", interval: "15m" }))
          }
        >
          Click
        </button>
        <div>
          {priceData ? (
            <p>
              Ціна відкриття: ${priceData.o}, Поточна ціна: ${priceData.c}
            </p>
          ) : (
            <p>waiting...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinanceChart;

/* {
  "e": "kline",   // тип події
  "E": 123456789, // час події
  "s": "BTCUSDT", // пара
  "k": {
    "t": 123400000, // час початку свічки
    "T": 123460000, // час закриття свічки
    "s": "BTCUSDT", // пара
    "i": "1m",      // інтервал
    "f": 100,       // номер першої угоди
    "L": 200,       // номер останньої угоди
    "o": "0.0010",  // початкова ціна
    "c": "0.0020",  // кінцева ціна
    "h": "0.0025",  // максимальна ціна
    "l": "0.0015",  // мінімальна ціна
    "v": "1000",    // обсяг
    "x": false,     // чи є свічка закритою
    "q": "1.0000",  // обсяг угод
    ...
  }
} */
