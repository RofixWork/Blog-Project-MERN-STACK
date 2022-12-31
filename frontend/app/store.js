import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import homeReducer from "./slices/homeSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    home: homeReducer,
  },
});
