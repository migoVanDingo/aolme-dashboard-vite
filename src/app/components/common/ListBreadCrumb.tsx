import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from './containers/FlexContainers'

interface ICrumbContainer {
  gridArea: string
}

const SCrumbContainer = styled(SFlexRow)<ICrumbContainer>`
  width: 100%;
  height: 60px;
  padding: 0 10px;
  align-items: center;
  gap: 5px;
  grid-area: ${(p) => p.gridArea};
`

const SBreadCrumb = styled.p`
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`

const ListBreadCrumb = ({breadCrumb, gridArea}: any) => {
  return (
    <SCrumbContainer gridArea={gridArea}>
    {breadCrumb &&
      breadCrumb.length > 0 &&
      breadCrumb.map((item: any, index: number) => {
        if (index === breadCrumb.length - 1) {
          return (
            <>
              <SBreadCrumb key={index}>{item}</SBreadCrumb>
         
            </>
          )
        } else {
          return (
            <>
              <SBreadCrumb key={index}>{item}</SBreadCrumb>
              <SBreadCrumb>{"/"}</SBreadCrumb>
            </>
          )
        }
      })}
  </SCrumbContainer>
  )
}

export default ListBreadCrumb