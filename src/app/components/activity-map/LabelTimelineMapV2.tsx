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
  height: auto;
  align-items: flex-start;

`

const colors = [
  { action: "talking", color: "#FF0000" },
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
  const [filteredAnnotations, setFilteredAnnotations] = useState<any[]>([])

  useEffect(() => {
    const init = () => {
     handleFilterParticipants(annotationArr, participantsList)
    }
   
    return init()
  }, [annotationArr])

  useEffect(() => {
    const init = () => {
      updateActionsList(actionsList)
    }
    return init()
  }, [actionsList])
  

  useEffect(() => {
    const init = () => {
      updateParticipantsList(participantsList)
    }
    return init()
  }, [participantsList])


  const handleFilterParticipants = (annotationArr: any[], participantsList: any[]) => {

    let filteredAnnotations: any = []
    participantsList.forEach((participant: any) => {
      annotationArr.map((annotationList: any) => {
        //console.log('al', annotationList)
        annotationList.annotations.map((annotation: any) => {
          // console.log('annotation', annotation)
          // console.log('participant', participant.title)
          if(annotation.label == participant.title) 
             filteredAnnotations.push({ participant: annotation.label, type: annotationList.type, annotation})
          })
      })
    })

    //console.log('filteredAnnotations', filteredAnnotations)
    setFilteredAnnotations(filteredAnnotations)
  }

  const updateParticipantsList = (activeParticipants: any[]) => {
    setParticipants(activeParticipants.filter((p: any) => p.toggle === true))
  }

  const updateActionsList = (activeActions: any[]) => {
    setActions(activeActions.filter((a: any) => a.toggle === true))
  }

  const handleGetValues = (action: any, participant: any) => {
    
    return filteredAnnotations.filter((anno: any) => anno.type === action.action.toLowerCase() && participant.title === anno.participant)[0]
  }

  return (
    <SContainer className={layout}>
      <SHeading>Activity Map</SHeading>
      
      {participants.map((participant: any, index: number) => {
        return (
          <STimelineContainer key={index}>
            <SParticipant>{participant.title}</SParticipant>

            {actions.map((action: any, index: number, array: any) => {
              const values = handleGetValues(action, participant)
              if(values === undefined) return
              return (<ActionTimeline key={index} action={action.action} color={action.action.toLowerCase() === "talking" ? "red" : action.action.toLowerCase() === "typing" ? "blue" : "green"} annotationArr={values}/>)
            })}
          </STimelineContainer>
        )
      })}

    </SContainer>
  )
}

export default LabelTimelineMapV2
