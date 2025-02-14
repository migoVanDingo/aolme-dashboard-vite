import {
  faCheckCircle,
  faLightbulb,
  faScissors,
  faUsersBetweenLines,
  faVectorSquare,
  faVideo,
  faX,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import styled from "styled-components"
import { useSubsetItems } from "../../../hooks/useSubsetItems"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import { SUserRow } from "../../styled/SOrganization"

const SContainer = styled(SFlexCol)`
  width: 100%;
  align-items: flex-start;
  margin-top: 20px;
  padding: 50px 40px;

  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  background-color: ${({ theme }) => theme.color.color_2_5};
  box-shadow: 5px 5px 8px ${({ theme }) => theme.color.color_1};
  position: relative;
`

const SMenuButtonContainer = styled(SFlexRow)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  position: absolute;
  top: 20px;
  right: 40px;
  padding: 0;
  gap: 10px;
`

const SMenuButton = styled.button`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.color_4};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  background-color: ${({ theme }) => theme.color.color_2_5};
  color: ${({ theme }) => theme.color.color_6};
  font-size: 0.9rem;
  font-weight: 300;
  width: 220px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_2};
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({theme}) => theme.accent.color_1};
  }
`

const SHeading = styled.h1`
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  margin-bottom: 0px;
  padding: 0;
  margin: 0;

  &.h1 {
    font-size: 1.8rem;
  }

  &.h2 {
    font-size: 1.5rem;
    margin-top: 15px;
  }
`
const SSubsetHeader = styled(SFlexRow)`
  width: 100%;
  align-items: flex-start;
  margin: 20px 0px;
  padding: 5px 0;
  border-top: 1px solid ${({ theme }) => theme.color.color_4};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_4};
  gap: 40px;
`

const SSubsetHeaderItem = styled(SFlexRow)`
  align-items: flex-start;
  margin-top: 0px;
  padding: 0px;
`

const SSubsetDetails = styled(SFlexRow)`
  width: 100%;
  align-items: center;
  margin: 20px 0px;
  padding: 20px;

  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  background-color: ${({ theme }) => theme.color.color_1};
  gap: 40px;
  box-shadow: 5px 5px 10px ${({ theme }) => theme.color.color_1};
`
const SSubsetDetailsItem = styled(SFlexRow)`
  align-items: center;
  margin-top: 0px;
  padding: 0px;

  gap: 5px;
`

const SIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;

  margin-right: 5px;
  margin-left: 5px;

  &.accent {
    color: ${({ theme }) => theme.accent.color_1};
  }

  &.ready {
    color: green;
  }

  &.not-ready {
    color: red;
  }
`

const SFlexColContainer = styled(SFlexCol)`
  padding: 0;
  margin: 20px 0;
  width: 100%;
  gap: 15px;
`
const SFilesHeading = styled.h3`
  font-size: 1rem;
  font-weight: 200;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.color.color_6};
`

const SFilesContainer = styled(SFlexCol)`
  border: 1px solid ${({ theme }) => theme.color.color_3};
  width: 100%;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_3};
  box-shadow: 2px 2px 4px ${({ theme }) => theme.color.shadow.dark};
`

const SFieldValue = styled(SFlexRow)`
  width: 300px;
  padding: 10px;
  box-sizing: border-box;

  transition: all 0.3s ease;
  color: ${({ theme }) => theme.color.color_5};
  font-size: 0.9rem;
  font-weight: 300;

  &.long {
    min-width: 450px;
  }
`

