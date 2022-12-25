import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "./localStorageService";
import { loginUser, signUpUser } from "./userAction";

const initialState = {
  userToken: null,
  isLoggedIn: false,
  signUpSuccess: false,
  loading: false,
  errorLogin: null,
  errorSignUp: null,
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
      state.errorSignUp = null;
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.signUpSuccess = true;
      state.userToken = payload;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.errorSignUp = payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.errorLogin = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userToken = payload;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.errorLogin = payload;
    });
  },
});
export const { setAsLoggedIn, logOut } = userSlice.actions;

export default userSlice.reducer;
