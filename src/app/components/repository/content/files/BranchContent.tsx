
import { useEffect } from "react"
import styled from "styled-components"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import RepoAll from "../views/RepoAll"
import RepoConfig from "../views/RepoConfig"
import RepoDataset from "../views/RepoDataset"
import RepoDirectory from "../views/RepoDirectory"
import RepoModule from "../views/RepoModule"
import RepoNotebook from "../views/RepoNotebook"
import RepoPipeline from "../views/RepoPipeline"

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
      : menuOption === "FILES" ? (
        <RepoDirectory />
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
      : menuOption === "PIPELINE" ? (
        <RepoPipeline  />
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