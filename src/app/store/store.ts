import { configureStore } from "@reduxjs/toolkit";
import { repoSlice } from "./slices/repository";
import { userSlice } from "./slices/user";
import { orgSlice } from "./slices/organization";
import { datasetSlice } from "./slices/dataset";
import { datastoreSlice } from "./slices/datastore";
import { projectSlice } from "./slices/project";

export default configureStore({
    reducer: {
        // Add reducers here
        repo: repoSlice.reducer,
        user: userSlice.reducer,
        org: orgSlice.reducer,
        dataset: datasetSlice.reducer,
        datastore: datastoreSlice.reducer,
        project: projectSlice.reducer,

    }
})
