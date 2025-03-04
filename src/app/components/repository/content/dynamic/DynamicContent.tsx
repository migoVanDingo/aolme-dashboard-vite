import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ConfigAPI } from "../../../../api/ConfigAPI"
import { ModulesAPI } from "../../../../api/ModulesAPI"
import { NotebookAPI } from "../../../../api/NotebookAPI"
import { RepoAPI } from "../../../../api/RepoAPI"
import { DatasetAPI } from "../../../../deprecated/DatasetAPI__OLD"
import RepoViewDataset from "../files/RepoViewDataset"
import CreateContentViews from "./CreateContentViews"
import EmptyContentMenu from "./EmptyContentMenu"
import ViewRepoSectionContent from "./ViewRepoSectionContent"

const DynamicContent = ({ menuOption, repoEntity, repoId }: any) => {

  const userId = useSelector((state: any) => state.user.storeUserId)
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [selectedId, setSelectedId] = useState<any>("")

  const [contentList, setContentList] = useState<any[]>([])

  const [parentContent, setParentContent] = useState<any>(null)

  const [createFileMethod, setCreateFileMethod] = useState<string>("")

  const [existingContent, setExistingContent] = useState<any>(null)
  const [isReturnToSelectContent, setIsReturnToSelectContent] = useState<boolean>(false)
  const [isSelectContent, setIsSelectContent] = useState<boolean>(false)

  //------>>>> BELOW: These methods are for checking for existing repo items
  const [dataset, setDataset] = useState<any>(null)
  const [configs, setConfigs] = useState<any[]>([])
  const [notebooks, setNotebooks] = useState<any[]>([])
  const [modules, setModules] = useState<any[]>([])
  const [repoItems, setRepoItems] = useState<any[]>([])
  const [subsets, setSubsets] = useState<any[]>([])

  const [trigger, setTrigger] = useState<boolean>(false)
  const pullTrigger = () => setTrigger(!trigger)

  useEffect(() => {
    const doProcess = () => {
      if (repoId !== "") {
        getRepoItems(repoId)
      }
    }
    return doProcess()
  }, [])

  useEffect(() => {
    return getRepoItems(repoId)
  }, [trigger]);

  const getRepoItems = (repoId: string) => {
    RepoAPI.getRepoItems(repoId)
      .then((res: any) => {
        console.log("DynamicContent::getRepoItems::res::", res.data)
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
        console.error("DynamicContent::getRepoItems::error::", err),
      )
  }

  const getDatasets = (contentId: string, lock: any | null = null) => {

    if (dataset === null || lock !== null) {
    /*   DatasetAPI.getDatasetById(contentId)
        .then((res: any) => {
          console.log("DynamicContent::getDatasets::res::", res.data)
          setDataset(res.data)
          setParentContent(res.data)
          getSubsets(res.data.dataset_id)
          
        })
        .catch((err: any) =>
          console.error("DynamicContent::getDatasets::error::", err),
        ) */
    }
  }

  const getSubsets = (datasetId: string, lock: any | null = null) => {
    if (subsets === null || lock !== null) {
    /*   DatasetAPI.getSubsetListByDatasetId(datasetId)
        .then((res: any) => {
          console.log("DynamicContent::getSubsets::res::", res.data)
          setSubsets(res.data)
          setExistingContent(res.data)
          setIsReturnToSelectContent(false)
        })
        .catch((err: any) =>
          console.error("DynamicContent::getSubsets::error::", err),
        ) */
    }
  }

  const getNotebooks = (contentId: string, lock: any | null = null) => {
    if(notebooks === null || lock !== null) {
      NotebookAPI.getNotebookById(contentId)
        .then((res: any) => {
          console.log("DynamicContent::getNotebooks::res::", res.data)
          setNotebooks(res.data)
          setParentContent(res.data)
          setExistingContent(res.data)
          setIsReturnToSelectContent(false)
        })
        .catch((err: any) =>
          console.error("DynamicContent::getNotebooks::error::", err),
        )
    }
  }

  const getConfigs = (contentId: string, lock: any | null = null) => {
    if(configs === null || lock !== null) {
      ConfigAPI.getConfigById(contentId)
        .then((res: any) => {
          console.log("DynamicContent::getConfigs::res::", res.data)
          setConfigs(res.data)
          setParentContent(res.data)
          setExistingContent(res.data)
          setIsReturnToSelectContent(false)
        })
        .catch((err: any) =>
          console.error("DynamicContent::getConfigs::error::", err),
        )
    }
  }

  const getModules = (contentId: string, lock: any | null = null) => {
    if(modules === null || lock !== null) {
      ModulesAPI.getModuleById(contentId)
        .then((res: any) => {
          console.log("DynamicContent::getModules::res::", res.data)
          setModules(res.data)
          setParentContent(res.data)
          setExistingContent(res.data)
          setIsReturnToSelectContent(false)
        })
        .catch((err: any) =>
          console.error("DynamicContent::getModules::error::", err),
        )
    }
  }
  //------>>>> ABOVE: These methods are for checking for existing repo items

  //======>>>> BELOW: These methods are for adding new repo items

  const goEmptyContentMenu = () => {
    console.log(
      "DynamicContent::goEmptyContentMenu::createFileMethod" + createFileMethod,
    )
    setCreateFileMethod("")
    
  }

  useEffect(() => {
    //When repo is empty. If user selects to link an organizational file createFileMethod is set to "ORG". Then we need to get the files for the menuOption: [DATASET, CONFIG, NOTEBOOK, MODULE]

    const doProcess = () => {
      getOrganizationContent(repoEntity)
    }
    return doProcess()
  }, [createFileMethod])

  useEffect(() => {
    if (menuOption !== "") {
      handleMenuOptionChange()

    }
  }, [menuOption])

  const handleMenuOptionChange = () => {
    //When user is cycling through menu options, we should first check the arrays datasets, configs, notebooks, etc. to get the data that's already been fetched and show it.  If it's not there, we should fetch it. If there's nothing in the database, we should set the existingContent to null and display the empty content menu

    //Check arrays for fetched data
    useFetchedData()

    //Check databaset for data

    //No exisiting data
  }

  const useFetchedData = () => {
    switch (menuOption) {
      case "DATASET":
        if (subsets !== null && subsets.length > 0) {
            console.log('DynamicContent::useFetchedData::subsets - exist::', subsets)
          setExistingContent(subsets)
        } else {
            setCreateFileMethod("")
            setExistingContent(null)
         console.log("DynamicContent::useFetchedData::subets === null")   
        }
        break

      case "CONFIG":
        if (configs !== null && configs.length > 0) {
            console.log("DynamicContent::useFetchedData::configs - exist::", configs)
          setExistingContent(configs)
        } else {
            setCreateFileMethod("")
            setExistingContent(null)
            console.log("DynamicContent::useFetchedData::configs === null")   
           }
        break

      case "NOTEBOOK":
        if (notebooks !== null && notebooks.length > 0) {
            console.log('DynamicContent::useFetchedData::notebooks - exist::', notebooks)
          setExistingContent(notebooks)
        } else {
            setCreateFileMethod("")
            setExistingContent(null)
            console.log("DynamicContent::useFetchedData::notebooks === null")   
           }
        break

      case "MODULE":
        if (modules !== null && modules.length > 0) {
            console.log('DynamicContent::useFetchedData::modules - exist::', modules)
          setExistingContent(modules)
        } else {
            setCreateFileMethod("")
            setExistingContent(null)
            console.log("DynamicContent::useFetchedData::modules === null")   
           }
        break

      default:
        break
    }
  }


  //When user selects a file to link to the repo, this will set the selected content, so proper item displays in the selector dropdown
  useEffect(() => {
    const doProcess = () => {
      if (selectedContent !== null) {
        switch (menuOption) {
          case "DATASET":
            setSelectedId(selectedContent.dataset_id)
            break

          case "CONFIG":
            setSelectedId(selectedContent.config_id)
            break

          case "NOTEBOOK":
            setSelectedId(selectedContent.notebook_id)
            break

          case "MODULE":
            setSelectedId(selectedContent.module_id)
            break

          default:
            break
        }
      }
    }
    return doProcess()
  }, [selectedContent])

  //If repo section is empty will get organization files if that's what user selects
  const getOrganizationContent = (entityId: string) => {
    console.log("DynamicContent::getContent::entityId::", entityId)

    switch (menuOption) {
      case "DATASET":
       /*  DatasetAPI.getDatasetListByEntity(entityId)
          .then((res: any) => {
            console.log("DynamicContent::getDatasets::res::", res)
            setContentList(res.data)
          })
          .catch((err: any) =>
            console.error("DynamicContent::getDatasets::error::", err),
          ) */
        break

      case "CONFIG":
        break

      case "NOTEBOOK":
        break

      case "MODULE":
        break

      default:
        break
    }
  }

  //If repo is empty user can select org file, upload or link a url: [ORG, UPLOAD, URL]
  const handleSelectFileMethod = (method: string) => {
    console.log("DynamicContent::handleSelectFileMethod::method::", method)
    setCreateFileMethod(method)
  }

  //When repo section is empty, if user wants to link Org file, this will set the selected item in the selector dropdown.  They still need to click the save button to add it to the repo
  const handleChangeSelectedContent = (contentId: string) => {
    console.log(
      "DynamicContent::::handleChangeSelectedContent::contentId: ",
      contentId,
    )
    switch (menuOption) {
      case "DATASET":
        setSelectedContent(
          contentList.find((content) => content.dataset_id === contentId),
        )
        break
      case "CONFIG":
        setSelectedContent(
          contentList.find((content) => content.config_id === contentId),
        )
        break
      case "NOTEBOOK":
        setSelectedContent(
          contentList.find((content) => content.notebook_id === contentId),
        )
        break
      case "MODULE":
        setSelectedContent(
          contentList.find((content) => content.module_id === contentId),
        )
        break
      default:
        break
    }
  }

  //User has selected ORG file to link to repo. This will add the selected file to the repo
  const handleAddContentToRepo = () => {
    switch (menuOption) {
      case "DATASET":
        RepoAPI.checkAddUpdateRepoItem(repoId, {
          file_id: selectedContent.dataset_id,
          file_type: "DATASET",
          user_id: userId,
        })
          .then((res: any) => {
            console.log("checkAddUpdateRepoItem::res::", res)
            pullTrigger()
          })
          .catch((err: any) => {
            console.error("checkAddUpdateRepoItem::error::", err)
          })
        break

      case "CONFIG":
        RepoAPI.addRepoItem(repoId, {
          file_id: selectedContent.config_id,
          file_type: "CONFIG",
          user_id: userId,
        })
          .then((res: any) => {
            console.log("addRepoItem::res::", res)
          })
          .catch((err: any) => {
            console.error("addRepoItem::error::", err)
          })
        break

      case "NOTEBOOK":
        RepoAPI.addRepoItem(repoId, {
          file_id: selectedContent.notebook_id,
          file_type: "NOTEBOOK",
          user_id: userId,
        })
          .then((res: any) => {
            console.log("addRepoItem::res::", res)
          })
          .catch((err: any) => {
            console.error("addRepoItem::error::", err)
          })
        break

      case "MODULE":
        RepoAPI.addRepoItem(repoId, {
          file_id: selectedContent.module_id,
          file_type: "MODULE",
          user_id: userId,
        })
          .then((res: any) => {
            console.log("addRepoItem::res::", res)
          })
          .catch((err: any) => {
            console.error("addRepoItem::error::", err)
          })
        break

      default:
        break
    }
  }
  //======>>>> ABOVE: These methods are for adding new repo items

  const returnToEmptyMenu = () => {
    setIsReturnToSelectContent(true)
    setCreateFileMethod("")
    setExistingContent(null)
  }

  const returnToSelectContent = () => {
    setIsSelectContent(true)
  }



  return (
    <>
      {createFileMethod === "" && existingContent === null ? (
        <EmptyContentMenu
          menuOption={menuOption}
          setCreateFileMethod={handleSelectFileMethod}
        />
      ) : createFileMethod !== "" && existingContent === null ? (
        <CreateContentViews
          menuOption={menuOption}
          selectedId={selectedId}
          contentList={contentList}
          handleChange={handleChangeSelectedContent}
          createMethod={createFileMethod}
          handleSelectContent={handleAddContentToRepo}
          goEmptyContentMenu={goEmptyContentMenu}
        />
      ) : menuOption === "DATASET" && existingContent !== null && dataset !== null ? (
         <RepoViewDataset 
            subsets={existingContent}
            dataset={dataset}
            selectDatasetView={returnToEmptyMenu}

            />
      ): existingContent !== null ? (
        <ViewRepoSectionContent 
            parentContent={parentContent}
            existingContent={existingContent}
            returnToEmptyMenu={returnToEmptyMenu}
         />
      ) :<></>
    }
    </>
  )
}

export default DynamicContent
