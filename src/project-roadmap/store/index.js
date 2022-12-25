import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import todoReducer from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});
