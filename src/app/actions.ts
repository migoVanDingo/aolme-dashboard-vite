import { ProjectAPI } from "./api/ProjectAPI"

export const ACTIONS = {
 

    SET_USER_ID: "SET_USER_ID",
    SET_USERNAME:"SET_USERNAME",
    SET_USER_EMAIL:"SET_USER_EMAIL",

    SET_ORGANIZATION_ID: "SET_ORGANIZATION_ID",
    SET_ORGANIZATION_NAME: "SET_ORGANIZATION_NAME",

    SET_REPO_ID: "SET_REPO_ID",
    SET_REPO_NAME: "SET_REPO_NAME",
    SET_REPO_DESCRIPTION: "SET_REPO_DESCRIPTION",
    SET_REPO_OWNER: "SET_REPO_OWNER",
    SET_REPO_ENTITY: "SET_REPO_ENTITY",

    SET_REPO_DATASET: "SET_REPO_DATASET",
    SET_REPO_CONFIGS: "SET_REPO_CONFIGS",
    SET_REPO_MODULES: "SET_REPO_MODULES",
    SET_REPO_NOTEBOOKS: "SET_REPO_NOTEBOOKS",
    SET_REPO_SUBSETS: "SET_REPO_SUBSETS",
    SET_REPO_ITEMS: "SET_REPO_ITEMS",
    SET_REPO_FILES: "SET_REPO_FILES",


    SET_DATASET_ID: "SET_DATASET_ID",
    SET_DATASET_NAME: "SET_DATASET_NAME",
    SET_DATASET_DESCRIPTION: "SET_DATASET_DESCRIPTION",

}


export const setStoreUserId = (userId: string) => {
    return {
        type: ACTIONS.SET_USER_ID,
        userId: userId
    
    }
}

export const setStoreUsername = (username: string) => {
    return {
        type: ACTIONS.SET_USERNAME,
        username: username
    }
}

export const setStoreUserEmail = (email: string) => {
    return {
        type: ACTIONS.SET_USER_EMAIL,
        email: email
    }
}

export const setStoreOrganizationId = (orgId: string) => {
    return {
        type: ACTIONS.SET_ORGANIZATION_ID,
        orgId: orgId
    }
}

export const setStoreOrganizationName = (orgName: string) => {
    return {
        type: ACTIONS.SET_ORGANIZATION_NAME,
        orgName: orgName
    }
}

export const setRepoId = (repoId: string) => {
    return {
        type: ACTIONS.SET_REPO_ID,
        repoId: repoId
    }
}

export const setRepoName = (repoName: string) => {
    return {
        type: ACTIONS.SET_REPO_NAME,
        repoName: repoName
    }
}

export const setRepoDescription = (repoDescription: string) => {
    return {
        type: ACTIONS.SET_REPO_DESCRIPTION,
        repoDescription: repoDescription
    }
}

export const setRepoOwner = (repoOwner: string) => {
    return {
        type: ACTIONS.SET_REPO_OWNER,
        repoOwner: repoOwner
    }
}

export const setRepoEntity = (repoEntity: string) => {
    return {
        type: ACTIONS.SET_REPO_ENTITY,
        repoEntity: repoEntity
    }
}

export const setDatasetId = (datasetId: string) => {
    return {
        type: ACTIONS.SET_DATASET_ID,
        datasetId: datasetId
    }
}

export const setDatasetName = (datasetName: string) => {
    return {
        type: ACTIONS.SET_DATASET_NAME,
        datasetName: datasetName
    }
}

export const setDatasetDescription = (datasetDescription: string) => {
    return {
        type: ACTIONS.SET_DATASET_DESCRIPTION,
        datasetDescription: datasetDescription
    }
}

export const setRepoItems = (repoItems: any) => {
    return {
        type: ACTIONS.SET_REPO_ITEMS,
        repoItems: repoItems
    }
}

export const setRepoDataset = (dataset: any) => {
    return {
        type: ACTIONS.SET_REPO_DATASET,
        dataset: dataset
    }
}

export const setRepoConfig = (configs: any) => {
    return {
        type: ACTIONS.SET_REPO_CONFIGS,
        configs: configs
    }
}

export const setRepoModule = (modules: any) => {
    return {
        type: ACTIONS.SET_REPO_MODULES,
        modules: modules
    }
}

export const setRepoNotebook = (notebooks: any) => {
    return {
        type: ACTIONS.SET_REPO_NOTEBOOKS,
        notebooks: notebooks
    }
}

export const setRepoSubsets = (subsets: any) => {
    return {
        type: ACTIONS.SET_REPO_SUBSETS,
        subsets: subsets
    }
}

export const setStoreRepoFiles = (repoFiles: any) => {
    return {
        type: ACTIONS.SET_REPO_FILES,
        repoFiles: repoFiles
    }
}







