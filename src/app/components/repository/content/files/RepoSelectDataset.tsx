import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { DatasetAPI } from "../../../../api/DatasetAPI"
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

const RepoSelectDataset = ({ repoEntity, selectedDataset, setSelectedDataset }: any) => {
  const [datasets, setDatasets] = useState<any[]>([])
  const [option, setOption] = useState<string>("")
  
  const [loadSubsets, setLoadSubsets] = useState<boolean>(false)

  useEffect(() => {
    const init = () => {
      getOrgDatasets(repoEntity)
    }

    return init()
  }, [repoEntity])

  useEffect(() => {
    switch (option) {
      case "ORG":
        getOrgDatasets(repoEntity)
        break
      case "UPLOAD":
        break
      case "URL":
        break
      default:
        break
    }
  }, [option])



  const getOrgDatasets = (entity: string) => {
    DatasetAPI.getDatasetListByEntity(entity)
      .then((res: any) => {
        console.log("RepoSelectDataset::getOrgDatasets()::res: ", res)
        setDatasets(res.data)
        setSelectedDataset(res.data[0])
      })
      .catch((err: any) =>
        console.error("RepoSelectDataset::getOrgDatasets()::ERROR: ", err),
      )
  }

  const orgDatasetHandleChange = (e: any) => {
    console.log(
      "RepoSelectDataset::orgDatasetHandleChange()::e: ",
      e.target.value,
    )
    setSelectedDataset(e.target.value)
  }
  const handleSelectDataset = () => {
    console.log("RepoSelectDataset::handleSelectDataset()::selectedDataset: ", selectedDataset)
    //setLoadSubsets(true)
  }

  return (
    <SContainer>
      {option === "" && !loadSubsets ? (
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
            defaultValue={datasets[0].name}
            value={selectedDataset}
          >
            {datasets.map((option: any, index: number) => {
              return (
                <option key={index} value={option}>
                  {option.name}
                </option>
              )
            })}
          </SSelect>
          <SButtonContainer>
            <SButton onClick={() => setOption("")} className="small">
              Cancel
            </SButton>
            <SButton onClick={handleSelectDataset} className="small">
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
