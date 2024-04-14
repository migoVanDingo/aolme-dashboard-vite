import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import {
  setRepoConfig,
  setRepoDataset,
  setRepoDescription,
  setRepoEntity,
  setRepoId,
  setRepoItems,
  setRepoModule,
  setRepoName,
  setRepoNotebook,
  setRepoOwner,
  setRepoSubsets,
} from "../actions"
import { ConfigAPI } from "../api/ConfigAPI"
import { DatasetAPI } from "../api/DatasetAPI"
import { ModulesAPI } from "../api/ModulesAPI"
import { NotebookAPI } from "../api/NotebookAPI"
import { OrganizationAPI } from "../api/OrganizationAPI"
import { RepoAPI } from "../api/RepoAPI"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import RepoContent from "../components/repository/content/RepoContent"
import RepoReadMe from "../components/repository/content/readme/RepoReadMe"
import { RepoHeader } from "../components/repository/header/RepoHeader"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
`

const Repository = ({}: any) => {
  const { repoId } = useParams()
  const { username, /* repoId, */ repoEntity, userId } = useSelector(
    (state: any) => state,
  )

  //Repo init
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
  const [repoFiles, setRepoFiles] = useState<any[]>([])

  const dispatch = useDispatch()



  useEffect(() => {
    const init = () => {
      if (owner !== entityId) {
        OrganizationAPI.getOrganizationById(entityId)
          .then((res: any) => {
            console.log("res: ", res.data)
            setEntityName(res.data["name"])
          })
          .catch((err: any) => console.error(err))
      } else {
        setEntityName("Personal Repository")
      }
    }
    if (entityId !== null) init()
  }, [entityId])

  useEffect(() => {
    const init = () => {
      if (repoId !== "" && repoId !== null && repoId !== undefined) {
        console.log("repoId: ", repoId)
        getRepo(repoId)
        //getRepoItems(repoId)
      }
    }

    return init()
  }, [repoId])

  const getRepo = (repoId: string) => {
    console.log("repoId: ", repoId)

    RepoAPI.getRepoById(repoId)
      .then((res: any) => {
        console.log("res: ", res.data)

        setCurrentRepo(res.data["repo_id"])
        setName(res.data["name"])
        setDescription(res.data["description"])
        setOwner(res.data["owner"])
        setCreatedAt(res.data["created_at"])
        setCreatedBy(res.data["created_by"])
        setEntityId(res.data["entity_id"])
        setIsPublic(res.data["is_public"])

        dispatch(setRepoId(res.data["repo_id"]))
        dispatch(setRepoName(res.data["name"]))
        dispatch(setRepoDescription(res.data["description"]))
        dispatch(setRepoOwner(res.data["owner"]))
        dispatch(setRepoEntity(res.data["entity_id"]))
      })

      .catch((err: any) => console.error(err))
  }

  //REPO ITEMS
  

  /* async function getDatasets(contentId: string) {
    DatasetAPI.getDatasetById(contentId)
      .then((res: any) => {
        console.log("Repository::init()::getDatasets::res::", res.data)
        //setDataset(res.data)
        if (res.data !== null) {
          getSubsets(res.data["dataset_id"])
          dispatch(setRepoDataset(res.data))
        }
      })
      .catch((err: any) =>
        console.error("Repository::init()::getDatasets::error::", err),
      )
  } */

  /* async function getSubsets(datasetId: string) {
    DatasetAPI.getSubsetListByDatasetId(datasetId)
      .then((res: any) => {
        console.log("Repository::init()::getSubsets::res::", res.data)
        //setSubsets(res.data)
        if (res.data !== null && res.data.length > 0)
          dispatch(setRepoSubsets(res.data))
      })
      .catch((err: any) =>
        console.error("Repository::init()::getSubsets::error::", err),
      )
  } */

  async function getNotebooks(contentId: string) {
    NotebookAPI.getNotebookById(contentId)
      .then((res: any) => {
        console.log("Repository::init()::getNotebooks::res::", res.data)
        //setNotebooks(res.data)
        if (res.data !== null && res.data.length > 0)
          dispatch(setRepoNotebook(res.data))
      })
      .catch((err: any) =>
        console.error("Repository::init()::getNotebooks::error::", err),
      )
  }

  async function getConfigs(contentId: string) {
    ConfigAPI.getConfigById(contentId)
      .then((res: any) => {
        console.log("Repository::init()::getConfigs::res::", res.data)
        //setConfigs(res.data)
        if (res.data !== null && res.data.length > 0)
          dispatch(setRepoConfig(res.data))
      })
      .catch((err: any) =>
        console.error("Repository::init()::getConfigs::error::", err),
      )
  }

  async function getModules(contentId: string) {
    ModulesAPI.getModuleById(contentId)
      .then((res: any) => {
        console.log("Repository::init()::getModules::res::", res.data)
        //setModules(res.data)
        if (res.data !== null && res.data.length > 0)
          dispatch(setRepoModule(res.data))
      })
      .catch((err: any) =>
        console.error("Repository::init()::getModules::error::", err),
      )
  }

  return (
    <SContainer>
      {entityName && username && name && (
        <>
          <RepoHeader
            owner={username}
            projectName={name}
            entityName={entityName}
          />
          <RepoContent />
        </>
      )}

      <RepoReadMe />
    </SContainer>
  )
}

export default Repository
