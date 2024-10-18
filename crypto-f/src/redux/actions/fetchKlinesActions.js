import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchKlines = createAsyncThunk(
  "klines/fetchKlines",
  async ({ symbol, interval }) => {
    const response = await axios.get(
      `http://localhost:5000/api/binance/klines`,
      {
        params: { symbol, interval },
      }
    );

    return response.data; // Повертаємо дані
  }
);

const addOrUpdateKline = createAsyncThunk(
  "klines/addOrUpdate",
  async (kline, {}) => {
    // Тут ми просто повертаємо отриману свічку
    // В реальному додатку тут може бути додаткова логіка або API-запит
    return kline;
  }
);

export { fetchKlines, addOrUpdateKline };
