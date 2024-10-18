import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { createChart } from "lightweight-charts";
import { useSelector } from "react-redux";
import { useBinanceWebSocket } from "../hooks/useBinanceWebSocket";

const Chart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const { data, status } = useSelector((state) => state.klines);
  const { selectedTicker, interval } = useSelector((state) => state.ticker);
  const [lastCandle, setLastCandle] = useState(null);

  const createChartInstance = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.remove();
    }

    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          backgroundColor: "#ffffff",
          textColor: "rgba(33, 56, 77, 1)",
        },
        grid: {
          vertLines: { color: "rgba(197, 203, 206, 0.5)" },
          horzLines: { color: "rgba(197, 203, 206, 0.5)" },
        },
        crosshair: { mode: "normal" },
        priceScale: { borderColor: "rgba(197, 203, 206, 1)" },
        timeScale: { borderColor: "rgba(197, 203, 206, 1)" },
      });

      chartRef.current = chart;
      candlestickSeriesRef.current = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      return chart;
    }
  }, []);

  const updateChartData = useCallback((data) => {
    if (candlestickSeriesRef.current && data.length > 0) {
      const candleData = data.map((d) => ({
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));

      candlestickSeriesRef.current.setData(candleData);
      lastUpdateTimeRef.current = candleData[candleData.length - 1].time;
      setLastCandle(candleData[candleData.length - 1]);
    }
  }, []);

  const handleNewKline = useCallback((newData) => {
    if (candlestickSeriesRef.current) {
      const newCandleData = {
        time: newData.k.t / 1000,
        open: parseFloat(newData.k.o),
        high: parseFloat(newData.k.h),
        low: parseFloat(newData.k.l),
        close: parseFloat(newData.k.c),
      };

      // Перевіряємо, чи новий час більший за останній оновлений час
      if (newCandleData.time >= lastUpdateTimeRef.current) {
        candlestickSeriesRef.current.update(newCandleData);
        lastUpdateTimeRef.current = newCandleData.time;
        setLastCandle(newCandleData);
      } else {
        console.log("Skipping update: new data is older than the last update");
      }
    }
  }, []);

  useBinanceWebSocket(handleNewKline);

  useLayoutEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChartInstance();

      const handleResize = () => {
        if (chart && chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    }
  }, [createChartInstance]);

  useEffect(() => {
    if (status === "fulfilled" && data.length > 0 && chartRef.current) {
      updateChartData(data);
    }
  }, [status, data, updateChartData]);

  useEffect(() => {
    if (chartContainerRef.current) {
      createChartInstance();
      if (status === "fulfilled" && data.length > 0) {
        updateChartData(data);
      }
    }
  }, [
    selectedTicker,
    interval,
    createChartInstance,
    updateChartData,
    status,
    data,
  ]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "500px" }}>
      {status !== "fulfilled" && <div>Waiting for data...</div>}
    </div>
  );
};

export default Chart;
