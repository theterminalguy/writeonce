import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from 'redux-logger'

import reducer from "./features";

const isDev: boolean = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  devTools: true,
});

// @todo: decide on how to use store.subscribe

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
