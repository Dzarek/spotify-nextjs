import { configureStore } from "@reduxjs/toolkit";
import { deezerApi } from "./services/deezerApi";

export const store = configureStore({
  reducer: {
    [deezerApi.reducerPath]: deezerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deezerApi.middleware),
});

// Typy dla hooków
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
