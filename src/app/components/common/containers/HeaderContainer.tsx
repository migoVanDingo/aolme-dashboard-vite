import React, { useState } from 'react'
import styled from 'styled-components'


const SContainer = styled.div`

    width: 100%;
    height: 100px;

    display: grid;

    grid-template-columns: 70% auto;
    grid-template-rows: 60px 40px;
    grid-template-areas: 
    "title misc"
    "tabs   blank";

    padding: 15px 0 0 0;
    background-color: ${({theme}) => theme.color.color_2_5};
    box-shadow: 0px 0px 4px ${({theme}) => theme.color.shadow.dark};
`

export const ProfileHeader = ({ owner, projectName, entityName }: any) => {

    const [activeTab, setActiveTab] = useState<string>('Files')
    



  return (
    <SContainer>
      {/*   <ProfileTitle owner={owner} />
        <ProfileTabs setActiveTab={setActiveTab} activeTab={activeTab} /> */}
    </SContainer>
  )
}


const HeaderContainer = () => {
  return (
    <div>HeaderContainer</div>
  )
}

export default HeaderContainer