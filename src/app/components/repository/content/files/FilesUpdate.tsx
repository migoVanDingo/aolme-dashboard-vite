import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../../../common/containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'


const SContainer = styled(SFlexRow)`
    border-bottom: 1px solid ${({theme}) => theme.color.color_5};
    box-sizing: border-box;
    width: 100%;
    padding: 5px 15px;
    font-size: 0.8rem;
    gap: 15px;
    background-color: ${({theme}) => theme.color.color_2_5};
`

const SUser = styled(SFlexRow)`
    gap: 7px;
    justify-content: baseline;
    align-items: center;
    color:  ${({theme}) => theme.color.color_6};
    
`
const SIcon = styled(FontAwesomeIcon)`
    padding: 0px 5px;
`

const SCommit = styled.p`
    border-radius: ${({theme}) => theme.container.borderRadius.md};
  
    font-size: 0.8rem;
    margin: 0;
    padding: 5px 12px;
    color:  ${({theme}) => theme.color.color_6};
    background-color: ${({theme}) => theme.color.color_0};
`

const SCommitMsg = styled.p`
    font-size: 0.8rem;
    margin: 0;
    padding: 5px 15px;
    color:  ${({theme}) => theme.color.color_6};
`

const SLastUpdate = styled.p`
    font-size: 0.8rem;
    margin: 0;
    margin-left: auto;
    padding: 5px 0;
    color:  ${({theme}) => theme.color.color_6};
`

const SNumCommits = styled.p`
    font-size: 0.8rem;
    margin: 0;
    padding: 5px 0;
    color:  ${({theme}) => theme.color.color_6};
`

const username = "Migo"
const commit = "a18rjkI92"
const commit_message = "added validation file"
const last_update =  "3 months ago"
const num_commits = "4 commits"


const FilesUpdate = () => {
  return (
    <SContainer>
        <SUser>
            <SIcon icon={faUser}/>
            {username}
        </SUser>
        <SCommit >{commit}</SCommit>
        <SCommitMsg>{commit_message}</SCommitMsg>
        <SLastUpdate>{last_update}</SLastUpdate>
        <SNumCommits><SIcon icon={faClockRotateLeft} flip="horizontal"/>{num_commits}</SNumCommits>
    </SContainer>
  )
}

export default FilesUpdate