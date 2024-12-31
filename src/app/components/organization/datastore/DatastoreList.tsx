import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/containers/FlexContainers"
import DatastoreCard from "./DatastoreCard"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: 100vh;

  overflow-y: auto;
  grid-area: content;
  align-items: center;

  gap: 20px;
  padding-top: 5px;
`

const DatastoreList = ({ orgDatastoreList }: any) => {
  const [datastoreList, setDatastoreList] = useState<any[]>(orgDatastoreList)


  return (
    <SContainer>
      {datastoreList &&
        datastoreList.map((datastore: any) => {
          return <DatastoreCard orgDatastore={datastore} />
        })}
    </SContainer>
  )
}

export default DatastoreList
