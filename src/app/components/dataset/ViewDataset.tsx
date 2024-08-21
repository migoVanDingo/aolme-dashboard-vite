import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { DatasetAPI } from "../../api/DatasetAPI"
import { SFlexCol } from "../common/containers/FlexContainers"
import Subset from "./subset/Subset"
import { useLoaderData, useNavigate } from "react-router-dom"

const SContainer = styled(SFlexCol)`
  width: 1100px;
  min-height: calc(100vh - 100px);
  align-items: flex-start;

  padding: 50px;
  box-sizing: border-box;



  &.repo{
    width: 100%;
  }

`

const SDsHeading = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  margin: 20px 0 5px;
  color: ${({ theme }) => theme.color.color_6};
`

const SPara = styled.p`
  font-size: 1rem;
  font-weight: 200;
  margin: 20px 0;
  text-align: left;
  color: ${({ theme }) => theme.color.color_6};
  line-height: 25px;
`

const SButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.color.color_6};
  border: 1px solid ${({ theme }) => theme.color.color_6};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  height: 30px;
  width: 200px;
  gap: 5px;
  margin-bottom: 30px;

  &.subset {
    margin-left: auto;
  }

  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`
const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.color_6};

  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
  }
`

const SLastUpdated = styled.p`
  padding: 0;
  margin: 5px 0 0 0;
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_5};
`

const ViewDataset = ({ hideView, viewId, repo }: any) => {

  const { selectedDataset, selectedSubsets } = useLoaderData() as any
  const nav = useNavigate()


  const [buttonHover, setButtonHover] = useState<boolean>(false)
  const [dataset, setDataset] = useState<any>(selectedDataset)
  const [subsets, setSubsets] = useState<any[]>(selectedSubsets)

  const hoverOn = () => setButtonHover(true)
  const hoverOff = () => setButtonHover(false)

  const [isNewSubsetActive, setNewSubsetActive] = useState<boolean>(false)
  const [trigger, setTrigger] = useState<boolean>(false)
  const triggerRender = () => setTrigger(!trigger)

  const createViewActive = () => {
    hoverOffButton()
    hoverOff()
    setNewSubsetActive(true)
  }
  const createViewInactive = () => setNewSubsetActive(false)

  const [isHoverButton, setHoverButton] = useState<boolean>(false)
  const hoverOnButton = () => setHoverButton(true)
  const hoverOffButton = () => setHoverButton(false)

  useEffect(() => {
    const init = () => {
      if (!subsets || subsets.length === 0) {
        loadSubsets()
      }
    }

    //return init()
  }, [])

  useEffect(() => {
    loadSubsets()
  }, [trigger])

  const loadSubsets = () => {
    DatasetAPI.getSubsetListByDatasetId(selectedDataset.dataset_id)
      .then((res: any) => {
        setSubsets(res)
      })
      .catch((err: any) => console.log(err))
  }

  const handleGoBack = () => {
    nav(-1)
  }

  return (
    <SContainer className={repo ? "repo":""}>
      {!isNewSubsetActive && (
        <>
          <SButton
            className={buttonHover ? "hover" : ""}
            onClick={handleGoBack}
            onMouseOver={hoverOn}
            onMouseLeave={hoverOff}
          >
            <SIcon className={buttonHover ? "hover" : ""} icon={faArrowLeft} />
            Back to Datasets
          </SButton>
          <SDsHeading>{selectedDataset.name}</SDsHeading>
          <SLastUpdated>ID: {selectedDataset.dataset_id}</SLastUpdated>

          <SPara>{selectedDataset.description}</SPara>
        </>
      )}

      <Subset
        isNewSubsetActive={isNewSubsetActive}
        createViewActive={createViewActive}
        createViewInactive={createViewInactive}
        subsets={subsets}
        dataset={dataset}
        triggerRender={triggerRender}
        isHoverButton={isHoverButton}
        hoverOnButton={hoverOnButton}
        hoverOffButton={hoverOffButton}
      />
    </SContainer>
  )
}

export default ViewDataset

export const loader = async () => {
  const selectedDataset = JSON.parse(localStorage.getItem("selectedDataset") as any)
  const subsets = await DatasetAPI.getSubsetListByDatasetId(selectedDataset.dataset_id)

  console.log('selectedDataset: ', selectedDataset)
  console.log('subsets: ', subsets)

  return {
    selectedDataset,
    selectedSubsets: subsets
  }
}
