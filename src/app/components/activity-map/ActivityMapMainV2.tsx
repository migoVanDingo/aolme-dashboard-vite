import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../common/containers/FlexContainers"
import { DatasetAPI } from "../../api/DatasetAPI"
import LabelTimelineComponent from "./LabelTimelineComponent"
import LabelTimelineMap from "./LabelTimelineMap"
import Player from "../video-player/Player"
import ToggleModule from "../common/ToggleModule"
import ActivityMapHeader from "./ActivityMapHeader"
import LabelTimelineMapV2 from "./LabelTimelineMapV2"

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: main;
  box-sizing: border-box;
  padding: 40px;

  display: grid;
  grid-template-columns: repeat(4, calc(calc(858px * 3) / 16)) auto;
  grid-template-rows: 80px 300px auto;
  grid-template-areas:
    "header  header  header  header  header"
    "options options options options map"
    "player  player  player  player  map";
`

const SOptionsContainer = styled(SFlexRow)`
  grid-area: options;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
`

const actions = [
  {
    title: "Talking",
    id: "",
    toggle: false,
  },
  {
    title: "Typing",
    id: "",
    toggle: false,
  },
  {
    title: "Writing",
    id: "",
    toggle: false,
  },
]

const annotations = [
  {
    title: "VJ",
    toggle: true,
    action: "Talking",
  },
  {
    title: "Dave",
    toggle: true,
    action: "Talking",
  },
  {
    title: "Johann",
    toggle: true,
    action: "Talking",
  },
  {
    title: "Migo",
    toggle: true,
    action: "Talking",
  },

  {
    title: "VJ",
    toggle: true,
    action: "Typing",
  },
  {
    title: "Dave",
    toggle: true,
    action: "Typing",
  },
  {
    title: "Johann",
    toggle: true,
    action: "Typing",
  },
  {
    title: "Migo",
    toggle: true,
    action: "Typing",
  },

  {
    title: "VJ",
    toggle: true,
    action: "Writing",
  },
  {
    title: "Dave",
    toggle: true,
    action: "Writing",
  },
  {
    title: "Johann",
    toggle: true,
    action: "Writing",
  },
  {
    title: "Migo",
    toggle: true,
    action: "Writing",
  },
]

const ActivityMapMain = ({ subsetId, selectedItem }: any) => {
  const [annotationArr, setAnnotationArr] = useState<any[]>(annotations)
  const [videoTime, setVideoTime] = useState<number>(0)
  const [participants, setParticipants] = useState<any[]>([])
  const [actions, setActions] = useState<any[]>([])
  const [toggleParticipantList, setToggleParticipantList] = useState<any[]>([])
  const [toggleActionList, setToggleActionList] = useState<any[]>([])

  let toggle = true

  useEffect(() => {
    const init = () => {
      if (annotationArr && annotationArr.length > 0) {
        setAnnotationArr(sortParticipantList(annotationArr))
        if (participants.length === 0) {
          let uniqueTitles = new Set()
          let uniqueParticipants: any[] = []

          annotationArr.forEach((annotation) => {
            if (!uniqueTitles.has(annotation.title)) {
              uniqueTitles.add(annotation.title)
              uniqueParticipants.push({ title: annotation.title, toggle: true })
            }
          })
          setParticipants(sortParticipantList(uniqueParticipants))
          setToggleParticipantList(sortParticipantList(uniqueParticipants))
        }

        if (actions.length === 0) {
          let actionSet = new Set()
          let actionArray: any[] = []

          annotationArr.forEach((annotation) => {
            if (!actionSet.has(annotation.action)) {
              actionSet.add(annotation.action)
              actionArray.push({ action: annotation.action, toggle: true })
            }
          })
          setActions(sortActionList(actionArray))
          setToggleActionList(sortActionList(actionArray))
        }
      }
    }
    return init()
  }, [])

  useEffect(() => {
    //console.log("ActivityMapMain::participants::", participants)
  }, [participants])

  /*  useEffect(() => {
    const init = () => {
      console.log("init")
      if (subsetId && selectedItem) {
        console.log("ActivityMapMain::init::subsetId: " +subsetId +" selectedItem: " +selectedItem["name"])
        getAnnotationData(subsetId, selectedItem["name"])

        
      } else {
        console.log("ActivityMapMain::init::subsetId or selectedItem is null" +subsetId+" " +selectedItem,
        )
      }
    }
    return init()
  }, [subsetId, selectedItem]) */

  const getAnnotationData = async (subsetId: string, filename: string) => {
    const annotationData = await DatasetAPI.getAnnotationData(
      subsetId,
      selectedItem["name"],
    )
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

  const handleUpdateParticipants = (participants: any[]) => {
    //console.log("ActivityMapMain::handleUpdateParticipants::participants::", participants)

    setParticipants(sortParticipantList(participants))
  }

  const handleUpdateActions = (actions: any[]) => {
    console.log("ActivityMapMain::handleUpdateActions::actions::", actions)
    setActions(sortActionList(actions))
  }

  const sortParticipantList = (list: any) => {
    return list.sort((a: any, b: any) => {
      const titleA = a.title.toUpperCase() // ignore upper and lowercase
      const title = b.title.toUpperCase() // ignore upper and lowercase
      if (titleA < title) {
        return -1
      }
      if (titleA > title) {
        return 1
      }

      // names must be equal
      return 0
    })
  }
  const sortActionList = (list: any) => {
    return list.sort((a: any, b: any) => {
      const actionA = a.action.toUpperCase() // ignore upper and lowercase
      const actionB = b.action.toUpperCase() // ignore upper and lowercase
      if (actionA < actionB) {
        return -1
      }
      if (actionA > actionB) {
        return 1
      }

      // names must be equal
      return 0
    })
  }

  if (annotationArr)
    return (
      <SContainer>
        <ActivityMapHeader
          title={"C1L1P-B-2015-VJ"}
          id={"VID8271JINDS82932FHW"}
        />
        <SOptionsContainer>
          {toggleParticipantList && participants.length > 0 && (
            <ToggleModule
              heading={"Participants"}
              handleUpdateList={handleUpdateParticipants}
              list={toggleParticipantList}
            />
          )}
          {toggleActionList && actions.length > 0 && (
            <ToggleModule
              heading={"Actions"}
              handleUpdateList={handleUpdateActions}
              list={toggleActionList}
            />
          )}
        </SOptionsContainer>
        <Player
          currentTime={videoTime}
          path={
            "https://ece46medsrv.ece.unm.edu/COHORT_3/LEVEL_1/POLK/04_Polk_Mar21/04_Polk_Mar21_GroupA/Group_Interactions/Venkatesh/G-C3L1P-Mar21-A-Venkatesh_q2_03-05.mp4"
          }
        />
        <LabelTimelineMapV2
          handleVideoSkipTime={handleVideoSkipTime}
          annotationArr={annotationArr}
          participantsList={participants}
          actionsList={actions}
        />
      </SContainer>
    )
}

export default ActivityMapMain
