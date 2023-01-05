import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from 'redux-logger'

import reducer from "./features";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

store.subscribe(() => {
    console.log("store changed", store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
