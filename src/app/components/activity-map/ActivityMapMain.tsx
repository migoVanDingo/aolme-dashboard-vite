import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers"
import { DatasetAPI } from "../../deprecated/DatasetAPI__OLD"
import LabelTimelineComponent from "./LabelTimelineComponent"
import LabelTimelineMap from "./LabelTimelineMap"
import Player from "../video-player/Player"

const SContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  grid-area: main;
  box-sizing: border-box;
  padding: 40px;

`

const ActivityMapMain = ({ subsetId, selectedItem }: any) => {
  const [annotationArr, setAnnotationArr] = useState<any[]>([])
  const [videoTime, setVideoTime] = useState<number>(0)

  let toggle = true

  useEffect(() => {
    const init = () => {
      console.log("init")
      if (subsetId && selectedItem) {
        console.log(
          "ActivityMapMain::init::subsetId: " +
            subsetId +
            " selectedItem: " +
            selectedItem["name"],
        )
        getAnnotationData(subsetId, selectedItem["name"])

        
      } else {
        console.log(
          "ActivityMapMain::init::subsetId or selectedItem is null" +
            subsetId +
            " " +
            selectedItem,
        )
      }
    }
    return init()
  }, [subsetId, selectedItem])

  const getAnnotationData = async (subsetId: string, filename: string) => {
    const annotationData =  await DatasetAPI.getAnnotationData(subsetId, selectedItem["name"])
      .then((res: any) => {
        const data = res.data[0]
        let annotations = data["annotations"][0]["result"]
        annotations = annotations.map((annotation: any) => annotation.value)
        annotations = annotations.map((annotation: any) =>
          filterAnnotationData(annotation),
        )

        // console.log("ActivityMapMain::getAnnotationData::annotations::", annotations)

        return annotations
      })
      .catch((err: any) =>
        console.log("ActivityMapMain::getAnnotationData::err::", err),
      )
      setAnnotationArr(annotationData)

  }

  const filterAnnotationData = (annotation: any) => {
    const duration = annotation["duration"]
    const frames = annotation["framesCount"]
    const label = annotation["labels"][0]

    const sequences = annotation["sequence"]
    const filteredSequences = sequences.filter((sequence: any) =>
      filterSequences(sequence),
    )
   
    const ret = {
      duration: duration,
      frames: frames,
      label: label,
      sequences: filteredSequences,
    }
    //console.log("ActivityMapMain::filterAnnotationData::ret::", ret)
    return ret
  }

  const filterSequences = (sequence: any) => {
    if (sequence["enabled"] === toggle) {
      toggle = !toggle
      return sequence
    }
  }


  const handleVideoSkipTime = (time: number) => {
    setVideoTime(time)
  } 

  if(annotationArr) return(
    <SContainer>
      <Player currentTime={videoTime} path={"https://ece46medsrv.ece.unm.edu/COHORT_3/LEVEL_1/POLK/04_Polk_Mar21/04_Polk_Mar21_GroupA/Group_Interactions/Venkatesh/G-C3L1P-Mar21-A-Venkatesh_q2_03-05.mp4"}/>
        <LabelTimelineMap handleVideoSkipTime={handleVideoSkipTime} annotationArr={annotationArr} />
        
    </SContainer>
  )
}

export default ActivityMapMain
