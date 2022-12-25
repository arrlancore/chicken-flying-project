import { createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

export const getTodo = createAsyncThunk(
  "todo/list",
  async (auth_token, { rejectWithValue }) => {
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
