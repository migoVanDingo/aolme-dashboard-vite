import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../../../common/containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import SelectBranch from './SelectBranch'
import BranchMetrics from './BranchMetrics'
import Download from './Download'
import { useSelector } from 'react-redux'
import { RepoAPI } from '../../../../api/RepoAPI'

const SContainer = styled(SFlexRow)`
    grid-area: branch;
    align-items: center;
    
`


const RepoBranch = () => {
  const repoId = useSelector((state: any) => state.repoId)
  const handleSyncRepo = () => {
    console.log('syncing repo: ', repoId)
    RepoAPI.syncGithubRepo(repoId)
    .then((res: any) => {
      console.log("ActivityMapHeader::syncGithubRepo::res", res)
    })
    .catch((err: any) => {
      console.log("ActivityMapHeader::syncGithubRepo::err", err)
    })
  }
  return (
    <SContainer>
      <SelectBranch />
      <BranchMetrics />
      <Download action={handleSyncRepo} label={"Sync Repo"}/>
    </SContainer>
  )
}

export default RepoBranch