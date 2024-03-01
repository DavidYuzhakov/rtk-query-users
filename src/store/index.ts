import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./services/users.api";
import users from './slices/usersSlice'
import favorite from './slices/favoriteSlices'

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    users,
    favorite,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(usersApi.middleware)
})

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch