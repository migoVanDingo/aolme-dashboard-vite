import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileTitle from './ProfileTitle'
import ProfileTabs from './ProfileTabs'
import { SFlexRow } from '../../common/containers/FlexContainers'

const SContainer = styled(SFlexRow)`

    width: 100%;
    height: 100%;

    grid-area: header;

    padding: 10px 0 0 0;
    background-color: ${({theme}) => theme.color.color_1};
    //box-shadow: 0px 0px 4px ${({theme}) => theme.color.shadow.dark};
`

export const ProfileHeader = ({ activeTab, setActiveTab, tabs }: any) => {
  
  return (
    <SContainer>
        <ProfileTabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs}/>
    </SContainer>
  )
}
