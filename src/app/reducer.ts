import { ACTIONS } from "./actions"

const initState: object = {


  userId:"",
  username:"",
  userEmail:"",

  orgId:"",
  orgName:"",

  repoId:"",
  repoName:"",
  repoDescription:"",
  repoOwner:"",
  repoEntity:"",

  datasetId:"",
  datasetName:"",
  datasetDescription:"",




}


const reducer = (state = initState, action: any) => {
  switch (action.type) {
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

    case ACTIONS.SET_REPO_ID:
      return {
        ...state,
        repoId: action.repoId
      }
    
    case ACTIONS.SET_REPO_NAME:
      return {
        ...state,
        repoName: action.repoName
      }

    case ACTIONS.SET_REPO_DESCRIPTION:
      return {
        ...state,
        repoDescription: action.repoDescription
      }

    case ACTIONS.SET_REPO_OWNER:
      return {
        ...state,
        repoOwner: action.repoOwner
      }

    case ACTIONS.SET_REPO_ENTITY:
      return {
        ...state,
        repoEntity: action.repoEntity
      }

    case ACTIONS.SET_DATASET_ID:
      return {
        ...state,
        datasetId: action.datasetId
      }

    case ACTIONS.SET_DATASET_NAME:
      return {
        ...state,
        datasetName: action.datasetName
      }

    case ACTIONS.SET_DATASET_DESCRIPTION:
      return {
        ...state,
        datasetDescription: action.datasetDescription
      }

    

    default:
      break;

    


  }


}

export default reducer
