import React from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../common/containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress } from '@fortawesome/free-solid-svg-icons'

const SContainer = styled(SFlexRow)`
 width: 100%;
 grid-area: header;

 `

const SHeadingContainer = styled(SFlexCol)`
    
    align-items: flex-start;
    padding: 0 0 10px 0;
    

`

const STitle = styled.p`
    font-size: 1.5rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.color.color_5};

`

const SSubTitle = styled.p`
    font-size: 1rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.color.color_5};
`

const SButtonContainer = styled(SFlexRow)`
  
    padding: 10px 0;
    gap: 10px;
    margin-left: auto;
    align-items: flex-end;
    


`

const SDownloadButton = styled.button`
    height: 35px;
    padding: 0px 10px;
    border-radius: ${({ theme }) => theme.container.borderRadius.sm};
    background-color: ${({ theme }) => theme.accent.color_1_dim};
    color: ${({ theme }) => theme.color.color_8};
    font-size: 1rem;
    cursor: pointer;
    border: none;
    transition: all 0.3s;
    &:hover {
        background-color: ${({ theme }) => theme.accent.color_1};
        color: white;
    }

`
const SLayoutButton = styled.button`
    height: 35px;
    width: 40px;
    box-sizing: border-box;
    padding-top: 6px;

    border-radius: ${({ theme }) => theme.container.borderRadius.sm};
    background-color: ${({ theme }) => theme.color.color_3};
    color: ${({ theme }) => theme.color.color_8};
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.color.color_5};

    &:hover {
        background-color: ${({ theme }) => theme.color.color_4};
    }

`

const SIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
    
`

const ActivityMapHeader = ({ title, id, handleSetLayout}: any) => {
  return (
    <SContainer>
      <SHeadingContainer>
      <STitle>Title: {title}</STitle>
        <SSubTitle>Video ID: {id}</SSubTitle>
      </SHeadingContainer>
      <SButtonContainer>
        <SLayoutButton onClick={handleSetLayout}><SIcon icon={faCompress}/></SLayoutButton>
      <SDownloadButton>Download</SDownloadButton>
      </SButtonContainer>
    </SContainer>
  )
}

export default ActivityMapHeader