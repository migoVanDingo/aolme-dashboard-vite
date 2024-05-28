import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/containers/FlexContainers"
import ActivityCard from "./ActivityCard"



const SContainer = styled(SFlexCol)`
  width: 100%;
  height: auto;
  align-items:baseline;
  gap: 10px;


`

const ActivityProfileContent = ({ activities }: any) => {
  
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
