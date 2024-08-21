import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setStoreOrgDatasets, setStoreOrgRepos, setStoreOrgUsers } from "../store/slices/organization"

export const useOrg = (loaderOrgUsers: any[], loaderOrgRepos: any[], loaderOrgDatasets: any[]) => {
    const [orgUsers, setOrgUsers] = useState<any>([])
    const [orgRepos, setOrgRepos] = useState<any>([])
    const [orgDatasets, setOrgDatasets] = useState<any>([])

    const dispatch = useDispatch()
  
    useEffect(() => {

        const setGlobalState = () => {
            dispatch(setStoreOrgUsers(loaderOrgUsers))
            dispatch(setStoreOrgRepos(loaderOrgRepos))
            dispatch(setStoreOrgDatasets(loaderOrgDatasets))
        }
      const init = () => {
  
        if(loaderOrgUsers && loaderOrgUsers.length > 0)
            setOrgUsers(loaderOrgUsers)
        
        if(loaderOrgRepos && loaderOrgRepos.length > 0)
            setOrgRepos(loaderOrgRepos)
        
        if(loaderOrgDatasets && loaderOrgDatasets.length > 0)
            setOrgDatasets(loaderOrgDatasets)

        setGlobalState()


      }
  
      return init()
    }, [loaderOrgUsers, loaderOrgRepos, loaderOrgDatasets])
  
    return { orgUsers, orgRepos, orgDatasets }
}