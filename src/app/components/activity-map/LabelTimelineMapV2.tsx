import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers"
import LabelTimelineComponent from "./LabelTimelineComponent"
import ActionTimeline from "./ActionTimeline"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
  padding:  40px;
  grid-area: map;
  align-items: flex-start;

  min-height: 200px;


  border: 1px solid ${({ theme }) => theme.color.color_5};
  
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};

  &.layout-1{
    margin: 10px 0 0 20px;
  }

  &.layout-2{
    margin: 10px 0;
  }
  
  
  
`

const SParticipant = styled.p`
  width: 100%;

  
`

const SHeading = styled.h2`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color.color_6};
  margin: 0;
  padding: 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_2_5};
`

const STimelineContainer = styled(SFlexCol)`
  width: 100%;
  align-items: flex-start;
  overflow-y: auto;
`

const colors = [
  { color: "#FF0000" },
  { color: "#00FF00" },
  { color: "#0000FF" },
  { color: "#FFFF00" },
  { color: "#FF00FF" },
  { color: "#00FFFF" },
  { color: "#FFA500" },
  { color: "#800080" },
  { color: "#008000" },
  { color: "#800000" },
  { color: "#008080" },
  { color: "#808000" },
  { color: "#C0C0C0" },
  { color: "#808080" },
  { color: "#000080" },
  { color: "#FFD700" },
  { color: "#A52A2A" },
  { color: "#800000" },
  { color: "#FF6347" },
  { color: "#40E0D0" },
]

const LabelTimelineMapV2 = ({
  annotationArr,
  handleVideoSkipTime,
  actionsList,
  participantsList,
  layout
}: any) => {
  const [participants, setParticipants] = useState<any[]>([])
  const [actions, setActions] = useState<any[]>([])

  useEffect(() => {
    const init = () => {}
    return init()
  }, [])

  useEffect(() => {
    const init = () => {
      updateParticipantsList(participantsList)
    }
    return init()
  }, [participantsList])

  useEffect(() => {
    const init = () => {
      updateActionsList(actionsList)
    }
    return init()
  }, [actionsList])

  const updateParticipantsList = (activeParticipants: any[]) => {
    setParticipants(activeParticipants.filter((p: any) => p.toggle === true))
  }

  const updateActionsList = (activeActions: any[]) => {
    setActions(activeActions.filter((a: any) => a.toggle === true))
  }

  return (
    <SContainer className={layout}>
      <SHeading>Activity Map</SHeading>
      
      {participants.map((participant: any, index: number) => {
        return (
          <STimelineContainer key={index}>
            <SParticipant>{participant.title}</SParticipant>

            {actions.map((action: any, index: number, array: any) => {
              return (<ActionTimeline key={index} action={action.action} color={colors[index]} />)
            })}
          </STimelineContainer>
        )
      })}

    </SContainer>
  )
}

export default LabelTimelineMapV2
