import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import youtubeReducer from "./youtubeSlice";
import { deezerApi } from "@/services/deezerApi";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [deezerApi.reducerPath]: deezerApi.reducer,
    youtube: youtubeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deezerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
