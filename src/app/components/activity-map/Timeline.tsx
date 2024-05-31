import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../common/containers/FlexContainers"
import Moment from "./Moment"
const SContainer = styled(SFlexCol)`
  width: 1200px;
  height: 300px;
  border: 1px solid ${({ theme }) => theme.color.color_5};

  padding: 0px;
`

const STimeline = styled(SFlexRow)`
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.color.color_5};
  border-radius: 4px;
  z-index: 1;
  position: relative;
`

const Timeline = ({ duration, sequences, color, handleVideoSkipTime}: any) => {
  const [timelineWidth, setTimelineWidth] = useState<number>(0)
  /*   const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(0)
  const [width, setWidth] = useState<number>(0) */
  const [moments, setMoments] = useState<any[]>([])

  useEffect(() => {
    const init = () => {
      const values = calculateValues()
      //console.log("Timeline1::values: ", values)
      setMoments(values)
    }
    return init()
  }, [])

  useEffect(() => {
    const init = () => {
      const values = calculateValues()
      //console.log("Timeline2::values: ", values)
      setMoments(values)
    }
    return init()
    console.log("Timeline::duration", duration)
    console.log("Timeline::sequences", sequences)
  }, [duration, sequences])

  const calculateValues = () => {
    // console.log("Timeline::duration", duration)
    // console.log("Timeline::sequences", sequences)
    const timeline = document.getElementById("timeline")
    const timelineItem = document.getElementById("timeline-item")

    if (timeline && duration !== 0 && sequences.length > 0) {
      const ratio = timeline.clientWidth / duration
      let moments = []
      for(let i = 0; i < sequences.length; i +=2){
        const start = sequences[i]["time"] * ratio
        const end = sequences[i+1]["time"] * ratio
        const width = end - start
        console.log("start: ", start)
        console.log("end: ", end)
        console.log("width: ", width)
        moments.push({ start, end, width, ratio })

      }

      return moments

/* 
      return sequences.map((sequence: any, index: number) => {
        //console.log("loop::sequence::index: " + index + " :: seq: ", sequence)
        const start = sequence[0]["time"] * ratio
        const end = sequence[1]["time"] * ratio

        const width = end - start

        return { start, end, width, ratio }
      }) */
    } else {
      return []
    }
  }

  const handleClickStart = (value: number) => {
    console.log("start: ", value * (1 / moments[0].ratio) + " seconds")
    handleVideoSkipTime(value * (1 / moments[0].ratio))
  }

  const handleClickEnd = (value: number) => {
    console.log("end: ", value * (1 / moments[0].ratio) + " seconds")
    handleVideoSkipTime(value * (1 / moments[0].ratio))
  }

  return (
    <STimeline id="timeline">
      {moments &&
        moments.length > 0 &&
        moments.map((moment: any, index: number) => {
          return (
            <Moment
              key={index}
              start={moment.start}
              end={moment.end}
              width={moment.width}
              handleClickStart={() => handleClickStart(moment.start)}
              color={color}
              handleClickEnd={() => handleClickEnd(moment.end)}
            />
          )
        })}
    </STimeline>
  )
}

export default Timeline

/* const calculateValues = () => {
    const timeline = document.getElementById("timeline")
    const timelineItem = document.getElementById("timeline-item")

    if (timeline && duration !== 0 && sequences.length > 0) {
      const ratio = timelineWidth / duration
      const adjustedStart = sequences[0][0] * ratio
      const adjustedEnd = sequences[0][1] * ratio
      const adjustedWidth = adjustedEnd - adjustedStart

      console.log("adjustedStart", adjustedStart)
      console.log("adjustedEnd", adjustedEnd)
      console.log("adjustedWidth", adjustedWidth)

      setStart(adjustedStart)
      setEnd(adjustedEnd)
      setWidth(adjustedWidth)

      setTimelineWidth(timeline.clientWidth)
    }
  } */

/* const handleClickStart = () => {
    console.log("start", sequences[0][0] / 30 + " seconds")
  }

  const handleClickEnd = () => {
    console.log("end", sequences[0][1] / 30 + " seconds")
  } */
