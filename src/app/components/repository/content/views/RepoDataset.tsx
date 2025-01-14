import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DatasetAPI } from "../../../../api/DatasetAPI"
import { RepoAPI } from "../../../../api/RepoAPI"
import LoadingSpinner from "../../../common/loading/LoadingSpinner"
import EmptyContentMenu from "../dynamic/EmptyContentMenu"
import RepoViewDataset from "../files/RepoViewDataset"
import { setStoreRepoItems } from "../../../../store/slices/repository"

const RepoDataset = ({}: any) => {

  const repoDataset = useSelector((state: any) => state.repo.storeRepoDataset)
  const repoSubsets = useSelector((state: any) => state.repo.storeRepoSubsets)
  const dispatch = useDispatch()
  const repoId = useSelector((state: any) => state.repo.storeRepoId)
  const userId = useSelector((state: any) => state.user.storeUserId)
  const repoEntity = useSelector((state: any) => state.repo.storeRepoEntity)
  const repoName = useSelector((state: any) => state.repo.storeRepoName)
  const repoDescription = useSelector((state: any) => state.repo.storeRepoDescription)

  const [progress, setProgress] = useState<number>(0)

  const [componentDataset, setComponentDataset] = useState<any>(repoDataset)
  const [componentSubsets, setComponentSubsets] = useState<any[]>(repoSubsets)
  const [uploadFiles, setUploadFiles] = useState<any[]>([])

  const [signalReload, setSignalReload] = useState<boolean>(false)
  const [subsetName, setSubsetname] = useState<string>("")
  const [subsetDescription, setSubsetDescription] = useState<string>("")


  const triggerReload = () => {
    setSignalReload(!signalReload)
  }

  const [isSelectDatasetView, setIsSelectDatasetView] = useState<boolean>(false)
  const showSelectDatasetView = () => setIsSelectDatasetView(true)
  const hideSelectDatasetView = () => setIsSelectDatasetView(false)
  const [itemList, setItemList] = useState<any[]>([])

  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log(componentSubsets.length)
    hideSelectDatasetView()
  }, [])

  useEffect(() => {
    const init = () => {
      console.log("Repository::init()::repoId::", repoId)
      repoId && getRepoItems(repoId)
    }

    //return init()
  }, [signalReload, isLoading])

  useEffect(() => {
    const init = () => {
      if (itemList && itemList.length > 0) {
        const r = filterRepoItems(itemList)
        if (r.length > 0) {
          getDatasets(r[0].file_id)
        }
      }
    }

    //return init()
  }, [itemList])

  function getRepoItems(repoId: string) {
    RepoAPI.getRepoItems(repoId)
      .then((res: any) => {
        console.log("Repository::init()::getRepoItems::res::", res.data)
        if (filterRepoItems(res.data).length > 0) {
          setItemList(filterRepoItems(res.data))
          dispatch(setStoreRepoItems(res.data))
        } else {
          showSelectDatasetView()
        }
      })
      .catch((err: any) =>
        console.error("Repository::init()::getRepoItems::error::", err),
      )
  }

  function filterRepoItems(itemList: any) {
    return itemList.filter((item: any) => item.type === "DATASET")
  }

  function getDatasets(contentId: string) {
    // DatasetAPI.getDatasetById(contentId)
    //   .then((res: any) => {
    //     console.log("RepoDataset::init()::getDatasets::res::", res.data)
    //     //setDataset(res.data)
    //     if (res.data !== null) {
    //       getSubsets(res.data["dataset_id"])
    //       dispatch(setRepoDataset(res.data))
    //       setComponentDataset(res.data)
          
    //     }
    //   })
    //   .catch((err: any) =>
    //     console.error("RepoDataset::init()::getDatasets::error::", err),
    //   )
  }

  function getSubsets(datasetId: string) {
    // DatasetAPI.getSubsetListByDatasetId(datasetId)
    //   .then((res: any) => {
    //     console.log("RepoDataset::init()::getSubsets::res::", res.data)
    //     //setSubsets(res.data)
    //     if (res.data !== null && res.data.length > 0) {
    //       dispatch(setRepoSubsets(res.data))
    //       setComponentSubsets(res.data)
    //     }
    //   })
    //   .catch((err: any) =>
    //     console.error("RepoDataset::init()::getSubsets::error::", err),
    //   )
  }

  const handleFormSubmit = () => {
    setLoading(true)
    handleInitializeDatasetRepoLabeler()
  }

  const handleInitializeDatasetRepoLabeler = () => {
    const payload = {
      owner: userId,
      entity_id: repoEntity,
      entity_type: repoEntity.includes("ORG") ? "ORGANIZATION" : "USER",
      name: repoName + " Dataset",
      description: repoDescription,
      is_public: 0,
      type: "VIDEO",
      repo_item_type: "DATASET",
      repo_id: repoId,
    }
    // DatasetAPI.handleInitializeDatasetRepoLabeler(payload, uploadFiles, (e: any) => {
    //   setProgress(Math.round((100 * e.loaded) / e.total))
    // } )
    // .then((res: any) => {
    //   console.log("handleInitializeDatasetRepoLabeler::res::", res)
    //   setIsSelectDatasetView(false)
    //   setLoading(false)
    // })
    // .catch((err: any) => console.error("handleInitializeDatasetRepoLabeler::err::", err))
  }

  
  return (
    <>
      {!isLoading ? (
        <>
          {isSelectDatasetView || componentSubsets.length === 0 ? (
            <EmptyContentMenu
              menuOption={"DATASET"}
              triggerReload={triggerReload}
              hideSelectDatasetView={hideSelectDatasetView}
              setUploadFiles={setUploadFiles}
              handleFormSubmit={handleFormSubmit}
              name={subsetName}
              setName={setSubsetname}
              description={subsetDescription}
              setDescription={setSubsetDescription}
            />
          ) : (
            <RepoViewDataset
              subsets={componentSubsets}
              dataset={componentDataset}
              showSelectDatasetView={showSelectDatasetView}
              triggerReload={triggerReload}
            />
          )}
        </>
      ) : (
        <LoadingSpinner message={"Creating Dataset"} />
      )}
    </>
  )
}

export default RepoDataset
