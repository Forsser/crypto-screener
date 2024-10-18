import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBinanceWebSocket } from "../hooks/useBinanceWebSocket"; // Підключення нашого хуку
import {
  fetchKlines,
  fetchKlinesWS,
} from "../redux/actions/fetchKlinesActions";
import Chart from "./Chart";
import ChartToolbar from "./ChartToolbar";

const BinanceChart = () => {
  const dispatch = useDispatch();
  useBinanceWebSocket();
  const { selectedTicker, interval } = useSelector((state) => state.ticker);
  console.log(selectedTicker, interval);

  useEffect(() => {
    dispatch(fetchKlines({ symbol: selectedTicker, interval: interval }));
  }, []);

  return (
    <div>
      <h1>Binance Candlestick Chart</h1>
      <ChartToolbar />
      <Chart />
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
