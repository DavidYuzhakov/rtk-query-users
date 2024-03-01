import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

const FAV_KEY = 'favorites'

interface FavoriteState {
  favorites: IUser[],
}

const initialState: FavoriteState = {
  favorites: JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]'),
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IUser>) {
      state.favorites = [...state.favorites, action.payload]
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites))
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(f => f.id !== action.payload)
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites))
    }
  }
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions 
export default favoriteSlice.reducer