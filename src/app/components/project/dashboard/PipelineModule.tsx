import React from "react"
import styled from "styled-components"
import FilesModule from "../files/FilesModule"
import ProjectInfoModule from "./ProjectInfoModule"
import { SFlexRow } from "../../common/containers/FlexContainers"
import Heading from "../../common/Heading"
import DataTable from "../../common/DataTable"
import CreateButton from "../../common/buttons/CreateButton"
const SContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: pipeline;
  display: grid;
  box-shadow: 0px 3px 8px ${({ theme }) => theme.color.color_0};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.color.color_3};
`

const SCardTop = styled(SFlexRow)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  padding: 1rem;
  gap: 5px;
`
const SCardBottom = styled.div`

  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  overflow: hidden;
`
const users = [
  { name: "Alice", age: 25, location: "New York", id: 1 },
  { name: "Bob", age: 30, location: "San Francisco", id: 2 },
]

const columns = [{ label: "Name", key: "name" }, { label: "Age", key: "age" }, { label: "Location", key: "location" }]

const PipelineModule = () => {
  return (
    <SContainer>
      <SCardTop>
        <Heading heading={"Pipeline"} size={"md"} />

        <CreateButton className={"view push-right"} innerHtml={"View All"}/>
      </SCardTop>
      <SCardBottom>
        <DataTable
          columns={columns}
          data={users}
          actionLabel="View Profile"
          actionKey="id"
          actionPath="/profile"
        />
      </SCardBottom>
    </SContainer>
  )
}

export default PipelineModule
