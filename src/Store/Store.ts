import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/auth.api";
import { houseApi } from "./api/house.api";

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer, // Редуктор AuthApi
    [houseApi.reducerPath]: houseApi.reducer, // Редуктор houseApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(houseApi.middleware) // Middleware houseApi
      .concat(AuthApi.middleware), // Middleware AuthApi
});

export type RootState = ReturnType<typeof store.getState>; // Тип состояния
export type AppDispatch = typeof store.dispatch; // Тип диспетчера

export default store;
