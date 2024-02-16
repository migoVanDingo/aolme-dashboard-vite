import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

const SContainer = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
  background-color: ${({ theme }) => theme.color.color_0};
  
`

const SButton = styled.button`
  height: 25px;
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

const QuickUpload = ({ menuOption, launchModal }: any) => {
  return (
    <SContainer>
      <SButton onClick={launchModal}>
        <FontAwesomeIcon icon={faUpload} />
      </SButton>
    </SContainer>
  )
}

export default QuickUpload
