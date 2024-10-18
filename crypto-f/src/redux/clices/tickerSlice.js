import { createSlice } from "@reduxjs/toolkit";

const tickerSlice = createSlice({
  name: "ticker",
  initialState: {
    selectedTicker: "BTCUSDT",
    interval: "1h",
  },
  reducers: {
    setTickerActions: (state, action) => {
      state.selectedTicker = action.payload;
    },
    setIntervalActions: (state, action) => {
      state.interval = action.payload;
    },
  },
});

export const { setTickerActions, setIntervalActions } = tickerSlice.actions;
export default tickerSlice.reducer;
