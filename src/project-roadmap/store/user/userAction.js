import { createAsyncThunk } from "@reduxjs/toolkit";
import localStorageService from "./localStorageService";
import authService from "./userService";

export const signUpUser = createAsyncThunk(
  "user/sign-up",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.signUp(payload);
      localStorageService.saveToken(data.auth_token);

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(payload);
      localStorageService.saveToken(data.auth_token);

      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
