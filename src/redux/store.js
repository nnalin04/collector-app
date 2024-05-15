import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./Slices/fileSlice";

const store = configureStore({
  reducer: {
    files: fileSlice,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export default store;
