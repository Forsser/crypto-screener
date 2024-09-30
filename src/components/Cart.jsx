import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKlines } from "../redux/actions/fetchKlinesActions"; // Змінюйте шлях до вашого slice
import { Chart } from "react-chartjs-2"; // Якщо ви використовуєте Chart.js

const CandleChart = ({ symbol, interval }) => {
  const dispatch = useDispatch();
  const klines = useSelector((state) => state.klines.data); // Змінюйте шлях до даних у вашому state
  const loading = useSelector((state) => state.klines.loading);
  const error = useSelector((state) => state.klines.error);

  useEffect(() => {
    dispatch(fetchKlines({ symbol, interval }));
  }, [dispatch, symbol, interval]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Форматування даних для графіку
  const chartData = {
    labels: klines.map((candle) => new Date(candle[0]).toLocaleString()), // Час свічок
    datasets: [
      {
        label: "Price",
        data: klines.map((candle) => ({
          x: new Date(candle[0]),
          y: [candle[1], candle[2], candle[3], candle[4]], // [відкриття, максимум, мінімум, закриття]
        })),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div>
      <h2>{symbol} Candle Chart</h2>
      <Chart type="candlestick" data={chartData} />
    </div>
  );
};

export default CandleChart;
