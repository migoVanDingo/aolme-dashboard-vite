import React, { useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import DatastoreSubsetList from "./DatastoreSubsetList"
import { DatastoreAPI } from "../../../api/DatastoreAPI"
import { useDatastore } from "../../../hooks/useDatastore"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: 100vh;
  grid-area: content;
  padding: 30px;
`

const SViewHeader = styled(SFlexRow)`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin-bottom: 0px;
`
const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  margin-bottom: 0px;
  padding: 0;
  margin: 0;

`

const SH2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0;
  padding: 0 0 10px 10px;
`

const SCol = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
  align-items: baseline;
`

const SListContainer = styled(SFlexCol)`
  width: 100%;
  align-items: flex-start;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.color_4};
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
`

const SMeta = styled.p`
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  margin-bottom: 10px;
  margin: 0;
  padding: 0;
  text-align: justify;
`

const SButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.color.color_5};
  border: 1px solid ${({ theme }) => theme.color.color_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  height: 30px;
  width: 200px;
  gap: 5px;
  margin-bottom: 30px;

  &.subset {
    margin-left: auto;
  }

  &.active {
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`

const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.color_5};

  &.active {
    color: ${({ theme }) => theme.accent.color_1};
  }
`

const ViewDatastore = () => {
  const nav = useNavigate()
  const { currentDatastore, loaderSubsetList } = useLoaderData() as {
    currentDatastore: any
    loaderSubsetList: any
  }

  const [datastore, setDatastore] = useState<any>(currentDatastore)
  const [hover, setHover] = useState<boolean>(false)

  const { subsetNames } = useDatastore(
    currentDatastore.datastore_id,
    loaderSubsetList,
  )

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)

  useEffect(() => {
    console.log('subsetNames: ', subsetNames)
  }, [subsetNames]);

  return (
    <SContainer>
      <SViewHeader>
        <SCol>
          <SHeading>Datastore: {datastore.name}</SHeading>
          <SMeta>Datastore ID: {datastore.datastore_id}</SMeta>
        </SCol>
        <SButton
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={hover ? "active" : ""}
          onClick={() => nav(-1)}
        >
          <SIcon icon={faArrowLeft} className={hover ? "active" : ""} />
          {"Back to Dashboard"}
        </SButton>
      </SViewHeader>

      <SListContainer>
        <SH2>Subset List</SH2>
        <DatastoreSubsetList subsetList={subsetNames}/>
      </SListContainer>
    </SContainer>
  )
}

export default ViewDatastore

export const loader = async () => {
  const currentDatastore = JSON.parse(
    localStorage.getItem("currentDatastore") as any,
  )

  const subsets = await DatastoreAPI.getSubsetList(
    currentDatastore.datastore_id,
  )

  console.log("subsets: ", subsets)

  return {
    currentDatastore,
    loaderSubsetList: subsets,
  }
}
