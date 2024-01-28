import { ACTIONS } from "./actions"

const initState: object = {
  projectId: null,
  projectName: "",
  projectDescription: "",
  projectOwner: "",
  projectUpdatedBy: "",
  projectUpdatedAt: "",
  projectCreatedBy: "",
  projectCreatedAt: "",

  userId:"",
  username:"",
  userEmail:"",

  orgId:"",
  orgName:"",

  repoId:"",
  repoName:"",
  repoDescription:"",
  repoOwner:"",
  repoPublic:"",
  repoEntity:"",
  repoUpdatedBy:"",
  repoUpdatedAt:"",
  repoCreatedBy:"",
  repoCreatedAt:"",


}


const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_PROJECT_ID:
      return {
        ...state,
        projectId: action.projectId,
      }

    case ACTIONS.SET_CURRENT_PROJECT_OWNER:
      return {
        ...state,
        owner: action.owner,
      }

    case ACTIONS.SET_CURRENT_PROJECT_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      }

    case ACTIONS.SET_CURRENT_PROJECT_NAME:
      return {
        ...state,
        name: action.name,
      }

    case ACTIONS.SET_CURRENT_PROJECT_CREATED_BY:
      return {
        ...state,
        createdBy: action.createdBy,
      }

    case ACTIONS.SET_CURRENT_PROJECT_CREATED_AT:
      return {
        ...state,
        createdAt: action.createdAt,
      }

    case ACTIONS.SET_CURRENT_PROJECT_LAST_UPDATE_BY:
      return {
        ...state,
        updatedBy: action.updatedBy,
      }

    case ACTIONS.SET_CURRENT_PROJECT_LAST_UPDATE_AT:
      return {
        ...state,
        updatedAt: action.updatedAt,
      }
    case ACTIONS.SET_USER_ID:
      return {
        ...state,
        userId: action.userId
      }

    case ACTIONS.SET_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case ACTIONS.SET_USER_EMAIL:
      return {
        ...state,
        email: action.email
      }

    case ACTIONS.SET_ORGANIZATION_ID:
      return {
        ...state,
        orgId: action.orgId
      }

    case ACTIONS.SET_ORGANIZATION_NAME:
      return {
        ...state,
        orgName: action.orgName
      }
  }


}

export default reducer
