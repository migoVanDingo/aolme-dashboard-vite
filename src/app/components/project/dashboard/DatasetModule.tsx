import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import Heading from "../../common/Heading"
import CreateButton from "../../common/buttons/CreateButton"
import Paragraph from "../../common/Paragraph"
import DataTable from "../../common/DataTable"

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 300px;
  grid-area: dataset;
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
const SInfoContainer = styled(SFlexCol)`
    align-items: flex-start;
    padding: 1rem;

`


const SInline = styled(SFlexRow)`
  gap: 5px;
`
const dataset = {
  name: "Dataset 1",
  description:
    "Tempor dolor in ipsum mollit cupidatat aliqua reprehenderit sint proident sunt. Sit incididunt adipisicing proident duis aliquip sit dolore eiusmod voluptate quis in.",
}

const columns = [{label: "Vector Name", key: "vectorName"}, {label: "Last Used", key: "lastUsed"}, {label: "Last Modified", key: "lastModified"}, {label: "Active Learning", key: "activeLearning"}]
const data = [
  {
    vectorName: "Vector 1",
    lastUsed: "2021-01-01",
    lastModified: "2021-01-01",
    activeLearning: "No",
  },
  {
    vectorName: "Vector 2",
    lastUsed: "2021-01-01",
    lastModified: "2021-01-01",
    activeLearning: "Yes",
  },
]

const actionLabel = "View Vector"
const actionKey = "vectorName"
const actionPath = "/vector"

const DatasetModule = ({}: any) => {
  dataset.name = "Dataset 1"
  return (
    <SContainer>
      <SCardTop>
        <Heading heading={"Dataset"} size={"md"} />
        <CreateButton
          className={"view push-right"}
          innerHtml={"View Dataset"}
        />
      </SCardTop>

      <SCardBottom>
        <SInfoContainer><Heading heading={"Name: " + dataset.name} className={"sm"} />

<Heading
  heading={"Description: " + dataset.description}
  className={"sm"}
/></SInfoContainer>
        
        

        <DataTable 
          columns={columns} 
          data={data} 
          actionLabel={actionLabel} 
          actionKey={actionKey} 
          actionPath={actionPath}
        />
      </SCardBottom>
    </SContainer>
  )
}

export default DatasetModule
