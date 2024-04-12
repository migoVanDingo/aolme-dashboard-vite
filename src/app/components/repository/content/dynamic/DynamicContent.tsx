import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { DatasetAPI } from "../../../../api/DatasetAPI"
import Dataset from "../../../../pages/Dataset"
import EmptyContentMenu from "./EmptyContentMenu"
import CreateContentViews from "./CreateContentViews"

const DynamicContent = ({
  menuOption,
  repoEntity,

  option,
  setOption,

  subsets,
  datasets,
  dataset,
  selectDatasetView,
  handleSelectNewDataset,
  selectedDataset,
  setSelectedDataset,
}: any) => {



    const [contentId, setContentId] = useState<any>("")

    const [selectedContent, setSelectedContent] = useState<any>(null)

    const [contentList, setContentList] = useState<any[]>([])

    const [parentContent, setParentContent] = useState<any>(null)


    const [createFileMethod, setCreateFileMethod] = useState<string>("")


    useEffect(() => {
        if(parentContent !== null)
            console.log("DynamicContent::parentContent::", parentContent)
    }, [parentContent]);

    useEffect(() => {
        if(contentList !== null)
            console.log("DynamicContent::contentList::", contentList)
    }, [contentList]);

  useEffect(() => {


    const getContent = () => {
      switch (menuOption) {
        case "DATASET":
          getDatasets(contentId)
          break

        case "CONFIG":
          getConfigs(contentId)
          break

        case "NOTEBOOK":
          getNotebooks(contentId)
          break

        case "MODULE":
          getModules(contentId)
          break

        default:
          break
      }
    }
    return () => {
        menuOption && contentId && getContent()
    }
  }, [menuOption, contentId])



  const getDatasets = (contentId: string) => {

    DatasetAPI.getDatasetById(contentId)
    .then((res: any) => {

        setParentContent(res.data)

        DatasetAPI.getSubsetListByDatasetId(res.data["dataset_id"])
        .then((res: any) => {
            setContentList(res.data)
          
        })
        .catch((err: any) => console.error("DynamicContent::getDatasets::getSubsetListByDatasetId::error::", err))
    })
    .catch((err: any) => console.error("DynamicContent::getDatasets::error::", err))
  }

  const getNotebooks = (contentId: string) => {}

  const getConfigs = (contentId: string) => {}

  const getModules = (contentId: string) => {}


  const handleSelectFileMethod = (method: string) => {
    setCreateFileMethod(method)
  }

  const handleChangeSelectedContent = (contentId: string) => {
    console.log('DynamicContent::::handleChangeSelectedContent::contentId: ', contentId)   
  }

  return (
    <>
        {
            contentId === "" ? (
                <EmptyContentMenu 
                menuOption={menuOption}
                setCreateFileMethod={handleSelectFileMethod}
                
                />
            ): contentId === "" && createFileMethod !== "" ? (
                <CreateContentViews 
                menuOption={menuOption}
                contentId={contentId}
                contentList={contentList}
                handleChange={handleChangeSelectedContent}
                createMethod={createFileMethod}

                />
            ) : <></>
        }
    </>
    )
}

export default DynamicContent
