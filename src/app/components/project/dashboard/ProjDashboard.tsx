import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/containers/FlexContainers"
import DatasetModule from "./DatasetModule"
import PipelineModule from "./PipelineModule"
import ResultsModule from "./ResultsModule"
import DiscussionModule from "./DiscussionModule"
import ProjectInfoModule from "./ProjectInfoModule"
import { useSelector } from "react-redux"


const SContainer = styled(SFlexCol)`

  width: 100%;
  min-height: calc(calc(100vh - ${({ theme }) => theme.header.height}) - 125px);
  background-color: ${({ theme }) => theme.color.color_2};
  padding: 40px;

  
`

const SDashModuleContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  gap: 15px;

  grid-template-columns: repeat(7, minmax(0px, 250px));
  grid-template-rows: repeat(7,  minmax(0px, auto));
  box-sizing: border-box;

  grid-template-areas:
    "project-info  project-info project-info project-info results results results"
    "pipeline pipeline pipeline pipeline results results results"
    "dataset dataset dataset dataset discussion discussion discussion"
    "dataset dataset dataset dataset discussion discussion discussion"
    "dataset dataset dataset dataset discussion discussion discussion";
`

const ProjDashboard = () => {

    const project = useSelector((state: any) => state.project)
  return (
    <SContainer>
      <SDashModuleContainer>
        <ProjectInfoModule project={project}/>

        <PipelineModule />
        
        <DatasetModule />

        <ResultsModule />

        <DiscussionModule />

      </SDashModuleContainer>
    </SContainer>
  )
}

export default ProjDashboard
