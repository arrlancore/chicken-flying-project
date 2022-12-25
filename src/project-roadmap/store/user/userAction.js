import { createAsyncThunk } from "@reduxjs/toolkit";
import localStorageService from "./localStorageService";
import authService from "./userService";

const handleError = (reject, error) => {
  const responseMessage =
    error.response && error.response.data ? error.response.data.message : "";
  return reject(responseMessage || error.message);
};

export const signUpUser = createAsyncThunk(
  "user/sign-up",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.signUp(payload);
      localStorageService.saveToken(data.auth_token);

      return data.auth_token;
    } catch (error) {
      return handleError(rejectWithValue, error);
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
      return handleError(rejectWithValue, error);
    }
  }
);
