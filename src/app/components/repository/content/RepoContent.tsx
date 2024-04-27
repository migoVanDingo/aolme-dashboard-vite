import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../common/containers/FlexContainers'
import RepoFiles from './files/RepoFiles'
import RepoBranch from './branch/RepoBranch'
import RepoCollab from '../collaborator/RepoCollab'

const SContainer = styled.div`
 
    margin: 30px;
    width: 1000px;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: 80% 20%;
    grid-template-rows: 50px auto;

    grid-template-areas: 
    "branch none"
    "files  collab";

`

const RepoContent = ({ repoId }: any) => {
  return (
    <SContainer>
        <RepoBranch />
        <RepoFiles  />
        <RepoCollab />
    </SContainer>
  )
}

export default RepoContent