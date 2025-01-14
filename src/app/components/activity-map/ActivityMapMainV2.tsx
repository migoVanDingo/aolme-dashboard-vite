import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../common/containers/FlexContainers"
import { DatasetAPI } from "../../deprecated/DatasetAPI__OLD"
import LabelTimelineComponent from "./LabelTimelineComponent"
import LabelTimelineMap from "./LabelTimelineMap"
import Player from "../video-player/Player"
import ToggleModule from "../common/ToggleModule"
import ActivityMapHeader from "./ActivityMapHeader"
import LabelTimelineMapV2 from "./LabelTimelineMapV2"
import LoadingSpinner from "../common/loading/LoadingSpinner"

const SContainer = styled.div`
  width: 100%;
  grid-area: main;
  box-sizing: border-box;

  display: grid;
  overflow-y: auto;
  position: relative;
  padding: 20px 40px 40px;
  height: calc(100vh);

  top: 0;
  margin: 0;

  grid-template-columns: repeat(4, calc(calc(858px * 3) / 16)) auto;
  grid-template-rows: 80px 300px auto;
  grid-template-areas:
    "header  header  header  header  header"
    "options options options options map"
    "player  player  player  player  map";

  &.layout-1 {
    grid-template-columns: repeat(4, calc(calc(858px * 3) / 16)) auto;
    grid-template-rows: 80px 300px auto;
    grid-template-areas:
      "header  header  header  header  header"
      "options options options options map"
      "player  player  player  player  map";
  }

  &.layout-2 {
    grid-template-columns: repeat(4, calc(calc(858px * 3) / 16)) auto;
    grid-template-rows: 80px 300px auto;
    grid-template-areas:
      "header  header  header  header  header"
      "options options options  player  player"
      "map     map     map     map     map";
  }
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
    color: "red"
  },
  {
    title: "Typing",
    id: "",
    toggle: false,
    color: "blue"
  },
  {
    title: "Writing",
    id: "",
    toggle: false,
    color: "green"
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




const ActivityMapMain = ({ subsetId, selectedItem, fileAnnotations }: any) => {
  const [annotationArr, setAnnotationArr] = useState<any[]>([])
  const [videoTime, setVideoTime] = useState<number>(0)
  const [participants, setParticipants] = useState<any[]>([])
  const [actions, setActions] = useState<any[]>([])
  const [toggleParticipantList, setToggleParticipantList] = useState<any[]>([])
  const [toggleActionList, setToggleActionList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [layout, setLayout] = useState<string>("layout-2")

  let toggle = true

  useEffect(() => {
    const init = () => {
      if (annotationArr && annotationArr.length > 0) {
        //console.log("ActivityMapMain::annotationArr::", annotationArr)
        /* setAnnotationArr(sortParticipantList(annotationArr))
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
        } */
      }
    }
    return init()
  }, [])

  useEffect(() => {
    const init = () => {
      if (fileAnnotations && fileAnnotations.length > 0) {
        const items = processFileAnnotationObject(fileAnnotations)

        setAnnotationArr(items)
        const itemAnnotations = items.map(
          (item: any, index: number, array: any) => item.annotations,
        )

        const annotations = itemAnnotations.filter(
          (item: any, index: number, array: any) => {
            let longest = 0
            let anno = 0

            if (item.length > longest) {
              longest = item.length
              anno = index
            }

            if(index === array.length - 1)
              return array[anno]
          },
        )


        const participants = annotations[0].map((annotation: any) => {
          return { title: annotation.label, toggle: true }
        })

        setParticipants(sortParticipantList(participants))
        setToggleParticipantList(sortParticipantList(participants))

        

        const actions = fileAnnotations.map((annotation: any) => {
          return {
            action: capitalizeFirstLetter(annotation.type),
            toggle: true,
            color: annotation.type === "typing" ? "blue" : annotation.type === "writing" ? "green" : "red"
          }
        })

        setActions(sortActionList(actions))
        setToggleActionList(sortActionList(actions))
      }
    }
    return init()
  }, [fileAnnotations])

  useEffect(() => {
    const init = () => {
      if (annotationArr.length > 0 && actions.length > 0) {
        setLoading(false)
      }
    }
    return init()
  }, [actions, annotationArr])

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const processFileAnnotationObject = (fileAnnotations: any[]) => {
    return fileAnnotations.map((fileAnnotation: any) => {
      let annotationRaw = fileAnnotation

      let annotationData = annotationRaw["data"][0]["annotations"][0]["result"]

      annotationData = annotationData.map((annotation: any) => annotation.value)

      annotationData = annotationData.map((annotation: any) =>
        filterAnnotationData(annotation),
      )
      return { type: annotationRaw["type"], annotations: annotationData }
    })
  }

  const getAnnotationData = async (subsetId: string, filename: string) => {
    const annotationData = await DatasetAPI.getFileAnnotationListByDataset(
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

    // console.log("ActivityMapMain::filterAnnotationData::ret::", ret)
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
    setParticipants(sortParticipantList(participants))
  }

  const handleUpdateActions = (actions: any[]) => {
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

  const handleSetLayout = (layout: string) => {
    /* if(layout === "layout-1" ){
      setLayout("layout-2")
    } else {
      setLayout("layout-1")
    } */
  }

  if (loading) {
    return <LoadingSpinner message={"Loading Activity Map"} />
  } else {
    return (
      <SContainer className={layout}>
        <ActivityMapHeader
          setLayout={handleSetLayout}
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
          {toggleActionList && toggleActionList.length > 0 && (
            <ToggleModule
              heading={"Actions"}
              handleUpdateList={handleUpdateActions}
              list={toggleActionList}
            />
          )}
        </SOptionsContainer>
        <Player
          layout={layout}
          currentTime={videoTime}
          path={
            selectedItem.path
          }
        />
        <LabelTimelineMapV2
          layout={layout}
          handleVideoSkipTime={handleVideoSkipTime}
          annotationArr={annotationArr}
          participantsList={participants}
          actionsList={actions}
        />
      </SContainer>
    )
  }
}

export default ActivityMapMain
