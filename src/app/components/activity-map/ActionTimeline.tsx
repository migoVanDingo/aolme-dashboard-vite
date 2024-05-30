import React, { useEffect } from "react"
import Timeline from "./Timeline"
import styled from "styled-components"
import { SFlexRow } from "../common/containers/FlexContainers"

const SContainer = styled(SFlexRow)`

    width: 100%;
    margin-bottom: 15px;
`

const ActionTimeline = ({ action, color, annotationArr }: any) => {
  
  const [sequences, setSequences] = React.useState<any[]>([])
  const [duration, setDuration] = React.useState<number>(0)



  useEffect(() => {
    const init = () => {
      //console.log("ActionTimeline::annotationArr: ", annotationArr)
      handleSetValues(annotationArr)
    }

    
    return init()
  }, [annotationArr])

  const handleSetValues = (annotation: any) => {
    console.log("ActionTimeline::handleSetValues::annotation: ", annotation.annotation)
    setDuration(annotation.annotation.frames)
    setSequences(annotation.annotation.sequences)

  }


  const handleVideoSkipTime = (time: number) => {}
  return (
    <SContainer>
      <Timeline
        handleVideoSkipTime={handleVideoSkipTime}
        duration={duration}
        sequences={sequences}
        color={color}
      />
    </SContainer>
  )
}

export default ActionTimeline
