import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import Timeline from "../components/activity-map/Timeline"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DatasetAPI } from "../api/DatasetAPI"
import ActivityMapSidebar from "../components/activity-map/ActivityMapSidebar"
import ActivityMapMain from "../components/activity-map/ActivityMapMain"
import ActivityMapMainV2 from "../components/activity-map/ActivityMapMainV2"
import ActivityMapSidebarV2 from "../components/activity-map/ActivityMapSidebarV2"

const SContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 350px auto;
  grid-template-rows: 100%;
  grid-template-areas: "sidebar main";
  background-color: ${({ theme }) => theme.color.color_1};
  display: relative;

  padding: 0;
  margin: 0;
`

const videoObjectArr = [
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_01-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_01-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92b",
  },
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_02-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_02-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92c",
  },
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_03-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_03-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92d",
  },
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_04-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_04-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92e",
  },
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_05-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_05-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92f",
  },
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_06-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_06-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92g",
  },
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_07-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_07-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92h",
  },
  {
    title: "G-C1L1P-Mar02-E-Irma_q2_08-08.mp4",
    path: "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_08-08.mp4",
    facilitator: "IRMA",
    date: "20170302",
    timestamp: 1488485612,
    id: "a18rjkI92i",
  },
]

const ActivityMap = () => {
  const dispatch = useDispatch()
  const { datasetId } = useParams<{ datasetId: string }>()

  const [subset, setSubset] = useState<any>(null)
  const [subsetItems, setSubsetItems] = useState<any[]>([])

  const [selectedItem, setSelectedItem] = useState<any>()

  const [beastObject, setBeastObject] = useState<any[]>([])
  const [videoObject, setVideoObject] = useState<any[]>(videoObjectArr)

  useEffect(() => {
    const init = () => {
      //Get the subset files
      if (datasetId) {
        getSubsetList(datasetId)
      }
    }
    return init()
  }, [])

  useEffect(() => {
    const init = () => {
      if (subset) {
      }
    }
    return init()
  }, [subset])

  const getSubsetList = (datasetId: string) => {
    DatasetAPI.getSubsetListByDatasetId(datasetId)
      .then((res: any) => {
        if (res.data) {
          //console.log("ActivityMap::getSubsetList::res::", res.data)
          getSubsetItems(res.data)

        }
      })
      .catch((err: any) =>
        console.error("ActivityMap::getSubsetList::error::", err),
      )
  }

  const getSubsetItems = (subsetList: string[]) => {
    DatasetAPI.getSubsetItemList(subset.subset_id)
      .then((res: any) => {
        if (res.data) {
          //console.log( "ActivityMap::DatasetAPI.getSubsetItemList::res::",res.data)
          setSubsetItems(res.data)
        }
      })
      .catch((err: any) =>
        console.error(
          "ActivityMap::DatasetAPI.getSubsetItemList::error::",
          err,
        ),
      )
  }

  const handleSelectItem = (/* itemId: any */ title: string) => {
    /* const item = subsetItems.filter(
      (item: any) => item.subset_item_id === itemId,
    )
    setSelectedItem(item[0]) */
    const item = videoObject.filter((item: any) => item.title === title)
    setSelectedItem(item[0])
    if(datasetId){
      DatasetAPI.getFileAnnotationListByDataset(datasetId, title)
      .then((res: any) => {
        setBeastObject(res.data)
      })
      .catch((err: any) =>
        console.error("ActivityMap::handleSelectItem::error::", err),
      )
    }
    

  }

  return (
    <SContainer>
      <ActivityMapSidebarV2
        subsetItems={subsetItems}
        setSelectedItem={handleSelectItem}
        entries={videoObject}
      />
      <ActivityMapMainV2 selectedItem={selectedItem} fileAnnotations={beastObject}/>
    </SContainer>
  )
}

export default ActivityMap
