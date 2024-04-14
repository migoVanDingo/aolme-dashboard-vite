import React, { useEffect, useState } from "react"
import EmptyContentMenu from "../dynamic/EmptyContentMenu"
import { DatasetAPI } from "../../../../api/DatasetAPI"
import { useDispatch, useSelector } from "react-redux"
import {
  setRepoDataset,
  setRepoItems,
  setRepoSubsets,
} from "../../../../actions"
import RepoViewDataset from "../files/RepoViewDataset"
import { RepoAPI } from "../../../../api/RepoAPI"

const RepoDataset = ({}: any) => {
  const dispatch = useDispatch()
  const { repoId } = useSelector((state: any) => state)

  const [componentDataset, setComponentDataset] = useState<any>()
  const [componentSubsets, setComponentSubsets] = useState<any[]>([])

  const [signalReload, setSignalReload] = useState<boolean>(false)
  const triggerReload = () => {
    setSignalReload(!signalReload)
  }

  const [isSelectDatasetView, setIsSelectDatasetView] = useState<boolean>(false)
  const showSelectDatasetView = () => setIsSelectDatasetView(true)
  const hideSelectDatasetView = () => setIsSelectDatasetView(false)
  const [itemList, setItemList] = useState<any[]>([])

  useEffect(() => {
    hideSelectDatasetView()
  }, []);

  useEffect(() => {
    const init = () => {
        console.log('herehere:', repoId)

      repoId && getRepoItems(repoId)
    }

    return init()
  }, [signalReload])

  useEffect(() => {
    const init = () => {
      if (itemList && itemList.length > 0) {
        console.log('itemList', itemList)
        const r = filterRepoItems(itemList)
        if (r.length > 0) {
          getDatasets(r[0].file_id)
        }
      } 
    }

    return init()
  }, [itemList])

  function getRepoItems(repoId: string) {
    RepoAPI.getRepoItems(repoId)
      .then((res: any) => {
        console.log("Repository::init()::getRepoItems::res::", res.data)
        if (filterRepoItems(res.data).length > 0) {
            setItemList(filterRepoItems(res.data))
            dispatch(setRepoItems(res.data))
          
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
    DatasetAPI.getDatasetById(contentId)
      .then((res: any) => {
        console.log("RepoDataset::init()::getDatasets::res::", res.data)
        //setDataset(res.data)
        if (res.data !== null) {
          getSubsets(res.data["dataset_id"])
          dispatch(setRepoDataset(res.data))
          setComponentDataset(res.data)
        }
      })
      .catch((err: any) =>
        console.error("RepoDataset::init()::getDatasets::error::", err),
      )
  }

  function getSubsets(datasetId: string) {
    DatasetAPI.getSubsetListByDatasetId(datasetId)
      .then((res: any) => {
        console.log("RepoDataset::init()::getSubsets::res::", res.data)
        //setSubsets(res.data)
        if (res.data !== null && res.data.length > 0) {
          dispatch(setRepoSubsets(res.data))
          setComponentSubsets(res.data)
        }
      })
      .catch((err: any) =>
        console.error("RepoDataset::init()::getSubsets::error::", err),
      )
  }
  return (
    <>
      {isSelectDatasetView ? (
        <EmptyContentMenu
          menuOption={"DATASET"}
          triggerReload={triggerReload}
          hideSelectDatasetView={hideSelectDatasetView}
        />
      ) : (
        <RepoViewDataset
          subsets={componentSubsets}
          dataset={componentDataset}
          showSelectDatasetView={showSelectDatasetView}
        />
      )}
    </>
  )
}

export default RepoDataset
