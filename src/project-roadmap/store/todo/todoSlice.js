import { createSlice } from "@reduxjs/toolkit";
import { createTodo, getTodo, getTodoWithItem } from "./todoAction";

const initialState = {
  todos: [],
  mapTodos: {},
  loading: true,
  error: null,
  deleteSuccess: false,
  createTodoSuccess: false,
  updateItemSuccess: false,
};

const toArray = (data) =>
  Object.keys(data).map((key) => {
    const items = data[key].items ? toArray(data[key].items) : undefined;

    return { ...data[key], items };
  });

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
      state.todos = toArray(payload);
    });
    builder.addCase(getTodoWithItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.mapTodos[payload.id] = payload;
      state.todos = toArray(payload);
    });
    builder.addCase(createTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default todoSlice.reducer;
