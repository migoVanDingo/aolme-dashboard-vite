import React from "react"
import styled from "styled-components"
import DynamicDescriptionCard from "../../common/cards/DynamicDescriptionCard"
import CreateButton from "../../common/buttons/CreateButton"
import { SFlexRow } from "../../common/containers/FlexContainers"
import { useNavigate } from "react-router-dom"
import Routes from "../../../../constants/routes"
import { useSelector } from "react-redux"
const SContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: files;
`

const SButtonContainer = styled(SFlexRow)`
  padding: 1rem 0;
  gap: 10px;
`

const FilesModuleEmptyState = ({setFilesModule}: any) => {


  return (
    <SContainer>
      <DynamicDescriptionCard
        containerStyles={"p-1 b-weight-100 b-rad-md"}
        headingStyles={"f-weight-200 f-lg"}
        textStyles={"f-md f-weight-200"}
        heading={"No linked project"}
        text={
          "This project is empty. Clone a project from github or upload files to get started."
        }
      />

      <SButtonContainer>
        <CreateButton
          innerHtml={"Clone from github"}
          className={"create-new lg"}
          handleClick={() => setFilesModule("CLONE")}
        />
        <CreateButton
          innerHtml={"Upload files"}
          className={"view lg"}
          handleClick={() => setFilesModule("UPLOAD")}
        />
      </SButtonContainer>
    </SContainer>
  )
}

export default FilesModuleEmptyState
