
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
import RepoDataset from "../views/RepoDataset"
import RepoAll from "../views/RepoAll"
import RepoConfig from "../views/RepoConfig"
import RepoModule from "../views/RepoModule"
import RepoNotebook from "../views/RepoNotebook"

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

  useEffect(() => {
    
    const init = () => {
      console.log("BranchContent::init()::menuOption: ", menuOption)
    }

    //return init()
  }, []);

  return (
    <>
    {
      menuOption === "ALL" ? (
        <RepoAll />
      )
      : menuOption === "DATASET" ? (
        <RepoDataset />
      )
      : menuOption === "CONFIG" ? (
        <RepoConfig />
      )
      : menuOption === "MODULE" ? (
        <RepoModule />
      )
      : menuOption === "NOTEBOOK" ? (
        <RepoNotebook  />
      )
      : <></>
    }
    </>
    
  )


}

export default BranchContent