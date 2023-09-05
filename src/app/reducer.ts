import { ACTIONS } from "./actions"

const initState: object = {
  projectId: null,
  name: "",
  description: "",
  owner: "",
  updatedBy: "",
  updatedAt: "",
  createdBy: "",
  createdAt: "",
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
  }
}

export default reducer
