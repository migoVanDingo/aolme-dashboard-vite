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
    SET_USER_EMAIL:"SET_USER_EMAIL",

    SET_ORGANIZATION_ID: "SET_ORGANIZATION_ID",
    SET_ORGANIZATION_NAME: "SET_ORGANIZATION_NAME",
    

    

}

export const setProjectId = (projectId: number) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_ID,
        projectId: projectId

    }
}

export const setProjectOwner = (owner: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_OWNER,
        owner: owner
    
    }
}

export const setProjectDescription = (description: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_DESCRIPTION,
        description: description
    
    }
}

export const setProjectName= (name: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_NAME,
        name: name
    
    }
}


export const setProjectCreatedAt= (createdAt: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_CREATED_AT,
        createdAt: createdAt
    
    }
}

export const setProjectCreatedBy= (createdBy: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_CREATED_BY,
        createdBy: createdBy
    
    }
}

export const setProjectLastUpdatedAt= (lastUpdatedAt: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_LAST_UPDATE_AT,
        lastUpdatedAt: lastUpdatedAt
    
    }
}

export const setProjectLastUpdatedBy= (lastUpdatedBy: string) => {
    return {
        type: ACTIONS.SET_CURRENT_PROJECT_LAST_UPDATE_BY,
        lastUpdatedBy: lastUpdatedBy
    
    }
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


