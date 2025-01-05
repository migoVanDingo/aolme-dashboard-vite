import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { UserAPI } from "../api/UserAPI"
import { setStoreEmail, setStoreUserId, setStoreUsername } from "../store/slices/user"



export const useProfile = (uid: string, loaderActiveTab: string) => {
  //State Hooks

  const [userId, setUserId] = useState<string | null>(uid)
  const [activeTab, setActiveTab] = useState<string>(loaderActiveTab)
  const [userOrgs, setUserOrgs] = useState<any>([])
  const [userRepos, setUserRepos] = useState<any>([])
  const [repoContent, setRepoContent] = useState<any>("PERSONAL")
  const [orgContent, setOrgContent] = useState<any>("MY_ORGS")

  // Effect Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    const init = () => {
      if(uid)
      {
        getUserData(uid)
      }
      
    }

    return init()
    
  }, [uid])

  // Global State
  

  //Data functions
  const getUserData = async (uid: string) => {
    const user = await UserAPI.getUserById(uid)
    console.log("useProfile.ts -- getUserData() -- user: ", user)

    
    dispatch(setStoreUserId(uid))
    dispatch(setStoreUsername(user.username))
    dispatch(setStoreEmail(user.email))

    //dispatch(setStoreUserId(uid))
  }

  return {
    userId,
    activeTab,
    setActiveTab,
    userOrgs,
    userRepos,
    repoContent,
    setRepoContent,
    orgContent,
    setOrgContent,
  }
}
