import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
const SContainer = styled.div`
  width: 99%;
  height: 250px;
  padding: 0;
  margin-bottom: 20px;
  overflow: hidden;

  box-shadow: 5px 5px 10px ${({ theme }) => theme.color.color_1};
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};
  position: relative;
  top: 0;
  transition: all 0.4s ease;
  border: 1px solid ${({ theme }) => theme.color.color_3};
  display: grid;
  grid-template-rows: 1fr 4fr;
  grid-template-areas:
    "top"
    "bottom";

  &:hover {
    top: -5px;
  }
`

const SCardTop = styled(SFlexCol)`
  grid-area: top;
  width: 100%;
  height: 100%;
  padding: 5px 15px 5px;
  margin: 0;
  align-items: baseline;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.color_1};
`

const SCardBottom = styled(SFlexCol)`
  grid-area: bottom;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  align-items: baseline;
  padding: 5px 15px 5px;
  background-color: ${({ theme }) => theme.color.color_2_5};
`
const SDatastoreCardHeader = styled(SFlexRow)`
  width: 100%;
  height: 50px;

  margin-bottom: 0px;
  align-items: center;
  justify-content: space-between;
  padding: 0;
`
const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  margin-bottom: 0px;
  padding: 0;
  margin: 0;
  &:hover {
    color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`
const SButton = styled.button`
  background-color: ${({ theme }) => theme.color.color_1};
  color: ${({ theme }) => theme.color.color_6};
  font-size: 1rem;
  font-weight: 200;

  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  padding: 15px;
  cursor: pointer;
  transition: 0.3s;

  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.color.color_2};
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_2};
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
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
const SSubHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  margin-bottom: 0px;
  padding: 0;
  text-align: justify;
`
const SDescription = styled.p`
  font-size: 1rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  margin: 0px;
  padding: 0;
  text-align: justify;
`

const DatasetCard = ({ dataset, handleSelect }: any) => {
  const handleSelectItem = (id: string) => {
    handleSelect(id)
  }

  return (
    <SContainer>
      <SCardTop>
        <SDatastoreCardHeader>
          <SHeading onClick={() => handleSelectItem(dataset.dataset_id)}>
            {"Dataset Name: " + dataset.name}
          </SHeading>
          <SButton onClick={() => handleSelectItem(dataset.dataset_id)}>View Files</SButton>
        </SDatastoreCardHeader>
        <SMeta>Datastore ID: {dataset.dataset_id}</SMeta>
      </SCardTop>

      <SCardBottom>
        <SSubHeading>Description</SSubHeading>
        <SDescription>{dataset.description}</SDescription>
      </SCardBottom>
    </SContainer>
  )
}

export default DatasetCard
