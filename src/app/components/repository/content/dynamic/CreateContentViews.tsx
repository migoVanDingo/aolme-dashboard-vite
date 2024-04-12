import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import SelectOrgContentView from "./SelectOrgContentView"

const SContainer = styled(SFlexCol)`
  height: 100%;
  padding: 20px;
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
const SPara = styled.p`
  padding: 10px 0;
  margin: 0;
  font-size: 0.95rem;
  line-height: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.color_6};
`

const SButton = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
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

const SSelect = styled.select`
  width: 500px;
  height: 35px;
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_6};
  border: none;
  padding: 10px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
`

const CreateContentViews = ({
  menuOption,
  createMethod,
  contentId,
  contentList,
  handleChange,
}: any) => {
  return (
    <>
      {createMethod === "ORG" ? (
        <SelectOrgContentView
          menuOption={menuOption}
          createMethod={createMethod}
          contentId={contentId}
          contentList={contentList}
          handleChange={handleChange}
        />
      ) : createMethod === "UPLOAD" ? (
        <></>
      ) : createMethod === "URL" ? (
        <></>
      ) : (
        <></>
      )}
    </>
  )
}

export default CreateContentViews
