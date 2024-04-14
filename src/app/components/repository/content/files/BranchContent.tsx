
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import RepoSelectDataset from "./RepoSelectDataset"
import ViewDataset from "../../../dataset/ViewDataset"
import Subset from "../../../dataset/subset/Subset"
import { DatasetAPI } from "../../../../api/DatasetAPI"
import SubsetCard from "../../../dataset/subset/SubsetCard"
import RepoViewDataset from "./RepoViewDataset"
import ViewFiles from "./ViewFiles"
import DynamicContent from "../dynamic/DynamicContent"

const SEmptyRepo = styled(SFlexRow)`
  padding: 80px 60px 100px 60px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.color_3};
`



const BranchContent = ({
  files,
  show,
  menuOption,
}: any) => {

  const [isSelectNewDataset, setIsSelectNewDataset] = useState<boolean>(false)
  const [selectedDataset, setSelectedDataset] = useState<any>(null)
  const [subsets, setSubsets] = useState<any[]>([])

  const [datasets, setDatasets] = useState<any[]>([])
  const [createFileOption, setCreateFileOption] = useState<string>("")

  const { repoEntity, repoId } = useSelector((state: any) => state)

  const showDatasetView = () => setIsSelectNewDataset(true)
  const hideDatasetView = () => setIsSelectNewDataset(false)

  useEffect(() => {
    if(selectedDataset === "" || selectedDataset === null || subsets.length === 0) {
      setIsSelectNewDataset(true)
    }
    console.log("sss: ",subsets)
    console.log("selectedDataset: ", selectedDataset)
  },[])

  useEffect(() => {
    if(selectedDataset) {
      getSubsets(selectedDataset)
    }
  }, [selectedDataset]);

  useEffect(() => {
    if(subsets.length > 0) {
      console.log("Set Subsets: ", subsets)
    }

  }, [subsets]);


  const getSubsets = (dataset: any) => {
    DatasetAPI.getSubsetListByDatasetId(dataset)
    .then((response) => {
      console.log("Subset response: ", response)
      setSubsets(response.data)
    })
    .catch((error) => console.error("BranchContent::getSubsets()::error: ", error))
  }


  useEffect(() => {
    const init = () => {
      getOrgDatasets(repoEntity)
    }
    return init()
  }, [repoEntity])


  useEffect(() => {
    
    switch (createFileOption) {
      case "ORG":
        getOrgDatasets(repoEntity)
        break
      case "UPLOAD":
        break
      case "URL":
        break
      default:
        break
    }
  }, [createFileOption])



  const getOrgDatasets = (entity: string) => {
    DatasetAPI.getDatasetListByEntity(entity)
      .then((res: any) => {
        console.log("RepoSelectDataset::getOrgDatasets()::res: ", res)
        setDatasets(res.data)
        //setSelectedDataset(res.data[0])
      })
      .catch((err: any) =>
        console.error("RepoSelectDataset::getOrgDatasets()::ERROR: ", err),
      )
  }

  const handleChangeDataset = (dataset_id: string) => {
    console.log("BranchContent::handleSelectDataset()::dataset_id: ", dataset_id)
    setSelectedDataset(dataset_id)
    
  }

  const handleSelectNewDataset = () => {
    setIsSelectNewDataset(false)
    handleChangeDataset(selectedDataset)
    console.log('which subsets set: ', subsets)
    console.log("selectedDataset: ", selectedDataset)
   
  }




  return (
    <>
      {/* {
      menuOption !== "DATASET" ? (

        <SEmptyRepo>
          No {menuOption.toLowerCase()} files. Upload or create a {menuOption.toLowerCase()} to get started.
        </SEmptyRepo>
        
      ) : repoEntity && isSelectNewDataset ? (

        <RepoSelectDataset 
        repoEntity={repoEntity} 
        selectedDataset={selectedDataset} 
        setSelectedDataset={handleChangeDataset} 
        datasets={datasets} 
        option={createFileOption} 
        setOption={setCreateFileOption}
        handleSelectNewDataset={handleSelectNewDataset}
        
        />
      ) : !isSelectNewDataset && subsets.length > 0 ?
      (
        <RepoViewDataset subsets={subsets} dataset={selectedDataset} selectDatasetView={showDatasetView} />
      )
      : <></>
    } */}

    {
      !files || files.length === 0 && menuOption === "ALL" ? (
        <SEmptyRepo>
          There are no files in this repo. Click on the other tabs to upload or link files.
        </SEmptyRepo>
      ):
      menuOption === "ALL" ? (
        <ViewFiles files={files}/>
      ) :
      (
        <DynamicContent 
        menuOption={menuOption}
        repoEntity={repoEntity} 
        repoId={repoId}

        
        />
      ) 
      

    }

      
    </>
  )
}

export default BranchContent
