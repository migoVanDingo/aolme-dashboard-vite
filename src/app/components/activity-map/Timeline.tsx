import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../common/containers/FlexContainers"
import Moment from "./Moment"
const SContainer = styled(SFlexCol)`
    width: 1200px;
    height: 300px;
    border: 1px solid ${({ theme }) => theme.color.color_5};

    padding: 30px;
`

const STimeline = styled(SFlexRow)`
  width: 1000px;
  height: 3px;
  background-color: ${({ theme }) => theme.color.color_8};
  border-radius: 4px;
  z-index: 1;
  position: relative;
`



const Timeline = ({ duration, ranges }: any) => {
  const [timelineWidth, setTimelineWidth] = useState<number>(0)
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const init = () => {
      calculateValues()
    }
    return init()
  }, [])

  useEffect(() => {
    const init = () => {
      calculateValues()
    }
    return init()
  }, [duration, ranges])

  const calculateValues = () => {
    const timeline = document.getElementById("timeline")
    const timelineItem = document.getElementById("timeline-item")

    if (timeline && duration !== 0 && ranges.length > 0) {
      const ratio = timelineWidth / duration
      const adjustedStart = ranges[0][0] * ratio
      const adjustedEnd = ranges[0][1] * ratio
      const adjustedWidth = adjustedEnd - adjustedStart

      console.log("adjustedStart", adjustedStart)
      console.log("adjustedEnd", adjustedEnd)
      console.log("adjustedWidth", adjustedWidth)

      setStart(adjustedStart)
      setEnd(adjustedEnd)
      setWidth(adjustedWidth)

      setTimelineWidth(timeline.clientWidth)
    }
  }

  const handleClickStart = () => {
    console.log("start", ranges[0][0] / 30 + " seconds")
  }

  const handleClickEnd = () => {
    console.log("end", ranges[0][1] / 30 + " seconds")
  }

  return (
    <STimeline id="timeline">
        <Moment 
            start={start} 
            end={end} 
            width={width} 
            handleClickStart={handleClickStart} 
            handleClickEnd={handleClickEnd} 
        />
    </STimeline>
  )
}

export default Timeline
