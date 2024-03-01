import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UsersState {
  limit: number
  isModal: boolean
}

const initialState: UsersState = {
  limit: 0,
  isModal: false
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    openModal: (state) => {
      state.isModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal: (state) => {
      state.isModal = false
      document.body.removeAttribute('style')
    },
  }
})

export const { changeLimit, openModal, closeModal } = usersSlice.actions
export default usersSlice.reducer