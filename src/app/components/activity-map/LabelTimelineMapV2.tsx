import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers"
import LabelTimelineComponent from "./LabelTimelineComponent"
import ActionTimeline from "./ActionTimeline"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
  padding: 40px;
  grid-area: map;

`

const SParticipant = styled.p`
  
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

const LabelTimelineMapV2 = ({ annotationArr, handleVideoSkipTime, actionsList, participantsList }: any) => {

  const [participants, setParticipants] = useState<any[]>([])
  const [actions, setActions] = useState<any[]>([])

  useEffect(() => {
    const init = () => {

    }
    return init()
  }, [])

  useEffect(() => {
    const init = () => {
      updateParticipantsList(participantsList)
    }
    return init()
  }, [participantsList]);

  useEffect(() => {
    const init = () => {
      updateActionsList(actionsList)
    }
    return init()
  }, [actionsList]);

  const updateParticipantsList = (activeParticipants: any[]) => {
    setParticipants(activeParticipants.filter((p: any) => p.toggle === true))
  }

  const updateActionsList = (activeActions: any[]) => {
    setActions(activeActions.filter((a: any) => a.toggle === true))
  }

  return (
    <SContainer>
      {
        participants.map((participant: any, index: number) => {
          return (
            <div key={index}>
            <SParticipant>{participant.title}</SParticipant>

            {actions.map((action: any, index: number, array: any) => {

      
                return (
                  <ActionTimeline
                    key={index}
                    action={action.action}
                  />
                )
              
              
            })}
</div>
          )
      })
    }
    </SContainer>
  )
}

export default LabelTimelineMapV2
