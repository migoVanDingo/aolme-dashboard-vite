import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import { RepoHeader } from "../components/repository/header/RepoHeader"
import RepoContent from "../components/repository/content/RepoContent"
import RepoReadMe from "../components/repository/content/readme/RepoReadMe"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  setRepoDescription,
  setRepoEntity,
  setRepoId,
  setRepoName,
  setRepoOwner,
} from "../actions"
import { RepoAPI } from "../api/RepoAPI"
import { initializeConnect } from "react-redux/es/components/connect"
import { OrganizationAPI } from "../api/OrganizationAPI"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
`

const Repository = ({}: any) => {
  const { repoId } = useParams()
  const { username } = useSelector((state: any) => state)

  const [currentRepo, setCurrentRepo] = useState<any>()
  const [owner, setOwner] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const [entityName, setEntityName] = useState<string>("")
  const [entityId, setEntityId] = useState<string>("")

  const [createdAt, setCreatedAt] = useState<string>("")
  const [createdBy, setCreatedBy] = useState<string>("")
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string>("")
  const [lastUpdatedBy, setLastUpdatedBy] = useState<string>("")

  const [isPublic, setIsPublic] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)



  const dispatch = useDispatch()
  useEffect(() => {
    console.log('entityId: ', entityId)
    console.log('username', username)
    console.log("name: ", name)
  },[entityId, username, name])

  useEffect(() => {

    const init = () => {
      
      if(owner !== entityId){
        OrganizationAPI.getOrganizationById(entityId)
        .then((res: any) => {
          console.log("res: ", res.data)
          setEntityName(res.data['name'])
        })
        .catch((err: any) => console.error(err))
      } else {
        setEntityName("Personal Repository")
      }
      
    }
    if(entityId !== null)
      init()

  }, [entityId])


  useEffect(() => {
    const init = () => {
      console.log('repoId: ', repoId)
      if (repoId !== null && repoId !== undefined) {
        RepoAPI.getRepoById(repoId)
          .then((res: any) => {
            console.log("res: ", res.data)

            setCurrentRepo(res.data['repo_id'])
            setName(res.data['name'])
            setDescription(res.data['description'])
            setOwner(res.data['owner'])
            setCreatedAt(res.data['created_at'])
            setCreatedBy(res.data['created_by'])
            setEntityId(res.data['entity_id'])
            setIsPublic(res.data['is_public'])

            dispatch(setRepoId(res.data['repo_id']))
            dispatch(setRepoName(res.data['name']))
            dispatch(setRepoDescription(res.data['description']))
            dispatch(setRepoOwner(res.data['owner']))
            dispatch(setRepoEntity(res.data['entity_id']))

            

            
          })
          .catch((err: any) => console.error(err))
      }
    }

    return init()
  }, [repoId])

  return (
    <SContainer>
      {entityName && username && name && (
        <>
      <RepoHeader owner={username} projectName={name} entityName={entityName}/>
      <RepoContent />
      </>
      )}
      
      <RepoReadMe />
    </SContainer>
  )
}

export default Repository
