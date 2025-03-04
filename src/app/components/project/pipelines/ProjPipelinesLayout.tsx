import React from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../../common/containers/FlexContainers'
import Paragraph from '../../common/Paragraph'
import Heading from '../../common/Heading'
import DataTable from '../../common/DataTable'
import CreateButton from '../../common/buttons/CreateButton'

const SContainer = styled.div`
  width: 100%;
  min-height: calc(calc(100vh - ${({ theme }) => theme.header.height}) - 125px);
  padding: 2rem 3rem;

  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-template-rows: 1fr;
  gap: 1rem;
  grid-template-areas: "info list ";

`

const SInfoContainer = styled(SFlexCol)`

  grid-area: info;
  
`

const SListContainer = styled(SFlexCol)`
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  overflow: hidden;
  grid-area: list;
`

const SHeadingContainer = styled(SFlexRow)`
  width: 100%;

  padding: 0 0 1rem;
`

const SDescriptionContainer = styled(SFlexCol)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.color_4};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  align-items: flex-start;
`
const columns = [
  { label: "Pipeline Name", key: "name" },
  { label: "Dataset", key: "dataset" },
  { label: "Vector", key: "vector" },
  { label: "Last Updated", key: "lastUpdated" },
  { label: "Last Run", key: "lastRun" }
];

const data = [
  {
    name: "Image Processing",
    dataset: "ImageNet",
    vector: "ResNet-50",
    lastUpdated: "2025-02-20",
    lastRun: "2025-02-22"
  },
  {
    name: "Text Classification",
    dataset: "IMDB Reviews",
    vector: "BERT",
    lastUpdated: "2025-02-18",
    lastRun: "2025-02-21"
  },
  {
    name: "Fraud Detection",
    dataset: "Financial Transactions",
    vector: "XGBoost",
    lastUpdated: "2025-02-15",
    lastRun: "2025-02-19"
  },
  {
    name: "Speech Recognition",
    dataset: "LibriSpeech",
    vector: "DeepSpeech",
    lastUpdated: "2025-02-12",
    lastRun: "2025-02-14"
  },
  {
    name: "Medical Diagnosis",
    dataset: "MIMIC-III",
    vector: "CNN-LSTM",
    lastUpdated: "2025-02-10",
    lastRun: "2025-02-13"
  }
];

const actionLabel = "View Pipeline";
const actionKey = "name";
const actionPath = "/pipeline";

const ProjPipelinesLayout = () => {

  const handleClick = () => {
    console.log("Create new pipeline")
  }
  return (
    <SContainer>
      <SInfoContainer>
        <SDescriptionContainer>
          <Heading heading={"Description"} size={"lg"}/>
          <Paragraph text={"Consequat consectetur culpa labore esse non esse voluptate. Pariatur mollit culpa non magna veniam ad ex. Irure eiusmod exercitation sit est enim duis voluptate cupidatat id ut. Quis sunt ipsum deserunt laboris aute consectetur consequat et id non. Pariatur ea officia aute enim id eu. Cupidatat aliquip in fugiat velit laborum."} />
        </SDescriptionContainer>
      </SInfoContainer>
        <SListContainer>
          <SHeadingContainer>
            <Heading heading={"Pipelines"} size={"md"} /> 
            <CreateButton className={"create-new push-right md"} innerHtml={"New Pipeline"} handleClick={handleClick}/>
          </SHeadingContainer>
          <DataTable 
            columns={columns} 
            data={data} 
            actionLabel={actionLabel} 
            actionKey={actionKey} 
            actionPath={actionPath}
            rowPadding={"p-sm"}
            border={"border"}
            borderRad={"br-md"}
          />
        </SListContainer>

    </SContainer>
  )
}

export default ProjPipelinesLayout