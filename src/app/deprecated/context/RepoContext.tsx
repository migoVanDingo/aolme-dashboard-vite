/* import React, { useContext, useEffect } from "react"
import { store } from "../store"
import { RepoAPI } from "../../api/RepoAPI"
import { DatasetAPI } from "../../api/DatasetAPI__OLD"
import { NotebookAPI } from "../../api/NotebookAPI"
import { ConfigAPI } from "../../api/ConfigAPI"
import { ModulesAPI } from "../../api/ModulesAPI"
import { useDispatch, useSelector } from "react-redux"

const RepoContext = React.createContext<any | null | undefined>("")
export function useRepo(loaderRepo: string) {
  return useContext(RepoContext)
}

export default function RepoProvider({ children }: any) {

  const [loading, setLoading] = React.useState(false)
  const [repoItems, setRepoItems] = React.useState<any[]>([])
  const [dataset, setDataset] = React.useState<any | null>(null)
  const [subsets, setSubsets] = React.useState<any[]>([])
  const [notebooks, setNotebooks] = React.useState<any[]>([])
  const [configs, setConfigs] = React.useState<any[]>([])
  const [modules, setModules] = React.useState<any[]>([])



  useEffect(() => {
    
    const init = () => {
      if (id !== "" && id !== null) {
        console.log("RepoContext::init::id::", id)
        getRepoItems(id)
      } else {
        console.error("RepoContext::init::id is null")
      
      }
      setLoading(false)
    }
    return init()

  }, [id]);

  async function getRepoItems(repoId: string) {
    RepoAPI.getRepoItems(repoId)
      .then((res: any) => {
        console.log("RepoContext::getRepoItems::res::", res.data)
        if (res.data.length > 0) {
          setRepoItems(res.data)
          res.data.forEach((item: any) => {
            switch (item.type) {
              case "DATASET":
                getDatasets(item.file_id)
                break
              case "CONFIG":
                getConfigs(item.file_id)
                break
              case "NOTEBOOK":
                getNotebooks(item.file_id)
                break
              case "MODULE":
                getModules(item.file_id)
                break
              default:
                break
            }
          })
        }
      })
      .catch((err: any) =>
        console.error("RepoContext::getRepoItems::error::", err),
      )
  }

  async function getDatasets(contentId: string) {
    DatasetAPI.getDatasetById(contentId)
      .then((res: any) => {
        console.log("RepoContext::getDatasets::res::", res.data)
        setDataset(res.data)
      })
      .catch((err: any) =>
        console.error("RepoContext::getDatasets::error::", err),
      )
  }

  async function getSubsets(datasetId: string) {
    DatasetAPI.getSubsetListByDatasetId(datasetId)
      .then((res: any) => {
        console.log("RepoContext::getSubsets::res::", res.data)
        setSubsets(res.data)
      })
      .catch((err: any) =>
        console.error("RepoContext::getSubsets::error::", err),
      )
  }

  async function getNotebooks(contentId: string) {
    NotebookAPI.getNotebookById(contentId)
      .then((res: any) => {
        console.log("RepoContext::getNotebooks::res::", res.data)
        setNotebooks(res.data)
      })
      .catch((err: any) =>
        console.error("RepoContext::getNotebooks::error::", err),
      )
  }

  async function getConfigs(contentId: string) {
    ConfigAPI.getConfigById(contentId)
      .then((res: any) => {
        console.log("RepoContext::getConfigs::res::", res.data)
        setConfigs(res.data)
      })
      .catch((err: any) =>
        console.error("RepoContext::getConfigs::error::", err),
      )
  }

  async function getModules(contentId: string) {
    ModulesAPI.getModuleById(contentId)
      .then((res: any) => {
        console.log("RepoContext::getModules::res::", res.data)
        setModules(res.data)
      })
      .catch((err: any) =>
        console.error("RepoContext::getModules::error::", err),
      )
  }
  const value = {
    getRepoItems,
    getDatasets,
    getSubsets,
    getNotebooks,
    getConfigs,
    getModules,

    setRepoContextId,

    repoItems,
    dataset,
    subsets,
    notebooks,
    configs,
    modules,
  }

  return (
    <RepoContext.Provider value={value}>
      {!loading && children}
    </RepoContext.Provider>
  )
}
 */