import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // Define your initial state here
    projectId: "",
    projectName: "",
    projectDescription: "",
    
}

export const projectSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        // Define your reducer functions here
        setProjectId: (state, action) => {
            state.projectId = action.payload
        },
        setProjectName: (state, action) => {
            state.projectName = action.payload
        },
        setProjectDescription: (state, action) => {
            state.projectDescription = action.payload
        }

    },
})

export const {
    /* Add your action creators here */
    setProjectId,
    setProjectName,
    setProjectDescription,
    
} = projectSlice.actions