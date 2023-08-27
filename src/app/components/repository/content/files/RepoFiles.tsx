import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'
import FilesUpdate from './FilesUpdate'
import FilesMenu from './FilesMenu'
import BranchContent from './BranchContent'

const SContainer = styled(SFlexCol)`
    grid-area: files;
    border: 1px solid ${({theme}) => theme.button.branch.border};
    border-radius: ${({theme}) => theme.container.borderRadius.md};
    margin: 10px 0;
    overflow: hidden;
    
`



const RepoFiles = () => {
  return (
    <SContainer>
        <FilesUpdate />
        <FilesMenu />
        <BranchContent />
    </SContainer>
  )
}

export default RepoFiles