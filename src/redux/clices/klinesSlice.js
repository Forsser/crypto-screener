import { createSlice } from "@reduxjs/toolkit";
import { fetchKlines, addOrUpdateKline } from "../actions/fetchKlinesActions";

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
        state.status = "pending"; // Змінюємо статус на loading
      })
      .addCase(fetchKlines.fulfilled, (state, action) => {
        state.status = "fulfilled"; // Змінюємо статус на succeeded
        state.data = action.payload; // Зберігаємо дані в state
      })
      .addCase(fetchKlines.rejected, (state, action) => {
        state.status = "rejected"; // Змінюємо статус на failed
        state.error = action.error.message; // Зберігаємо помилку
      })
      .addCase(addOrUpdateKline.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (k) => k.time === action.payload.time
        );
        if (index !== -1) {
          // Якщо свічка існує, оновлюємо її
          state.data[index] = action.payload;
        } else {
          // Якщо свічки немає, додаємо нову
          state.data.push(action.payload);
        }
      });
  },
});

export default klinesSlice.reducer;
