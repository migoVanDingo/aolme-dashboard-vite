import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // Define your initial state here
  datasetId: "",
  datasetName: "",
  datasetDescription: "",
  subsets: [],
  subsetItems: [],
}

export const datasetSlice = createSlice({
  name: "datasetSlice",
  initialState,
  reducers: {
    // Define your reducer functions here
    setDatasetId: (state, action) => {
      state.datasetId = action.payload
    },
    setDatasetName: (state, action) => {
      state.datasetName = action.payload
    },
    setDatasetDescription: (state, action) => {
      state.datasetDescription = action.payload
    },
    setSubsets: (state, action) => {
      state.subsets = action.payload
    },
    setSubsetItems: (state, action) => {
      state.subsetItems = action.payload
    },
  },
})

export const {
  /* Add your action creators here */
    setDatasetId,
    setDatasetName,
    setDatasetDescription,
    setSubsets,
    setSubsetItems,
    
} = datasetSlice.actions
