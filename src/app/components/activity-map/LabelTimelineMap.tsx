import React, { useEffect } from "react"
import styled from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers"
import LabelTimelineComponent from "./LabelTimelineComponent"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
  padding: 40px;
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

const LabelTimelineMap = ({ annotationArr, handleVideoSkipTime }: any) => {
  useEffect(() => {
    const init = () => {
      //console.log("LabelTimelineMap::annoArr::", annotationArr)
    }
    return init()
  }, [])
  return (
    <SContainer>
      {annotationArr.map((annotation: any, index: number, array: any) => {
        return (
          <LabelTimelineComponent
            key={index}
            clase={
              index === 0 ? "first" : index === array.length - 1 ? "last" : ""
            }
            color={colors[index]}
            annotation={annotation}
            handleVideoSkipTime={handleVideoSkipTime}
          />
        )
      })}
    </SContainer>
  )
}

export default LabelTimelineMap
