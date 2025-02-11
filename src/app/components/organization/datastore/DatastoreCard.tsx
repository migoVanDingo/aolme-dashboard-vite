import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import DatastoreCardInfoBar from "./DatastoreCardInfoBar"
import LoadingSpinner from "../../common/loading/LoadingSpinner"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const SContainer = styled(SFlexCol)`
  width: 99%;
  height: 350px;
  padding: 20px 40px 10px;
  overflow-y: auto;
  grid-area: content;
  align-items: baseline;
  box-shadow: 5px 5px 10px ${({ theme }) => theme.color.color_1};
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};
  position: relative;
  top: 0;
  transition: all 0.4s ease;

  &:hover {
    top: -5px;
  }
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
  width: 1400px;
  font-size: 1rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  margin: 0px;
  padding: 0;
  text-align: justify;
`

const SButton = styled.button`
  background-color: ${({ theme }) => theme.color.color_1};
  color: ${({ theme }) => theme.color.color_6};
  font-size: 1rem;
  font-weight: 200;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.color.color_1};
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_2};
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`

const DatastoreCard = ({ orgDatastore }: any) => {
  const [datastore, setDatastore] = useState<any>(orgDatastore)

  const { orgName } = useSelector((state: any) => state.org)
  const nav = useNavigate()


  const handleSelect = () => {
    sessionStorage.setItem("currentDatastore", JSON.stringify(datastore))
    nav("/organization/"+orgName+"/datastore/"+datastore.name)
  }

  return (
    <SContainer>
      <SDatastoreCardHeader>
        <SHeading
          onClick={handleSelect}
        >
          {datastore.name}
        </SHeading>
        <SButton
          onClick={handleSelect}
        >
          Enter Datastore
        </SButton>
      </SDatastoreCardHeader>
      <SMeta>Datastore ID: {datastore.datastore_id}</SMeta>
      <SSubHeading>Description</SSubHeading>
      <SDescription>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
        harum ullam incidunt aspernatur, suscipit, libero cupiditate molestias
        ut reiciendis perspiciatis exercitationem vitae facilis tenetur
        consectetur? Laborum, veniam. Vero, atque dolores. Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Iure dolorem beatae natus
        exercitationem eligendi minus cum ullam officiis asperiores, accusantium
        quos id a quae accusamus aut tempore consequatur voluptatum commodi!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum quasi
        repellat suscipit. Aspernatur quo quasi eos incidunt aut libero, omnis
        dolore ratione voluptatibus esse, expedita inventore explicabo delectus,
        facilis suscipit?
      </SDescription>

      <DatastoreCardInfoBar />
    </SContainer>
  )
}

export default DatastoreCard
