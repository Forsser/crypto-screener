import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Clock,
  BarChart2,
  LineChart,
  CandlestickChart,
  PlusSquare,
  Minimize2,
  Maximize2,
} from "lucide-react";
import {
  setTickerActions,
  setIntervalActions,
} from "../redux/clices/tickerSlice";
import { fetchKlines } from "../redux/actions/fetchKlinesActions";
import "../styles/chartToolbar.scss";

const ChartToolbar = ({ onIntervalChange, onChartTypeChange }) => {
  const dispatch = useDispatch();
  const [interval, setInterval] = useState("1h");
  const [chartType, setChartType] = useState("candlestick");

  const intervals = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];
  const chartTypes = ["line", "candlestick", "bar"];

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    dispatch(setIntervalActions(newInterval));
    dispatch(fetchKlines({ symbol: "BTCUSDT", interval: newInterval }));
  };

  const handleChartTypeChange = (newType) => {
    setChartType(newType);
    onChartTypeChange(newType);
  };

  return (
    <div className="chart-toolbar">
      <div className="interval-selector">
        <Clock className="icon" />
        {intervals.map((int) => (
          <button
            key={int}
            className={`interval-button ${interval === int ? "active" : ""}`}
            onClick={() => handleIntervalChange(int)}
          >
            {int}
          </button>
        ))}
      </div>
      <div className="chart-type-selector">
        <button
          className={`chart-type-button ${
            chartType === "line" ? "active" : ""
          }`}
          onClick={() => handleChartTypeChange("line")}
        >
          <LineChart className="icon" />
        </button>
        <button
          className={`chart-type-button ${
            chartType === "candlestick" ? "active" : ""
          }`}
          onClick={() => handleChartTypeChange("candlestick")}
        >
          <CandlestickChart className="icon" />
        </button>
        <button
          className={`chart-type-button ${chartType === "bar" ? "active" : ""}`}
          onClick={() => handleChartTypeChange("bar")}
        >
          <BarChart2 className="icon" />
        </button>
        <button className="tool-button">
          <PlusSquare className="icon" />
        </button>
        <button className="tool-button">
          <Minimize2 className="icon" />
        </button>
        <button className="tool-button">
          <Maximize2 className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ChartToolbar;
