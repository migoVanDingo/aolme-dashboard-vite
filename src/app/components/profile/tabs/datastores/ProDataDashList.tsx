import React, { useEffect } from "react"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import styled from "styled-components"
import ListBreadCrumb from "../../../common/ListBreadCrumb"
import DatasetCard from "./DatasetCard"
import DatasetFiles from "./DatasetFiles"

const SContainer = styled.div`
  grid-area: list;
  min-height: 100%;
  width: 100%;
  padding: 0 10px;
  gap: 15px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 40px calc(calc(calc(100vh - 40px) - ${({ theme }) => theme.profile.nav.height}) - ${({ theme }) => theme.header.height});
  grid-template-areas:
    "breadcrumb"
    "itemlist";

`

const SListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  grid-area: itemlist;
  `

const ProDataDashList = ({ list, type, breadCrumb, selectedItem, setSelected }: any) => {

    const handleSelect = (id: any) => {
        setSelected(id)
    }

    

  return (
    <SContainer>
      <ListBreadCrumb breadCrumb={breadCrumb} gridArea={"breadcrumb"} />

      <SListContainer>
        {type === "Datastore" ? list.map((item: any, index: number) => (
          <DatasetCard handleSelect={handleSelect} key={item.dataset_id} dataset={item} />
        )) : type === "Dataset" ? 
        (<DatasetFiles list={list} selectedItem={selectedItem && selectedItem}/>)
        : () => { return <h1>Other list case</h1> }
    }
      </SListContainer>
    </SContainer>
  )
}

export default ProDataDashList
