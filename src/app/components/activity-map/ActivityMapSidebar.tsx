import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers"

const SSidebar = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.color.color_2_5};
  padding: 50px 20px;
  margin: 130px 0;
  align-items: flex-start;
  box-sizing: border-box;
`
const SHeading = styled.h2`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.color_6};
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_2_5};
`

const SSidebarList = styled.ul`
  height: auto;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: fixed;
  letter-spacing: 1px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  list-style-type: disc;
  list-style-position: inside;
`

const SListItem = styled.li`
  width: 100%;
  padding: 10px 20px 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 200;
  transition: all 0.2s ease;
  font-size: 0.8rem;

  &:hover {
    color: #0de99f;
    background-color: ${({ theme }) => theme.color.color_2_5};
    cursor: pointer;
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.color_4};
  }
`

const ActivityMapSidebar = ({ subsetItems, setSelectedItem }: any) => {

  useEffect(() => {
    const init = () => {
      //console.log("ActivityMapSidebar::subsetItems", subsetItems)
      //filterVideos(subsetItems)
    }
    return init()
  }, [])

  const handleSelectItem = (item: any) => {
    setSelectedItem(item)
  }

  return (
    <SSidebar>
      <SHeading>Subset Files</SHeading>
      <SSidebarList>
        {subsetItems &&
          subsetItems.length > 0 &&
          subsetItems.map(
            (video: any) =>
              video.type === "VIDEO" && (
                <SListItem
                  onClick={() => handleSelectItem(video.subset_item_id)}
                  key={video.subset_item_id}
                >
                  {video.name}
                </SListItem>
              ),
          )}
      </SSidebarList>
    </SSidebar>
  )
}

export default ActivityMapSidebar
