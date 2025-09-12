import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import { deezerApi } from "@/services/deezerApi";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [deezerApi.reducerPath]: deezerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deezerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
