import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RepoAPI } from '../../../../api/RepoAPI'
import { setRepoConfig, setRepoItems } from '../../../../actions'
import { NotebookAPI } from '../../../../api/NotebookAPI'
import EmptyContentMenu from '../dynamic/EmptyContentMenu'
import RepoViewContent from './RepoViewContent'
import { ProcessAPI } from '../../../../api/ProcessAPI'
import RepoViewNotebook from '../files/RepoViewNotebook'

const RepoNotebook = ({}: any) => {
  const dispatch = useDispatch()

  const repoId = useSelector((state: any) => state.repo.storeRepoId)
  const repoEntity = useSelector((state: any) => state.repo.storeRepoEntityntity)
  const userId = useSelector((state: any) => state.user.storeUserId)
  const repoFiles = useSelector((state: any) => state.repo.storeRepoFiles)

  
  const [notebooks, setNotebooks] = useState<any[]>([])

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
  }, []);

  useEffect(() => {
    const init = () => {

      repoId && getRepoItems(repoId)
    }

    //return init()
  }, [signalReload])

  useEffect(() => {
    const init = () => {
      if (itemList && itemList.length > 0) {
        console.log('itemList', itemList)
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
      if(repoFiles && repoFiles.length > 0)
        checkForNotebookFiles(repoFiles)
    }

    return init()
  }, [repoFiles]);

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

  function checkForNotebookFiles(files: any[]) {

    const notebooks = files.filter((file: any) => file.type === "NOTEBOOK")
    if(notebooks.length > 0) {
      setNotebooks(notebooks)
    } else {
      showSelectView()
    }

    /* NotebookAPI.getNotebookById(contentId)
      .then((res: any) => {
        console.log("RepoDataset::init()::getDatasets::res::", res.data)
        //setDataset(res.data)
        if (res.data !== null) {
      
          dispatch(setRepoConfig(res.data))
          setNotebooks(res.data)
        }
      })
      .catch((err: any) =>
        console.error("RepoDataset::init()::getDatasets::error::", err),
      ) */
  }

  const initializeJupyterNotebook = () => {
    console.log("launching jupyter notebook...")
    const payload = {
      entity_id: repoEntity,
      description: "JUPYTER NOTEBOOK",
      owner: userId,
      type: "NOTEBOOK",
      is_public: 0,
      repo_id: repoId
    }

    ProcessAPI.launchJupyterNotebook(payload)
    .then((res:any) => {
      console.log("launching jupyter notebook...")
    })
    .catch((err: any) => console.error(err))
  }


  return (
    <>
      {isSelectView || notebooks.length === 0 ? (
        <EmptyContentMenu
          menuOption={"NOTEBOOK"}
          triggerReload={triggerReload}
          hideSelectDatasetView={hideSelectView}
          launchNotebook={initializeJupyterNotebook}
        />
      ) : (
        <RepoViewNotebook
          notebooks={notebooks}
          showSelectView={showSelectView}
          launchNotebook={initializeJupyterNotebook}
        />
      )}
    </>
  )
}

export default RepoNotebook