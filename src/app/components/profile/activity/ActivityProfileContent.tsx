import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/containers/FlexContainers"
import ActivityCard from "./ActivityCard"

const activities = [
  {
    user: "migo",
    action: "created",
    object: "Repo 1",
    date: "2 days ago",
  },
  {
    user: "bubz",
    action: "updated",
    object: "New project 2",
    date: "1 month ago",
  },
  {
    user: "migo",
    action: "updated",
    object: "New project 2",
    date: "2 months ago",
  },
]

const SContainer = styled(SFlexCol)`
  width: 100%;
  height: auto;
  align-items:baseline;
  gap: 10px;


`

const ActivityProfileContent = () => {
  return (
    <SContainer>
      {activities &&
        activities.map((activity: any, index: number) => {
          return <ActivityCard key={index} activity={activity} />
        })}
    </SContainer>
  )
}

export default ActivityProfileContent
