import { createSlice } from "@reduxjs/toolkit";
import { fetchKlines } from "../actions/fetchKlinesActions";

const klinesSlice = createSlice({
  name: "klines",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKlines.pending, (state) => {
        state.status = "loading"; // Змінюємо статус на loading
      })
      .addCase(fetchKlines.fulfilled, (state, action) => {
        state.status = "succeeded"; // Змінюємо статус на succeeded
        state.data = action.payload; // Зберігаємо дані в state
      })
      .addCase(fetchKlines.rejected, (state, action) => {
        state.status = "failed"; // Змінюємо статус на failed
        state.error = action.error.message; // Зберігаємо помилку
      });
  },
});

export default klinesSlice.reducer;
