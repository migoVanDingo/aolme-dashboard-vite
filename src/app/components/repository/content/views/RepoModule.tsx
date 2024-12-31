import React, { useEffect, useState } from 'react'
import EmptyContentMenu from '../dynamic/EmptyContentMenu'
import RepoViewContent from './RepoViewContent'
import { setRepoConfig, setRepoItems } from '../../../../actions'
import { ModulesAPI } from '../../../../api/ModulesAPI'
import { RepoAPI } from '../../../../api/RepoAPI'
import { useDispatch, useSelector } from 'react-redux'

const RepoModule = ({modules}: any) => {
  const dispatch = useDispatch()
  const repoId = useSelector((state: any) => state.repo.storeRepoId)

  
  const [content, setContent] = useState<any[]>([])

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

    return init()
  }, [signalReload])

  useEffect(() => {
    const init = () => {
      if (itemList && itemList.length > 0) {
        console.log('itemList', itemList)
        const r = filterRepoItems(itemList)
        if (r.length > 0) {
          getItems(r[0].file_id)
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
    ModulesAPI.getModuleById(contentId)
      .then((res: any) => {
        console.log("RepoDataset::init()::getDatasets::res::", res.data)
        //setDataset(res.data)
        if (res.data !== null) {
      
          dispatch(setRepoConfig(res.data))
          setContent(res.data)
        }
      })
      .catch((err: any) =>
        console.error("RepoDataset::init()::getDatasets::error::", err),
      )
  }


  return (
    <>
      {isSelectView ? (
        <EmptyContentMenu
          menuOption={"MODULE"}
          triggerReload={triggerReload}
          hideSelectDatasetView={hideSelectView}
        />
      ) : (
        <RepoViewContent
          content={content}
          showSelectView={showSelectView}
        />
      )}
    </>
  )
}

export default RepoModule