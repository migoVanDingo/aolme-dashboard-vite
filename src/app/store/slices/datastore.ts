import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    storeDatastoreId: "",
    storeDatastoreName: "",
    storeDatastoreDescription: "",
    storeDatastoreDatasets: [],
    storeDatastoreConfig: [],
}

export const datastoreSlice = createSlice({
    name: "datastoreSlice",
    initialState,
    reducers: {
        setDatastoreId: (state, action) => {
            state.storeDatastoreId = action.payload
        },
        setDatastoreName: (state, action) => {
            state.storeDatastoreName = action.payload
        },
        setDatastoreDescription: (state, action) => {
            state.storeDatastoreDescription = action.payload
        },
        setDatasets: (state, action) => {
            state.storeDatastoreDatasets = action.payload
        },
        setDatastoreConfig: (state, action) => {
            state.storeDatastoreConfig = action.payload
        },
    },
})

export const {
    setDatastoreId,
    setDatastoreName,
    setDatastoreDescription,
    setDatasets,
    setDatastoreConfig,
} = datastoreSlice.actions