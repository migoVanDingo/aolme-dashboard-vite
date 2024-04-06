import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload, faX } from "@fortawesome/free-solid-svg-icons"
import FileUpload from "../../../common/inputs/file-upload/FileUpload"

const SContainer = styled(SFlexRow)`
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  padding: 5px;
  background-color: ${({ theme }) => theme.color.color_0};
  gap: 5px;

  
`

const SButton = styled.button`
  height: 35px;
  width: 35px;
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_7};
  border: 1px solid ${({ theme }) => theme.color.color_2_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  &:hover {
    cursor: pointer;
    color: white;
    border: 1px solid ${({ theme }) => theme.color.color_5};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.color_2_5};
    color: ${({ theme }) => theme.accent.color_1};
    border: 1px solid ${({ theme }) => theme.accent.color_1};
  }
`

const QuickUpload = ({ handleShow, menuOption, show, handleChange, handleFormSubmit, inputFile}: any) => {

  const [buttonVisible, setButtonVisible] = useState<boolean>(false)

  useEffect(() => {
    if(menuOption === "ALL"){
      setButtonVisible(false)
    } else {
      setButtonVisible(true)
    }
  }, [menuOption])

  return (
    <SContainer>
      {
        buttonVisible ? (<SButton onClick={handleShow}>
          <FontAwesomeIcon icon={show ? faX : faUpload} />
        </SButton>): <></>
      }
      
      { show ? (<FileUpload id="ful-form" inputFile={inputFile} handleFileChange={handleChange} handleFormSubmit={handleFormSubmit} />) : <></> }
    </SContainer>
  )
}

export default QuickUpload
