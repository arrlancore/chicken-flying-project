import { createAsyncThunk } from "@reduxjs/toolkit";
import localStorageService from "./localStorageService";
import authService from "./userService";

export const signUpUser = createAsyncThunk(
  "user/sign-up",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.signUp(payload);
      localStorageService.saveToken(data.auth_token);

      return data.auth_token;
    } catch (error) {
      const responseMessage = error.response.data
        ? error.response.data.message
        : "";
      return rejectWithValue(responseMessage || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(payload);
      localStorageService.saveToken(data.auth_token);

      return data.auth_token;
    } catch (error) {
      const responseMessage = error.response.data
        ? error.response.data.message
        : "";
      return rejectWithValue(responseMessage || error.message);
    }
  }
);
