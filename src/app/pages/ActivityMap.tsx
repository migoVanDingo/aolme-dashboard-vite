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

/* const SContainer = styled(SFlexCol)`
    width: 1200px;
    height: 300px;
    border: 1px solid ${({ theme }) => theme.color.color_5};

    padding: 30px;
` */
const SContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 350px auto;
  grid-template-rows: 100%;
  grid-template-areas: "sidebar main";
  background-color: ${({ theme }) => theme.color.color_2};
  display: relative;

  padding: 0;
  margin: 0;
`

const ActivityMap = () => {
  const dispatch = useDispatch()
  const { datasetId } = useParams<{ datasetId: string }>()

  const [subset, setSubset] = useState<any>(null)
  const [subsetItems, setSubsetItems] = useState<any[]>([])

  const [selectedItem, setSelectedItem] = useState<any>()

  const [beastObject, setBeastObject] = useState<any[]>([])

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
      />
      <ActivityMapMainV2 selectedItem={selectedItem} fileAnnotations={beastObject}/>
    </SContainer>
  )
}

export default ActivityMap
