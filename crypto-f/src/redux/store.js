import { configureStore } from "@reduxjs/toolkit";
import klinesReducer from "./clices/klinesSlice";
import tickerSliceReducer from "./clices/tickerSlice";

export const store = configureStore({
  reducer: {
    klines: klinesReducer,
    ticker: tickerSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
