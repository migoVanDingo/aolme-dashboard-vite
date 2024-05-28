import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Subset from "./subset/Subset"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { DatasetAPI } from "../../api/DatasetAPI"

const SContainer = styled(SFlexCol)`
  width: 1100px;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
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

const ViewDataset = ({ hideView, viewId, dataset, repo }: any) => {


  const [buttonHover, setButtonHover] = useState<boolean>(false)
  const [subsets, setSubsets] = useState<any[]>([])

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
      if (subsets.length === 0) {
        loadSubsets()
      }
    }

    return init()
  }, [])

  useEffect(() => {
    loadSubsets()
  }, [trigger])

  const loadSubsets = () => {
    DatasetAPI.getSubsetListByDatasetId(dataset.dataset_id)
      .then((res: any) => {
        console.log("SUBSETS: ", res)
        setSubsets(res.data)
      })
      .catch((err: any) => console.log(err))
  }

  return (
    <SContainer className={repo ? "repo":""}>
      {!isNewSubsetActive && (
        <>
          <SButton
            className={buttonHover ? "hover" : ""}
            onClick={hideView}
            onMouseOver={hoverOn}
            onMouseLeave={hoverOff}
          >
            <SIcon className={buttonHover ? "hover" : ""} icon={faArrowLeft} />
            Back to Datasets
          </SButton>
          <SDsHeading>{dataset.name}</SDsHeading>
          <SLastUpdated>ID: {dataset.dataset_id}</SLastUpdated>

          <SPara>{dataset.description}</SPara>
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
