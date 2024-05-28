import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/containers/FlexContainers"
import TextInput from "../../common/inputs/text/TextInput"
import QuickUploadV2 from "../content/files/QuickUploadV2"
import TextArea from "../../common/inputs/text/TextArea"

const SContainer = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
  background-color: ${({ theme }) => theme.color.color_2_5};
  padding: 50px;
`

const SHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.color.color_6};
`

const SColContainer = styled(SFlexCol)`
  height: 100%;
  width: 500px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`

const UploadDatasetFilesRepo = ({
  menuOption,
  name,
  description,
  setName,
  setDescription,
  trigger,
  goBackToEmptyMenu,
  setUploadFiles,
  handleFormSubmit,
}: any) => {
  return (
    <SContainer>
      <SColContainer>
        <SHeading>Upload a {menuOption.toLowerCase()} file</SHeading>
        <TextInput name={name} setName={setName} label={"Name"} />
        <TextArea description={description} setDescription={setDescription} />
        <QuickUploadV2
          goEmptyContentMenu={goBackToEmptyMenu}
          menuOption={menuOption}
          name={name}
          trigger={trigger}
          setUploadFiles={setUploadFiles}
          handleFormSubmit={handleFormSubmit}
        />
      </SColContainer>
    </SContainer>
  )
}

export default UploadDatasetFilesRepo
