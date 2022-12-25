import { createSlice } from "@reduxjs/toolkit";
import { getTodo, getTodoWithItem } from "./todoAction";

const initialState = {
  todos: [],
  mapTodos: {},
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodoWithItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTodoWithItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.mapTodos = payload;
      state.todos = Object.keys(payload).map((key) => payload[key]);
    });
    builder.addCase(getTodoWithItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default todoSlice.reducer;
