import { createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

export const getTodo = createAsyncThunk(
  "todo/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await todoService.getTodo();

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todo/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await todoService.createTodo(payload);

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getItem = createAsyncThunk(
  "todo/get-item",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await todoService.getItem(payload);

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createItem = createAsyncThunk(
  "todo/create-item",
  async ({ todoId, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await todoService.createItem(todoId, payload);

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateItem = createAsyncThunk(
  "todo/update-item",
  async ({ todoId, targetTodoId, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await todoService.updateItem(
        todoId,
        targetTodoId,
        payload
      );

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "todo/delete-item",
  async ({ todoId, targetTodoId }, { rejectWithValue }) => {
    try {
      const { data } = await todoService.deleteItem(todoId, targetTodoId);

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTodoWithItem = createAsyncThunk(
  "todo/list-with-item",
  async (_, { rejectWithValue }) => {
    try {
      const mapTodo = {};
      const { data } = await todoService.getTodo();

      data.response.forEach((data) => {
        mapTodo[data.id] = data;
      });

      const itemsRequest = await Promise.all(
        data.response.map((todo) => todoService.getItem(todo.id))
      );

      itemsRequest.forEach(({ data }) => {
        const items = data.response;
        if (items[0]) {
          const mappedItem = {};
          const todoId = items[0].todo_id;

          items.forEach((item) => {
            mappedItem[item.id] = item;
          });

          mapTodo[todoId] = { ...mapTodo[todoId], items: mappedItem };
        }
      });

      return mapTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
