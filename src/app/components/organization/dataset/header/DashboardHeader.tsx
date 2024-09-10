import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../../../common/containers/FlexContainers'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"

const SContainer = styled(SFlexRow)`

    width: 100%;
    align-items: flex-end;
    box-sizing: border-box;
    padding-right: 0;

`

const SH2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
`

const SICon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.color_6};
  margin-left: auto;
  margin: 5px;

  font-weight: 200;
  &.hover {
 
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
  }
`

const SButton = styled.button`
  background-color: ${({ theme }) => theme.color.color_1};
  color: ${({ theme }) => theme.color.color_6};
  font-size: 1rem;
  font-weight: 200;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  padding: 5px 10px 5px 7px;
  cursor: pointer;
  transition: 0.3s;

  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.color.color_1};

  margin-left: auto;
  margin-bottom: 10px;

  &.hover {
    background-color: ${({ theme }) => theme.color.color_2};
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`


const DashboardHeader = ({ hover, mouseOver, mouseOut, handleCreateNew, heading, type }: any) => {
  return (
    <SContainer>
        <SH2>{heading}</SH2>
        <SButton className={hover ? "hover": ""} onClick={handleCreateNew} onMouseOver={mouseOver} onMouseOut={mouseOut}>
          <SICon className={hover ? "hover": ""} icon={faAdd} /> Create {type}
        </SButton>
      </SContainer>
  )
}

export default DashboardHeader