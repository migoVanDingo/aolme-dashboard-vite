import { useEffect, useState } from "react"
import { setStoreRepoContent, setStoreRepoDataset, setStoreRepoDescription, setStoreRepoEntity, setStoreRepoId, setStoreRepoName, setStoreRepoOwner, setStoreRepoSubsets } from "../store/slices/repository"
import { useDispatch } from "react-redux"
import { OrganizationAPI } from "../api/OrganizationAPI"
import { RepoAPI } from "../api/RepoAPI"
import { DatasetAPI } from "../api/DatasetAPI"

export const useRepo = (repo: any = null, loaderRepoContent: any = null, loaderDataset: any = null) => {
  const [repoItems, setRepoItems] = useState<any>([])
  const [repoDataset, setRepoDataset] = useState<any>({})
  const [repoModules, setRepoModules] = useState<any>([])
  const [repoNotebooks, setRepoNotebooks] = useState<any>([])
  const [repoConfigs, setRepoConfigs] = useState<any>([])
  const [repoSubsets, setRepoSubsets] = useState<any>([])
  const [repoContent, setRepoContent] = useState<any>(loaderRepoContent)

  const [repoId, setRepoId] = useState<string>(repo.repo_id)
  const [repoName, setRepoName] = useState<string>(repo.name)
  const [repoDescription, setRepoDescription] = useState<string>(repo.description)
  const [repoOwner, setRepoOwner] = useState<string>(repo.owner)
  const [repoEntityId, setRepoEntityId] = useState<string>(repo.entity_id)
  const [repoSubsetItems, setRepoSubsetItems] = useState<any>([])

  const [repoEntityName, setRepoEntityName] = useState<string>("")

  const dispatch = useDispatch()

  let count = 0;
  useEffect(() => {

    function setGlobalState() {

        dispatch(setStoreRepoId(repo.repo_id))
        dispatch(setStoreRepoName(repo.name))
        dispatch(setStoreRepoDescription(repo.description))
        dispatch(setStoreRepoOwner(repo.owner))
        dispatch(setStoreRepoEntity(repo.entity_id))
        
    }

    const init = () => {
      if (repo !== null) {
        setGlobalState()

        if(repo.entity_type === "ORGANIZATION") {
            getRepoEntity(repo.entity_id)
        } else {
            setRepoEntityName("Personal")
        }
      }
    }

    init()
  }, [repo])

  useEffect(() => {
    if(repoContent !== null) {
      setRepoContent(repoContent)
      dispatch(setStoreRepoContent(repoContent))
    }
  }, [repoContent]);

  useEffect(() => {
    if(loaderDataset !== null) {
      setRepoDataset(loaderDataset)
      getDatasetSubsets(loaderDataset.dataset_id)
      dispatch(setStoreRepoDataset(loaderDataset))
    }
  }, [loaderDataset]);


  const getDatasetSubsets = async ( datasetId: string) => {
    const subsets = await DatasetAPI.getSubsetListByDatasetId(datasetId)
    setRepoSubsets(subsets)
    dispatch(setStoreRepoSubsets(subsets))


  }

  const getSubsetItems = async (subset: any) => {
    const subsetItems = await DatasetAPI.getSubsetItemList(subset.subset_id)
    setRepoSubsetItems(subsetItems)
  }

  const getRepoEntity = async (entityId: string) => {
    const org = await OrganizationAPI.getOrganizationById(entityId)
    setRepoEntityName(org.name)
  }

  

  return {
    repoItems,
    repoDataset,
    repoModules,
    repoNotebooks,
    repoConfigs,
    repoSubsets,
    repoId,
    repoName,
    repoDescription,
    repoOwner,
    repoEntityId,
    repoEntityName,
    repoContent,
    repoSubsetItems,
  }
}
