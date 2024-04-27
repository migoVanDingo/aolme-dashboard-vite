import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload, faX } from "@fortawesome/free-solid-svg-icons"
import FileUpload from "../../../common/inputs/file-upload/FileUpload"
import FileUploadService from "../../../../services/FileUploadService"
import { useSelector } from "react-redux"

const SColContainer = styled(SFlexCol)`
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`
const SHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.color.color_6};
`

const SContainer = styled(SFlexRow)`
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  padding: 5px;

  gap: 5px;
`

const SButton = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 200;
  width: 300px;
  color: ${({ theme }) => theme.color.color_6};
  background-color: ${({ theme }) => theme.color.color_2};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
  }

  &.small {
    width: 140px;
    font-size: 0.8rem;
  }
`
const SButtonContainer = styled(SFlexRow)`
  gap: 20px;
  padding: 0;
  margin: 0 0 0 auto;
`

const QuickUploadV2 = ({ menuOption, goBackToEmptyMenu }: any) => {
  const { userId, repoEntity, repoId } = useSelector((state: any) => state)
  const [uploadFiles, setUploadFiles] = useState<any>(null)
  const [progress, setProgress] = useState<number>(0)

  const inputFile = useRef(null)

  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = ""
      inputFile.current.type = "text"
      inputFile.current.type = "file"
    }
  }

  const handleChange = (e: any) => {
    setUploadFiles(e.target.files)
  }

  const handleFormSubmit = () => {
    const payload = {
      entity_id: repoEntity,
      owner: userId,
      type: menuOption,
    }

    FileUploadService.fileUpload(
      uploadFiles, 
      payload, 
      (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
      },
      repoId
  
  )
      .then((res) => {
        console.log("QuickUploadV2: ", res.data)
        handleReset()
      })
      .catch((err) => {
        console.log("QuickUploadV2: ", err)
      })
  }

  const handleCancel = () => {
    handleReset()
    goBackToEmptyMenu()
  }

  return (
    <SColContainer>
      <SHeading>Upload a {menuOption.toLowerCase()} file</SHeading>
      <SContainer>
        <FileUpload
          id="ful-form"
          inputFile={inputFile}
          handleFileChange={handleChange}
        />
      </SContainer>
      <SButtonContainer>
        <SButton className="small right" onClick={handleCancel}>
          Cancel
        </SButton>
        <SButton className="small right" onClick={handleFormSubmit}>
          Upload
        </SButton>
      </SButtonContainer>
    </SColContainer>
  )
}

export default QuickUploadV2
