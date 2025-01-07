import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import CreateButton from "../../../common/buttons/CreateButton"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import Constant from "../../../../utility/constant"
import Routes from "../../../../../constants/routes"

const SContainer = styled.div`
  grid-area: store;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "store-header"
    "store-list";

  border-right: 1px solid ${({ theme }) => theme.color.color_3};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
`

const SHeader = styled(SFlexRow)`
  grid-area: store-header;
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
  grid-area: store-list;
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
  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
    color: ${({ theme }) => theme.color.color_8};
    cursor: pointer;
  }
  &.table-head {
    height: 40px;
    &:hover {
        color: ${({ theme }) => theme.color.color_5};
        background-color: ${({ theme }) => theme.color.color_2};
        cursor: default;
    }
  }

  &.active {
    background-color: ${({ theme }) => theme.accent.color.light_blue};
    color: ${({ theme }) => theme.color.color_8};
    
    &:hover {
      background-color: ${({ theme }) => theme.accent.color.light_blue};
      color: ${({ theme }) => theme.color.color_8};
    }
  }
`

const SRowCell = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  font-weight: 500;
  padding: 10px;
  font-size: 0.8rem;
  color: inherit;
  background-color: inherit;

  align-items: center;
`

const ProStoreComp = ({
  datastoreList,
  selectedDatastore,
  setSelectedDatastore,
}: any) => {
  const nav = useNavigate()

  const handleSelect = (store: any) => {
    localStorage.setItem("datastoreId", store.datastore_id)
    setSelectedDatastore(store.datastore_id)
  }

  const handleClick = () => {
    nav(Routes.PROFILE_DATASTORE_CREATE)
  }

  return (
    <SContainer>
      <SHeader>
        <SHeading>Datastore</SHeading>{" "}
        <CreateButton
          className={"create-new sm"}
          innerHtml={"New Datastore"}
          icon={faPlus}
          handleClick={handleClick}
        />{" "}
      </SHeader>

      <SListContainer>
        <SListRow className="table-head">
          <SRowCell>Name</SRowCell>

          <SRowCell>Last Updated</SRowCell>
        </SListRow>

        <SList>
          {datastoreList && datastoreList.length >= 0 ? (
            datastoreList.map((store: any, index: number) => {
              return (
                <SListRow
                  onClick={() => handleSelect(store)}
                  className={
                    selectedDatastore === store.datastore_id ? "active" : ""
                  }
                  key={index}
                >
                  <SRowCell>{store.name}</SRowCell>
                  <SRowCell>{store.updated_at}</SRowCell>
                </SListRow>
              )
            })
          ) : (
            <div>No Datastores</div>
          )}
        </SList>
      </SListContainer>
    </SContainer>
  )
}

export default ProStoreComp
