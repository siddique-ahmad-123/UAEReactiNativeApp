
import { configureStore } from "@reduxjs/toolkit";
import { creditCardAPI } from "@/redux/api/creditCardAPI";

export const store = configureStore({
  reducer: {
    [creditCardAPI.reducerPath]: creditCardAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creditCardAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
