import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../components/common/containers/FlexContainers'
import { RepoHeader } from '../components/repository/header/RepoHeader'
import RepoContent from '../components/repository/content/RepoContent'
import RepoReadMe from '../components/repository/content/readme/RepoReadMe'

const SContainer = styled(SFlexCol)`

  width: 100%;
  box-sizing: border-box;
  

`

const Repository = () => {
  return (
    <SContainer>
      <RepoHeader />
      <RepoContent />
      <RepoReadMe />
    </SContainer>
  )
}

export default Repository