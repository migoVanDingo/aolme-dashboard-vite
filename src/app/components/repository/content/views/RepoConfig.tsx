import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RepoAPI } from "../../../../api/RepoAPI"
import { setRepoConfig, setRepoItems } from "../../../../actions"
import EmptyContentMenu from "../dynamic/EmptyContentMenu"
import RepoViewContent from "./RepoViewContent"
import { ConfigAPI } from "../../../../api/ConfigAPI"
import { FilesAPI } from "../../../../api/FileAPI"
import RepoViewConfig from "../files/RepoViewConfig"

const RepoConfig = ({}: any) => {
  const dispatch = useDispatch()
  const { repoId, repoEntity, userId, repoFiles } = useSelector(
    (state: any) => state,
  )

  const [config, setConfig] = useState<any>()

  const [signalReload, setSignalReload] = useState<boolean>(false)
  const triggerReload = () => {
    setSignalReload(!signalReload)
  }

  const [isSelectView, setIsSelectView] = useState<boolean>(false)
  const showSelectView = () => setIsSelectView(true)
  const hideSelectView = () => setIsSelectView(false)
  const [itemList, setItemList] = useState<any[]>([])

  useEffect(() => {
    hideSelectView()
  }, [])

  useEffect(() => {
    const init = () => {
      console.log("herehere:", repoId)

      repoId && getRepoItems(repoId)
    }

    //return init()
  }, [signalReload])

  useEffect(() => {
    const init = () => {
      if (itemList && itemList.length > 0) {
        console.log("itemList", itemList)
        const r = filterRepoItems(itemList)
        if (r.length > 0) {
          //getItems(r[0].file_id)
        }
      }
    }

    //return init()
  }, [itemList])

  useEffect(() => {
    const init = () => {
      if (repoFiles && repoFiles.length > 0) {
        checkForNotebookFiles(repoFiles)
      } else {
        showSelectView()
      }
    }

    return init()
  }, [repoFiles])

  function getRepoItems(repoId: string) {
    RepoAPI.getRepoItems(repoId)
      .then((res: any) => {
        console.log("Repository::init()::getRepoItems::res::", res.data)
        if (filterRepoItems(res.data).length > 0) {
          setItemList(filterRepoItems(res.data))
          dispatch(setRepoItems(res.data))
        } else {
          showSelectView()
        }
      })
      .catch((err: any) =>
        console.error("Repository::init()::getRepoItems::error::", err),
      )
  }

  function filterRepoItems(itemList: any) {
    return itemList.filter((item: any) => item.type === "CONFIG")
  }

  function getItems(contentId: string) {
    /*  FilesAPI.getConfigById(contentId)
      .then((res: any) => {
        console.log("RepoDataset::init()::getDatasets::res::", res.data)
        //setDataset(res.data)
        if (res.data !== null) {
      
          dispatch(setRepoConfig(res.data))
          setConfig(res.data)
        }
      })
      .catch((err: any) =>
        console.error("RepoDataset::init()::getDatasets::error::", err),
      ) */
  }

  function checkForNotebookFiles(files: any[]) {
    const config = files.filter((file: any) => file.type === "CONFIG")
    console.log("config: ", config)
    if (config.length > 0) {
      setConfig(config)
    } else {
      showSelectView()
    }
  }

  return (
    <>
      {isSelectView ? (
        <EmptyContentMenu
          menuOption={"CONFIG"}
          triggerReload={triggerReload}
          hideSelectDatasetView={hideSelectView}
        />
      ) : (
        <RepoViewConfig config={config} showSelectView={showSelectView} />
      )}
    </>
  )
}

export default RepoConfig
