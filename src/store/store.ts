import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../store/userSlice';
import { usersApi } from '../services/users';
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
