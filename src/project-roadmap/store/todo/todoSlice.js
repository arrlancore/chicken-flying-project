import { createSlice } from "@reduxjs/toolkit";
import {
  createItem,
  createTodo,
  deleteItem,
  getTodoWithItem,
  updateItem,
} from "./todoAction";

const initialState = {
  todos: [],
  mapTodos: {},
  loading: true,
  error: null,
  deleteItemSuccess: false,
  createTodoSuccess: false,
  createItemSuccess: false,
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
      state.createTodoSuccess = false;
    });
    builder.addCase(createTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.mapTodos[payload.id] = payload;
      state.todos = toArray(payload);
      state.createTodoSuccess = true;
    });
    builder.addCase(createTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.createTodoSuccess = false;
    });

    builder.addCase(createItem.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.createItemSuccess = false;
    });
    builder.addCase(createItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      const todo = state.mapTodos[payload.todo_id];
      todo.items[payload.id] = payload;
      state.mapTodos[payload.todo_id] = todo;
      state.todos = toArray(state.mapTodos);
      state.createItemSuccess = true;
    });
    builder.addCase(createItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.createItemSuccess = false;
    });

    builder.addCase(updateItem.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.updateItemSuccess = false;
    });
    builder.addCase(updateItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      const todo = state.mapTodos[payload.todo_id];
      todo.items[payload.id] = payload;
      state.mapTodos[payload.todo_id] = todo;

      if (payload.oldTodoId) {
        const todo = state.mapTodos[payload.oldTodoId];
        delete todo.items[payload.id];
        state.mapTodos[payload.oldTodoId] = todo;
      }

      state.todos = toArray(state.mapTodos);
      state.updateItemSuccess = true;
    });
    builder.addCase(updateItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.updateItemSuccess = false;
    });

    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.deleteItemSuccess = false;
    });
    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      const todo = state.mapTodos[payload.todoId];
      delete todo.items[payload.itemId];
      state.mapTodos[payload.todoId] = todo;
      state.todos = toArray(state.mapTodos);
      state.deleteItemSuccess = true;
    });
    builder.addCase(deleteItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.deleteItemSuccess = false;
    });
  },
});

export default todoSlice.reducer;
