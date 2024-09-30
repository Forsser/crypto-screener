import { configureStore } from "@reduxjs/toolkit";
import klinesReducer from "./clices/klinesSlice";

export const store = configureStore({
  reducer: {
    klines: klinesReducer,
  },
});
