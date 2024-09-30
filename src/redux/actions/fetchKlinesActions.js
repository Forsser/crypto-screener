import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    console.log(response.data);

    return response.data; // Повертаємо дані
  }
);

export { fetchKlines };
