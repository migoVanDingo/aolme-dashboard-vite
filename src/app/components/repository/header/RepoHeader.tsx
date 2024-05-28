import React, { useState } from 'react'
import styled from 'styled-components'
import RepoTitle from './RepoTitle'
import RepoTabs from './RepoTabs'

const SContainer = styled.div`

    width: 100%;
    

    display: grid;

    grid-template-columns: 70% auto;
    grid-template-rows: 60px 40px;
    grid-template-areas: 
    "title misc"
    "tabs   blank";

    padding: 15px 0 0 15px;
    background-color: ${({theme}) => theme.color.color_1};
    box-shadow: 0px 0px 4px ${({theme}) => theme.color.shadow.dark};

`

export const RepoHeader = ({ owner, projectName, entityName }: any) => {

    const [activeTab, setActiveTab] = useState<string>('Files')
    



  return (
    <SContainer>
        <RepoTitle owner={owner} projectName={projectName} entityName={entityName} />
        <RepoTabs setActiveTab={setActiveTab} activeTab={activeTab} />
    </SContainer>
  )
}
