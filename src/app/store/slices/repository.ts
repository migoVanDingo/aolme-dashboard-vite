import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // Define your initial state here
  storeRepoId: "",
  storeRepoName: "",
  storeRepoDescription: "",
  storeRepoItems: [],
  storeRepoFiles: [],
  storeRepoSubsets: [],
  storeRepoContent: {},
  storeRepoDataset: {},
  storeRepoEntity: "",
  storeRepoOwner: "",
}

export const repoSlice = createSlice({
  name: "repoSlice",
  initialState,
  reducers: {
    // Define your reducer functions here
    setStoreRepoId: (state, action) => {
      state.storeRepoId = action.payload
    },
    setStoreRepoName: (state, action) => {
      state.storeRepoName = action.payload
    },
    setStoreRepoDescription: (state, action) => {
      state.storeRepoDescription = action.payload
    },
    setStoreRepoItems: (state, action) => {
      state.storeRepoItems = action.payload
    },
    setStoreRepoFiles: (state, action) => {
      state.storeRepoFiles = action.payload
    },
    setStoreRepoEntity: (state, action) => {
      state.storeRepoEntity = action.payload
    },
    setStoreRepoOwner: (state, action) => {
      state.storeRepoOwner = action.payload
    },
    setStoreRepoContent: (state, action) => {
      state.storeRepoContent = action.payload
    },
    setStoreRepoDataset: (state, action) => {
      state.storeRepoDataset = action.payload
    },  
    setStoreRepoSubsets: (state, action) => {
      state.storeRepoSubsets = action.payload
    }


  },
})

export const {
  /* Add your action creators here */
    setStoreRepoId,
    setStoreRepoName,
    setStoreRepoDescription,
    setStoreRepoItems,
    setStoreRepoFiles,
    setStoreRepoEntity,
    setStoreRepoOwner,
    setStoreRepoContent,
    setStoreRepoDataset,
    setStoreRepoSubsets
    
} = repoSlice.actions
