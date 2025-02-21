import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../containers/FlexContainers"
import Button from "../../buttons/Button"
import Datetime from "../../../../utility/datetime"


const SContainer = styled(SFlexCol)`
  align-items: baseline;
  width: 100%;
`
const SInnerContainer = styled(SFlexRow)`
  background-color: ${({ theme }) => theme.color.color_1};
  font-size: 1rem;
  width: 100%;
  height: 45px;
  align-items: center;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.color.color_3};
  cursor: pointer;
  color: ${({ theme }) => theme.color.color_6};
  

  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
  }
`
const SButtonContainer = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  align-items: center;  
`

const SIcon = styled(FontAwesomeIcon)`
  border: none;
  color: ${({ theme }) => theme.color.color_6};
`

const SInput = styled.input`
  font-size: ${({ theme }) => theme.color.color_2};
  cursor: pointer;
  width: 100%;

  &::file-selector-button {
    border: none;
    color: ${({ theme }) => theme.color.color_6};
    background-color: transparent;
    border-right: 2px solid ${({ theme }) => theme.color.color_6};
    height: 100%;
    cursor: pointer;

  }
`

const SButton = styled(Button)`
    width: 150px;
    height: 30px;
    border: none;
    border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  
    background-color:${({ theme }) => theme.color.color_3};
    color: ${({ theme }) => theme.color.color_6};
    margin-top: 10px;
    cursor: pointer;
    &:hover{
        background-color:${({ theme }) => theme.color.color_6};
    }
`

const SButton2 = styled.button`
  width: 1fr;
  margin-left: auto;

`

interface IFilePayload {
  name: string
  folderId: string
  userId: string
  createdAt: Date
  ext: string
}

const FileUpload = ({ handleFileChange, inputFile }: any) => {
  

  return (
    <SContainer>
      <SInnerContainer>
        
          <SButtonContainer>
            <SIcon icon={faUpload} />
            <SInput name="files" type="file" ref={inputFile} onChange={handleFileChange} multiple /* webkitdirectory="" mozdirectory directory *//>
          </SButtonContainer>
  
      </SInnerContainer>
    </SContainer>
  )
}

export default FileUpload
