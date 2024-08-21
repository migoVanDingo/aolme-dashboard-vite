import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // Define your initial state here
  storeUserId: "",
  storeUsername: "",
  storeEmail: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Define your reducer functions here
    setStoreUserId: (state, action) => {
      state.storeUserId = action.payload
    },
    setStoreUsername: (state, action) => {
      state.storeUsername = action.payload
    },
    setStoreEmail: (state, action) => {
      state.storeEmail = action.payload
    },
  },
})

export const {
  /* Add your action creators here */ 
  setStoreUserId,
  setStoreUsername,
  setStoreEmail,
} = userSlice.actions
