import React from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../common/containers/FlexContainers'

const SContainer = styled(SFlexCol)`
    grid-area: header;
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

const ActivityMapHeader = ({ title, id}: any) => {
  return (
    <SContainer>
        <STitle>Title: {title}</STitle>
        <SSubTitle>Video ID: {id}</SSubTitle>
    </SContainer>
  )
}

export default ActivityMapHeader