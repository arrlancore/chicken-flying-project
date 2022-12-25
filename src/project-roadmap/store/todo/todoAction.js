import { createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const handleError = (reject, error) => {
  const responseMessage =
    error.response && error.response.data ? error.response.data.message : "";
  return reject(responseMessage || error.message);
};

export const getTodo = createAsyncThunk(
  "todo/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await todoService.getTodo();

      return data.response;
    } catch (error) {
      return handleError(rejectWithValue, error);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todo/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await todoService.createTodo(payload);

      return data;
    } catch (error) {
      return handleError(rejectWithValue, error);
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
      return handleError(rejectWithValue, error);
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
      return handleError(rejectWithValue, error);
    }
  }
);

export const updateItem = createAsyncThunk(
  "todo/update-item",
  async ({ todoId, itemId, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await todoService.updateItem(todoId, itemId, payload);

      return data.response;
    } catch (error) {
      return handleError(rejectWithValue, error);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "todo/delete-item",
  async ({ todoId, itemId }, { rejectWithValue }) => {
    try {
      const { data } = await todoService.deleteItem(todoId, itemId);

      return data.response;
    } catch (error) {
      return handleError(rejectWithValue, error);
    }
  }
);

export const getTodoWithItem = createAsyncThunk(
  "todo/mapped",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await todoService.getTodo();
      // map list into object
      const mapTodo = data.reduce((acc, todo) => {
        acc[todo.id] = { ...todo, items: {} };
        return acc;
      }, {});

      // get all item of todo
      const todoIds = data.map((todo) => todo.id);
      const itemsRequest = await todoService.getMultipleItem(todoIds);
      // map item to the todo object

      itemsRequest.forEach((itemRequest) => {
        const items = itemRequest.data;
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
      return handleError(rejectWithValue, error);
    }
  }
);
