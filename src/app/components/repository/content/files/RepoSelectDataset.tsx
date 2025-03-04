import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { DatasetAPI } from "../../../../deprecated/DatasetAPI__OLD"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import SelectInput from "../../../common/inputs/select/SelectInput"
import QuickUpload from "./QuickUpload"
import TextInput from "../../../common/inputs/text/TextInput"

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

const SLabel = styled.label`
  margin: 5px 0;
  font-size: 0.8rem;
  font-weight: 200;
`

const RepoSelectDataset = ({ 
  repoEntity, 
  selectedDataset, 
  setSelectedDataset, 
  option, 
  setOption, 
  handleSelectNewDataset,
  datasets }: any) => {


  const orgDatasetHandleChange = (e: any) => {
    setSelectedDataset(e.target.value)
  }



  return (
    <SContainer>
      {option === "" ? (
        <>
          <SHeading>Dataset</SHeading>
          <SPara>
            No dataset linked to this repository. You can select an option to:
            Use an organizational dataset, Upload a dataset file, or add a link
            to download a dataset from somewhere else. Select an option below to
            continue.
          </SPara>
          <SButton onClick={() => setOption("ORG")}>
            Use Organization Dataset
          </SButton>
          <SButton onClick={() => setOption("UPLOAD")}>
            Upload Dataset File
          </SButton>
          <SButton onClick={() => setOption("URL")}>
            Add URL to Download Dataset
          </SButton>
        </>
      ) : option === "ORG" && datasets && datasets.length > 0 ? (
        <>
          <SHeading>Select Organization Dataset</SHeading>
          <SSelect
            onChange={(e: any) => orgDatasetHandleChange(e)}
            value={selectedDataset}
          >
            <option value="" selected>Select a dataset</option>
            {datasets.map((option: any, index: number) => {
              return (
                <option key={index} value={option.dataset_id}>
                  {option.name}
                </option>
              )
            })}
          </SSelect>
          <SButtonContainer>
            <SButton onClick={() => setOption("")} className="small">
              Cancel
            </SButton>
            <SButton onClick={handleSelectNewDataset} className="small">
              Select
            </SButton>
          </SButtonContainer>
        </>
      ) : option === "UPLOAD" ? (
        <QuickUpload />
      ) : option === "URL" ? (
        <TextInput />
      ) : null}
    </SContainer>
  )
}

export default RepoSelectDataset
