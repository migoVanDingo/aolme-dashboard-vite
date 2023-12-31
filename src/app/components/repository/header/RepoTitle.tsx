import React from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../../common/containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'



const SContainer = styled(SFlexCol)`

    align-items: baseline;
    box-sizing: border-box;
    grid-area: title;
    padding-left: 20px;
`
const SIcon = styled(FontAwesomeIcon)`

    height: 25px;
    width: 25px;
`

const STitleContainer = styled(SFlexRow)`
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    gap: 10px;

    padding: 10px 10px 3px 10px;
    
`
const STitle = styled.p`
    font-size: 1.5rem;
    padding: 0;
    margin: 0;

    color: ${({theme}) => theme.color.color_5};

    &.accent {
        color: ${({theme}) => theme.accent.color_1};
    }

`

const SLinkContainer = styled(SFlexRow)`
    width: 100%;
    box-sizing: border-box;
    padding-left: 50px;
`

const SLink = styled.p`
    
    font-size: 0.7rem;
    padding: 0;
    margin:0;
    color: ${({theme}) => theme.color.color_5};

    &.sub{
        color: ${({theme}) => theme.accent.color_1};
        margin-left: 3px;

    }

`

const username = "Migo"
const repo = "Hello-world"
const link1 = "connected to "
const link2 = "www.yumama.com"


const RepoTitle = ({ owner, projectName }: any) => {
  return (
    <SContainer>
        <STitleContainer>
            <SIcon icon={faBook}/>
            <STitle className={"accent"} >{owner} </STitle> 
            <STitle>{" / "}</STitle>
            <STitle className={"accent"} > {projectName}</STitle>
        </STitleContainer>
        <SLinkContainer>
            <SLink >{link1}</SLink>
            <SLink className={"sub"}>{link2}</SLink>
        </SLinkContainer>
    </SContainer>
  )
}

export default RepoTitle