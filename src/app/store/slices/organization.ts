import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // Define your initial state here
  storeOrgId: "",
  storeOrgName: "",
  storeOrgUsers: [],
  storeOrgRepos: [],
  storeOrgDatasets: [],
}

export const orgSlice = createSlice({
  name: "orgSlice",
  initialState,
  reducers: {
    // Define your reducer functions here
    setStoreOrgId: (state, action) => {
      state.storeOrgId = action.payload
    },
    setStoreOrgName: (state, action) => {
      state.storeOrgName = action.payload
    },
    setStoreOrgUsers: (state, action) => {
      state.storeOrgUsers = action.payload
    },
    setStoreOrgRepos: (state, action) => {
      state.storeOrgRepos = action.payload
    },
    setStoreOrgDatasets: (state, action) => {
      state.storeOrgDatasets = action.payload
    },
  },
})

export const {
  /* Add your action creators here */
    setStoreOrgId,
    setStoreOrgName,
    setStoreOrgUsers,
    setStoreOrgRepos,
    setStoreOrgDatasets,
} = orgSlice.actions
