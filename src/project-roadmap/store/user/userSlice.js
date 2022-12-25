import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "./localStorageService";
import { loginUser, signUpUser } from "./userAction";

const initialState = {
  userToken: null,
  isLoggedIn: false,
  signUpSuccess: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userToken = action.payload;
    },
    logOut: (state) => {
      localStorageService.clearToken();
      state.isLoggedIn = false;
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.signUpSuccess = true;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userToken = payload.message.loginToken;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export const { setAsLoggedIn, logOut } = userSlice.actions;

export default userSlice.reducer;
