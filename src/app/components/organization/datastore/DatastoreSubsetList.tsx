import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import { SUserRow } from "../../styled/SOrganization"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useRouteLoaderData } from "react-router-dom"
import { useDatastore } from "../../../hooks/useDatastore"
import { useSelector } from "react-redux"

const SContainer = styled(SFlexCol)`
  width: 100%;
  align-items: flex-start;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.color_4};
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
`
const SIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.color_5};
  margin-right: 5px;

  &.ready {
    color: green;
  }

  &.not-ready {
    color: red;
  }
`

const SFieldValue = styled(SFlexRow)`
  min-width: 110px;
  padding: 10px;
  box-sizing: border-box;

  transition: all 0.3s ease;
  color: ${({ theme }) => theme.color.color_5};
  font-size: 0.9rem;
  font-weight: 300;

  &.long {
    min-width: 280px;
  }

  &.short {
    min-width: 100px;
  }
`
const SListContainer = styled(SFlexCol)`
  border: 1px solid ${({ theme }) => theme.color.color_3};
  width: 100%;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  align-items: baseline;
  padding: 5px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_3};
  box-shadow: 2px 2px 4px ${({ theme }) => theme.color.shadow.dark};
`

const SLink = styled.a`
  color: ${({ theme }) => theme.color.color_6};
  font-size: 0.9rem;
  font-weight: 300;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`
const SViewHeader = styled(SFlexRow)`
  width: 100%;
  height: 60px;
  align-items: center;

  padding: 0;
  margin-bottom: 0px;
  box-sizing: border-box;
  gap: 10px;
`
const SH2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0;
  padding: 0 0 10px 10px;
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

  &.subset-buttons {
    width: 150px;
  }

  &.active {
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
  &.push-right {
    margin-left: auto;
  }
`

const DatastoreSubsetList = ({}: any) => {
  const nav = useNavigate()
  const { currentDatastore, loaderSubsetList } = useRouteLoaderData("org-datastore-view") as {
    currentDatastore: any
    loaderSubsetList: any
  }


  const orgName = useSelector((state: any) => state.org.storeOrgName)

  const { subsetRows } = useDatastore(
    currentDatastore.datastore_id,
    loaderSubsetList,
  )

  useEffect(() => {
    if(subsetRows)
        console.log("subsetRows: ", subsetRows)
}, [subsetRows]);

  const [hover2, setHover2] = useState<boolean>(false)
  const [hover3, setHover3] = useState<boolean>(false)

  const handleMouseOver = (e: any) => {
    switch (e.target.id) {
      case "filter":
        setHover2(true)
        break
      case "new-subset":
        setHover3(true)
        break
      default:
        break
    }
  }
  const handleMouseOut = (e: any) => {
    switch (e.target.id) {
      case "filter":
        setHover2(false)
        break
      case "new-subset":
        setHover3(false)
        break
      default:
        break
    }
  }

  const handleViewSubsetDetails = (subset: any) => {
    console.log(`Viewing subset details for ${subset}`)

    localStorage.setItem("currentSubset", JSON.stringify(subset))
    console.log("path: ", "organization/" + orgName + "/datastore/" + currentDatastore.name + "/subset/" + subset.subsetId)

    nav("/organization/" + orgName + "/datastore/" + currentDatastore.name + "/subset/" + subset.subsetId)
  }
  return (
    <SContainer>
      <SViewHeader>
        <SH2>Subset List</SH2>
        <SButton
          id="filter"
          onMouseOver={(e: any) => handleMouseOver(e)}
          onMouseOut={(e: any) => handleMouseOut(e)}
          className={
            hover2
              ? "active push-right subset-buttons"
              : "push-right subset-buttons"
          }
          onClick={() => nav(-1)}
        >
          {"Filter"}
        </SButton>
        <SButton
          id="new-subset"
          onMouseOver={(e: any) => handleMouseOver(e)}
          onMouseOut={(e: any) => handleMouseOut(e)}
          className={hover3 ? "active subset-buttons" : "subset-buttons"}
          onClick={() => nav(-1)}
        >
          {"+ New Subset"}
        </SButton>
      </SViewHeader>
      <SListContainer>
        <SUserRow className={"th subset-table-header"}>
          <SFieldValue className="long">Subset ID</SFieldValue>
          <SFieldValue className="short">Cohort</SFieldValue>
          <SFieldValue className="short">Level</SFieldValue>
          <SFieldValue className="">School</SFieldValue>
          <SFieldValue className="short">Date</SFieldValue>
          <SFieldValue className="short">Group</SFieldValue>
          <SFieldValue className="">Facilitator</SFieldValue>
          <SFieldValue className="">Type</SFieldValue>
          <SFieldValue className="short">Ready</SFieldValue>
          <SFieldValue className="">View</SFieldValue>
        </SUserRow>

        {subsetRows.map((subset: any) => (
          <SUserRow key={subset.id}>
            <SFieldValue className="long">{subset.subsetId}</SFieldValue>
            <SFieldValue className="short">{subset.cohort}</SFieldValue>
            <SFieldValue className="short">{subset.level}</SFieldValue>
            <SFieldValue className="">{subset.school}</SFieldValue>
            <SFieldValue className="short">{subset.date}</SFieldValue>
            <SFieldValue className="short">{subset.group}</SFieldValue>
            <SFieldValue className="">{subset.facilitator}</SFieldValue>
            <SFieldValue className="">{subset.type}</SFieldValue>

            <SFieldValue className="short">
              <SIcon className={"not-ready"} icon={faX} />
            </SFieldValue>
            <SFieldValue className="">
              <SLink onClick={() => handleViewSubsetDetails(subset)}>
                View Details
              </SLink>
            </SFieldValue>
          </SUserRow>
        ))}
      </SListContainer>
    </SContainer>
  )
}

export default DatastoreSubsetList
