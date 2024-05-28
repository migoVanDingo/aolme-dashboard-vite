import React from "react"
import Timeline from "./Timeline"
import styled from "styled-components"
import { SFlexRow } from "../common/containers/FlexContainers"

const SContainer = styled(SFlexRow)`

    width: 100%;
    height: 20px;
`

const ActionTimeline = ({ action, color }: any) => {
  const duration = null
  const sequences: any = []

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
