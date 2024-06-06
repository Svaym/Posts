import { configureStore } from "@reduxjs/toolkit";
import likeSlice from "./features/like/likeSlice";

export const store = configureStore({
  reducer: {
    like: likeSlice,
  }
})
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']