import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import Timeline from "../components/activity-map/Timeline"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
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

  
`

const ActivityMap = () => {
  const { subsetId } = useParams<{ subsetId: string }>()
  const { subsets } = useSelector((state: any) => state)

  const [subset, setSubset] = useState<any>(null)
  const [subsetItems, setSubsetItems] = useState<any[]>([])

  const [selectedItem, setSelectedItem] = useState<any>()

  useEffect(() => {
    const init = () => {
      console.log("ActivityMap::subsetId", subsetId)
      //Get the subset files
      if (subsetId && subsets && subsets.length > 0) {
        filterSubset(subsetId, subsets)
      }
    }
    return init()
  }, [])

  useEffect(() => {
    const init = () => {
      if (subset) {
        DatasetAPI.getSubsetItemList(subset.subset_id)
          .then((res: any) => {
            if (res.data) {
              console.log(
                "ActivityMap::DatasetAPI.getSubsetItemList::res::",
                res.data,
              )
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
    } 
    return init()
  }, [subset])

  /* useEffect(() => {
    
    const init = () => {
      console.log("ActivityMap::selectedItem", selectedItem)
    }
    return init()
  }, [selectedItem]); */

  const filterSubset = (subsetId: string, subsets: any) => {
    const subset = subsets.filter(
      (subset: any) => subset.subset_id === subsetId,
    )
    setSubset(subset[0])
  }

  const handleSelectItem = (itemId: any) => {
    const item = subsetItems.filter(
      (item: any) => item.subset_item_id === itemId,
    )
    setSelectedItem(item[0])
  }

  return (
    <SContainer>
      <ActivityMapSidebarV2
        subsetItems={subsetItems}
        setSelectedItem={handleSelectItem}
      />
      <ActivityMapMainV2
        subsetId={subsetId}
        selectedItem={selectedItem}
      />
    </SContainer>
  )
}

export default ActivityMap
