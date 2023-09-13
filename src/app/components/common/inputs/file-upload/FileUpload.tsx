import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../containers/FlexContainers"
import Button from "../../buttons/Button"
import Datetime from "../../../../utility/datetime"


const SContainer = styled(SFlexCol)`
  align-items: baseline;
`
const SInnerContainer = styled(SFlexRow)`
  background-color: ${({ theme }) => theme.color.color_2};
  font-size: 1.2rem;
  width: 500px;
  height: 30px;
  align-items: center;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
  }
`
const SButtonContainer = styled(SFlexRow)`
  height: 100%;
  padding: 0;
  margin: 0;
`

const SIcon = styled(FontAwesomeIcon)`
  border: none;
`

const SInput = styled.input`
  font-size: ${({ theme }) => theme.color.color_2};
  cursor: pointer;

  &::file-selector-button {
    border: none;
    color: ${({ theme }) => theme.color.color_6};
    background-color: transparent;
    border-right: 2px solid ${({ theme }) => theme.color.color_1};
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

interface IFilePayload {
  name: string
  folderId: string
  userId: string
  createdAt: Date
  ext: string
}

const FileUpload = ({ handleFileChange}: any) => {
  

  return (
    <SContainer>
      <SInnerContainer>
        
          <SButtonContainer>
            <SIcon icon={faUpload} />
            <SInput name="files" type="file" onChange={handleFileChange} multiple/>
          </SButtonContainer>
  
      </SInnerContainer>
    </SContainer>
  )
}

export default FileUpload