const DatastoreSubsetDetails = () => {
  const { currentSubset, subsetItems } = useLoaderData() as {
    currentSubset: any
    subsetItems: any
  }

  const {
    uniqueTypes,
    hasROI,
    hasTrims,
    hasPredictions,
    videoCount,
    groundTruthCount,
    hasSessionVideo
  } = useSubsetItems(subsetItems)

  useEffect(() => {
    const init = () => {
      console.log("uniqueTypes: ", uniqueTypes)
    }
    return init()
  }, [uniqueTypes])

  const handlLabelGroundTruth = () => {
    console.log("NOT IMPLMENETED: Label Ground Truth")
  }

  return (
    <SContainer>
      <SMenuButtonContainer>
        <SMenuButton onClick={handlLabelGroundTruth}>
          Label Ground Truth <SIcon icon={faVectorSquare} />
        </SMenuButton>
        <SMenuButton>
          Label ROI <SIcon icon={faUsersBetweenLines} />
        </SMenuButton>
        <SMenuButton>
          Generate Trims <SIcon icon={faScissors} />
        </SMenuButton>
      </SMenuButtonContainer>
      <SHeading className={"h1"}>Subset</SHeading>
      <SSubsetHeader>
        <SSubsetHeaderItem>Date: {currentSubset.date}</SSubsetHeaderItem>
        <SSubsetHeaderItem>Cohort: {currentSubset.cohort}</SSubsetHeaderItem>
        <SSubsetHeaderItem>Level: {currentSubset.level}</SSubsetHeaderItem>
        <SSubsetHeaderItem>School: {currentSubset.school}</SSubsetHeaderItem>
        <SSubsetHeaderItem>
          Facilitator: {currentSubset.facilitator}
        </SSubsetHeaderItem>
        <SSubsetHeaderItem>Group: {currentSubset.group}</SSubsetHeaderItem>
        <SSubsetHeaderItem>Type: {currentSubset.type}</SSubsetHeaderItem>
      </SSubsetHeader>

      <SHeading className={"h2"}>Details</SHeading>

      <SSubsetDetails>
        <SSubsetDetailsItem>
          <b>Videos</b>
          <SIcon icon={faVideo} />: {videoCount}
        </SSubsetDetailsItem>

        <SSubsetDetailsItem>
          <b>Ground Truth</b>
          <SIcon icon={faVectorSquare} />: {groundTruthCount} / {videoCount}
        </SSubsetDetailsItem>

        <SSubsetDetailsItem>
          <b>Session Video</b>
          {hasSessionVideo ? (
            <SIcon icon={faCheckCircle} className={"ready"} />
          ) : (
            <SIcon icon={faX} className={"not-ready"} />
          )}

        </SSubsetDetailsItem>

        <SSubsetDetailsItem>
          <b>ROI</b>
          <SIcon icon={faUsersBetweenLines} />:{" "}
          {hasROI ? (
            <SIcon icon={faCheckCircle} className={"ready"} />
          ) : (
            <SIcon icon={faX} className={"not-ready"} />
          )}
        </SSubsetDetailsItem>

        <SSubsetDetailsItem>
          <b>Trims</b>
          <SIcon icon={faScissors} />:{" "}
          {hasTrims ? (
            <SIcon icon={faCheckCircle} className={"ready"} />
          ) : (
            <SIcon icon={faX} className={"not-ready"} />
          )}
        </SSubsetDetailsItem>

        <SSubsetDetailsItem>
          <b>Predictions</b>
          <SIcon icon={faLightbulb} />:{" "}
          {hasPredictions ? (
            <SIcon icon={faCheckCircle} className={"ready"} />
          ) : (
            <SIcon icon={faX} className={"not-ready"} />
          )}
        </SSubsetDetailsItem>
      </SSubsetDetails>

      <SHeading className={"h2"}>Files</SHeading>

      <SFlexColContainer>
        {uniqueTypes.map((type: any, index: number) => {
          return (
            <SFilesContainer>
              <SFilesHeading>{type.toUpperCase()}</SFilesHeading>

              <SUserRow className="th subset-table-header">
                <SFieldValue>Item ID</SFieldValue>
                <SFieldValue className="long">Name</SFieldValue>
                <SFieldValue>Type</SFieldValue>
              </SUserRow>
              {subsetItems.map((file: any, index: number) => {
                if (file.type === type) {
                  return (
                    <SUserRow
                      className={"th subset-table-bottom"}
                      key={file.ds_subset_item_id}
                    >
                      <SFieldValue>{file.ds_subset_item_id}</SFieldValue>
                      <SFieldValue className="long">{file.name}</SFieldValue>
                      <SFieldValue>{file.type}</SFieldValue>
                    </SUserRow>
                  )
                }
              })}
            </SFilesContainer>
          )
        })}
      </SFlexColContainer>
    </SContainer>
  )
}
export default DatastoreSubsetDetails

export const loader = async () => {
  const currentDatastore = JSON.parse(
    sessionStorage.getItem("currentDatastore") as any,
  )
  const currentSubset = JSON.parse(sessionStorage.getItem("currentSubset") as any)

  //const subsetItems = await DatastoreAPI.getSubsetItems(currentSubset.subsetId)

  //console.log("subsetItems: ", subsetItems)

  return {
    currentDatastore,
    currentSubset,
    //subsetItems,
  }
}
