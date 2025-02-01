import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/auth.api";
import { houseApi } from "./api/house.api";
import { pexelsApi } from "./api/getPexelsImg.api";


export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [houseApi.reducerPath]: houseApi.reducer,
    [pexelsApi.reducerPath]: pexelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(houseApi.middleware)
      .concat(AuthApi.middleware)
      .concat(pexelsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
