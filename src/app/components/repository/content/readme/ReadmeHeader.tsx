import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../../../common/containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

const SContainer = styled(SFlexRow)`
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.color.color_5};
    padding: 10px 15px;
    background-color: ${({theme}) => theme.color.color_1};
    color: ${({ theme }) => theme.color.color_6};
`

const SIcon = styled(FontAwesomeIcon)`
    
`

const SLine = styled.p`
    margin: 0;
    font-size: 0.9rem;
    margin-left: 10px;
`

const ReadmeHeader = () => {
  return (
    <SContainer>
        <SIcon icon={faBookOpen}/>
        <SLine>README.md</SLine>
    </SContainer>
  )
}

export default ReadmeHeader