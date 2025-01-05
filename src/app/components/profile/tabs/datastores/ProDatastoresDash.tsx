import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import ProStoreComp from "./ProStoreComp"
import ProDatasetComponent from "./ProDatasetComp"
import { DatastoreAPI } from "../../../../api/DatastoreAPI"
import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useDatastore } from "../../../../hooks/useDatastore"
import { useDataset } from "../../../../hooks/useDataset"

const SContainer = styled.div`
  grid-area: content;
  width: 100%;
  padding: 0 0px;
  display: grid;
  grid-template-columns: [left]4fr [col2] 7fr [right] 3fr [end];
  grid-template-rows: [top] ${({ theme }) => theme.profile.nav.height} [row2] 400px [row3] 400px [row4] ${({
      theme,
    }) => theme.profile.nav.height}[end];
  grid-template-areas:
    "store list desc"
    "store list desc"
    "set list desc"
    "set list desc";

  grid-gap: 3px;

  position: relative;
  margin: 0px auto 0;
  box-sizing: border-box;
  height: calc(calc(100vh - ${({ theme }) => theme.header.height}) - ${({ theme }) => theme.profile.nav.height});
`

const SStore = styled(SFlexCol)`
  grid-area: store;
  height: 100%;
  width: 100%;
  border: 1px solid red;
  color: white;
`

const SList = styled(SFlexCol)`
  grid-area: list;
  height: 100%;
  width: 100%;
  border: 1px solid blue;
  color: white;
`

const SSet = styled(SFlexCol)`
  grid-area: set;
  height: 100%;
  width: 100%;
  border: 1px solid yellow;
  color: white;
`

const SDesc = styled(SFlexCol)`
  grid-area: desc;
  height: 100%;
  width: 100%;
  border: 1px solid red;
  color: white;
`

const ProfDatastoresDash = () => {
  const { userId, datastoreId } = useLoaderData() as {
    userId: string
    datastoreId: string
  }

  const { datastoreList, selectedDatastore, setSelectedDatastore } =
    useDatastore(userId, datastoreId || "")

    
  const { datasetList, selectedDataset, setSelectedDataset } = useDataset(selectedDatastore)

  return (
    <SContainer>
      <ProStoreComp 
      datastoreList={datastoreList} 
      selectedDatastore={selectedDatastore} 
      setSelectedDatastore={setSelectedDatastore} />

      <SList>List</SList>

      <ProDatasetComponent 
        datasetList={datasetList}
        selectedDataset={selectedDataset}
        setSelectedDataset={setSelectedDataset} 
        selectedDatastore={selectedDatastore} 
      />
      <SDesc>Desc</SDesc>
    </SContainer>
  )
}

export default ProfDatastoresDash

export const loader = async () => {
  const userId = localStorage.getItem("userId") as string
  const datastoreId = localStorage.getItem("datastoreId") as string
  return {
    userId,
    datastoreId
  }
}
