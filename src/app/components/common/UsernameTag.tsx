import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { SFlexRow } from './containers/FlexContainers'

const SContainer = styled(SFlexRow)`
    
    padding: 20px 0px;
    gap: 5px;
`

const SIcon = styled(FontAwesomeIcon)`

`

const UsernameTag = ({ username }: any) => {
  return (
    <SContainer>
        <SIcon icon={faCircleUser}/>
        {username}
    </SContainer>
  )
}

export default UsernameTag