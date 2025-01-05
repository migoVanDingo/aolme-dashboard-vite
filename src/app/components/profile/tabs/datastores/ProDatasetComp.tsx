import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import CreateButton from "../../../common/buttons/CreateButton"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useDataset } from "../../../../hooks/useDataset"
import { useNavigate } from "react-router-dom"
import Routes from "../../../../../constants/routes"

const SContainer = styled.div`
  grid-area: set;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "set-header"
    "set-list";

  border-right: 1px solid ${({ theme }) => theme.color.color_3};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};

`

const SHeader = styled(SFlexRow)`
  grid-area: set-header;
  width: 100%;
  height: 100%;

  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
`

const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;

  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`

const SListContainer = styled(SFlexCol)`
    grid-area: set-list;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    `

const SList = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const SListRow = styled(SFlexRow)`
  width: 100%;
  height: 30px;
  padding: 10px 0px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.color_5};
  background-color: ${({ theme }) => theme.color.color_2};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
  align-items: center;
  &.table-head {
    height: 40px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
    color: ${({ theme }) => theme.color.color_8};
    cursor: pointer;
  }
`

const SRowCell = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 0.8rem;
  color: inherit;
  background-color: inherit;

  align-items: center;
`

const ProDatasetComponent = ({ datasetList, selectedDataset, setSelectedDataset, selectedDatastore }: any) => {

    const nav = useNavigate()
    

    const handleClick = () => {
        localStorage.setItem("selectedDatastore", selectedDatastore)
        nav(Routes.PROFILE_DATASET_CREATE)
      }


  return (
    <SContainer>
      <SHeader>
        <SHeading>Dataset</SHeading>{" "}
        <CreateButton
          className={selectedDatastore !== "" ? "create-new sm" : "inactive sm"}
          innerHtml={"New Dataset"}
          icon={faPlus}

          handleClick={selectedDatastore !== "" ? handleClick : () => {}}
        />{" "}
      </SHeader>

      <SListContainer>
        <SListRow className="table-head">
          <SRowCell>Name</SRowCell>

          <SRowCell>Last Updated</SRowCell>
        </SListRow>
        
        <SList>
        {datasetList && datasetList.length >= 0 ? (
          datasetList.map((set: any, index:number) => {
            return (
              <SListRow key={index}>
                <SRowCell>{set.name}</SRowCell>
                <SRowCell>{set.lastUpdated}</SRowCell>
              </SListRow>
            )
          })
        ) : (
          <div>No Datasets in this Dataset</div>
        )}
        </SList>
      </SListContainer>
    </SContainer>
  )
}

export default ProDatasetComponent
