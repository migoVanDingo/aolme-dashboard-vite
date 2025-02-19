import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import ProStoreComp from "./ProStoreComp"
import ProDatasetComponent from "./ProDatasetComp"
import { DatastoreAPI } from "../../../../api/DatastoreAPI"
import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useDatastore } from "../../../../hooks/useDatastore"
import { useDataset } from "../../../../hooks/useDataset"
import ProDataDashList from "./ProDataDashList"
import { useDatasetFiles } from "../../../../hooks/useDatasetFiles"
import { useDispatch } from "react-redux"
import { setDatasets, setDatastoreConfig, setDatastoreId, setDatastoreName } from "../../../../store/slices/datastore"
import { setDatasetId, setDatasetName } from "../../../../store/slices/dataset"

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

  grid-gap: 0px;

  position: relative;
  margin: 0px auto 0;
  box-sizing: border-box;
  min-height: calc(calc(100vh - ${({ theme }) => theme.header.height}) - ${({ theme }) => theme.profile.nav.height}
  );
`

const SInfoContainer = styled.div`
  width: 100%;
  grid-area: desc;
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "heading"
    "info";
  border-left: 1px solid ${({ theme }) => theme.color.color_3};
`

const SInfoHeading = styled(SFlexRow)`
  align-items: center;
  padding: 0 10px;
  height: 100%;
  width: 100%;

  grid-area: heading;
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
`
const SSubHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`

const SDesc = styled(SFlexCol)`
  padding: 10px;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  color: ${({ theme }) => theme.color.color_5};
  font-family: "Helvetica", sans-serif;
  font-weight: 200;
`

const ProfDatastoresDash = () => {

  const dispatch = useDispatch()
  const { userId } = useLoaderData() as {
    userId: string
  }

  const [selectedItem, setSelectedItem] = useState<any>(null)

  //Type is used on other modules on the UI. Toggles datastore/dataset strings
  const [type, setType] = useState<any>("")

  // List could be either datsets or dataset-files
  const [list, setList] = useState<any>([])
  const [breadCrumb, setBreadCrumb] = useState<Set<string>>()
  const defaultBreadCrumb = new Set(["Datastore"])

  // Hook to get the datastores
  const { datastoreList, selectedDatastore, datastoreConfig, setSelectedDatastore } =
    useDatastore(userId)

    const [currentDatastore, setCurrentDatastore] = useState<string>("")
    useEffect(() => {
      const init = () => {
        if (selectedDatastore !== "") {
          setCurrentDatastore(selectedDatastore)
        }
      }

      return init()
    }, [selectedDatastore]);

  // Hook to get the datasets
  const { datasetList, selectedDataset, setSelectedDataset, handleSetSelected } =
    useDataset(currentDatastore)

  // Hook to get dataset-files
  const { datasetFiles, selectedDatasetFile, setSelectedDatasetFile } = useDatasetFiles(selectedDataset)

  // These UseEffects Dynamically set the list based on the selected item
  useEffect(() => {
    const init = () => {
      if (
        selectedDatastore !== "" &&
        datastoreList.length > 0
      ) {
        // console.log('selectedDatastore', selectedDatastore)
        setType("Datastore")

        setList(datasetList)

        const store = datastoreList.filter(
          (item: any) => item.datastore_id === selectedDatastore,
        )

        const name = store[0] && store[0].name

        const bc = new Set([...defaultBreadCrumb, name])
        setSelectedItem(store[0])
        setBreadCrumb(bc)

        dispatch(setDatasets(datasetList))
        dispatch(setDatastoreId(selectedDatastore))
        dispatch(setDatastoreName(name))

      }
    }

    return init()
  }, [selectedDatastore, datasetList, datastoreList])

  useEffect(() => {
    const init = () => {
      if (selectedDataset !== "") {
        // console.log('selectedDataset', selectedDataset)
        setType("Dataset")

        setList(datasetFiles)

        const dataset = datasetList.filter(
          (item: any) => item.dataset_id === selectedDataset,
        )
        const name = dataset[0] && dataset[0].name

        let temp = breadCrumb

        if (temp && temp.size > 2) {
          // Delete last two elements from the set
          temp = new Set([...temp].slice(0, -2))
        }

        const bc = new Set([...(temp || []), "Dataset", name])
        setSelectedItem(dataset[0])
        setBreadCrumb(bc)

        
        dispatch(setDatasetId(selectedDataset))
        dispatch(setDatasetName(name))
      }
    }
    return init()
  }, [selectedDataset, datasetFiles])


  useEffect(() => {
    const init = () => {
      if (datastoreConfig) {
        dispatch(setDatastoreConfig(datastoreConfig))
      }
    }
    return init()
  }, [datastoreConfig]);

  return (
    <SContainer>
      <ProStoreComp
        datastoreList={datastoreList}
        selectedDatastore={selectedDatastore}
        setSelectedDatastore={setSelectedDatastore}
      />

      <ProDataDashList
        selectedItem={selectedItem}
        setSelected={handleSetSelected}
        list={list}
        type={type}
        breadCrumb={breadCrumb && [...breadCrumb]}
      />

      <ProDatasetComponent
        datasetList={datasetList}
        selectedDataset={selectedDataset}
        setSelectedDataset={handleSetSelected}
        selectedDatastore={selectedDatastore}
      />
      <SInfoContainer>
        <SInfoHeading>
          {type + ": "}
          {selectedItem && selectedItem.name}
        </SInfoHeading>
        
        <SDesc><SSubHeading>Description</SSubHeading>{selectedItem && selectedItem.description}</SDesc>
      </SInfoContainer>
    </SContainer>
  )
}

export default ProfDatastoresDash

export const loader = async () => {
  const userId = sessionStorage.getItem("userId") as string
  const datastoreId = sessionStorage.getItem("datastoreId") as string
  return {
    userId,
    datastoreId,
  }
}
