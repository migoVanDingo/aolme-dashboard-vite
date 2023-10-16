import { ProjectAPI } from "./api/ProjectAPI"

export const ACTIONS = {
    SET_CURRENT_PROJECT_ID: "SET_CURRENT_PROJECT_ID",
    SET_CURRENT_PROJECT_OWNER: "SET_CURRENT_PROJECT_OWNER",
    SET_CURRENT_PROJECT_DESCRIPTION: "SET_CURRENT_PROJECT_DESCRIPTION",
    SET_CURRENT_PROJECT_NAME: "SET_CURRENT_PROJECT_NAME",
    SET_CURRENT_PROJECT_CREATED_BY: "SET_CURRENT_PROJECT_CREATED_BY",
    SET_CURRENT_PROJECT_CREATED_AT: "SET_CURRENT_PROJECT_CREATED_AT",
    SET_CURRENT_PROJECT_LAST_UPDATE_BY: "SET_CURRENT_PROJECT_LAST_UPDATE_BY",
    SET_CURRENT_PROJECT_LAST_UPDATE_AT: "SET_CURRENT_PROJECT_LAST_UPDATE_AT",

    SET_USER_ID: "SET_USER_ID",
    SET_USERNAME:"SET_USERNAME",

}

export const setCurrentProjectId = (projectId: number) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_ID,
        projectId: projectId

    }
}

export const setCurrentProjectOwner = (owner: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_OWNER,
        owner: owner
    
    }
}

export const setCurrentProjectDescription = (description: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_DESCRIPTION,
        description: description
    
    }
}

export const setCurrentProjectName= (name: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_NAME,
        name: name
    
    }
}


export const setCurrentProjectCreatedAt= (createdAt: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_CREATED_AT,
        createdAt: createdAt
    
    }
}

export const setCurrentProjectCreatedBy= (createdBy: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_CREATED_BY,
        createdBy: createdBy
    
    }
}

export const setCurrentProjectLastUpdatedAt= (lastUpdatedAt: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_LAST_UPDATE_AT,
        lastUpdatedAt: lastUpdatedAt
    
    }
}

export const setCurrentProjectLastUpdatedBy= (lastUpdatedBy: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_LAST_UPDATE_BY,
        lastUpdatedBy: lastUpdatedBy
    
    }
}

export const setUserId = (userId: string) => {
    return {
        type: ACTIONS.SET_USER_ID,
        userId: userId
    
    }
}

export const setUsername = (username: string) => {
    return {
        type: ACTIONS.SET_USERNAME,
        username: username
    }
}


