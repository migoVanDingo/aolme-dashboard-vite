import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../../../common/containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import SelectBranch from './SelectBranch'
import BranchMetrics from './BranchMetrics'
import Download from './Download'

const SContainer = styled(SFlexRow)`
    grid-area: branch;
    align-items: center;
    
`


const RepoBranch = () => {
  return (
    <SContainer>
      <SelectBranch />
      <BranchMetrics />
      <Download />
    </SContainer>
  )
}

export default RepoBranch