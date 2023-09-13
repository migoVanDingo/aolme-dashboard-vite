import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'
import ReadmeHeader from './ReadmeHeader'
import ReadmeContent from './ReadmeContent'


const SContainer = styled(SFlexCol)`

    border: 1px solid ${({theme}) => theme.color.color_5};
    border-radius: ${({theme}) => theme.container.borderRadius.md};
    margin: 10px 200px 10px 0;
    overflow: hidden;
    width: 800px;
    align-items:baseline;

`


const RepoReadMe = () => {
  return (
    <SContainer>
        <ReadmeHeader />
        <ReadmeContent />
    </SContainer>
  )
}

export default RepoReadMe