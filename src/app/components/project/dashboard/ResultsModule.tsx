import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../../common/containers/FlexContainers'
import Heading from '../../common/Heading'
import CreateButton from '../../common/buttons/CreateButton'

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: results;

  box-shadow: 0px 3px 8px ${({ theme }) => theme.color.color_0};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.color.color_3};
`

const SCardTop = styled(SFlexRow)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  padding: 1rem;
  gap: 5px;

`
const SCardBottom = styled.div`

  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  overflow: hidden;
  padding: 2rem 1rem;
`

const SInline = styled(SFlexRow)`
  gap: 5px;
  height: 100%;
`

const SResultCard = styled(SFlexRow)`
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex:1;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.color.color_3};
  aspect-ratio: 1/1;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  `

const ResultsModule = () => {
  return (
    <SContainer>
      <SCardTop>
        <Heading heading={"Results"} size={"md"} />
        <CreateButton className={"view push-right"} innerHtml={"View Results"} />
      </SCardTop>
      <SCardBottom>
        <SInline>
          <SResultCard>Analytics</SResultCard>
          <SResultCard>MLFlow</SResultCard>
          <SResultCard>Activity Map</SResultCard>
        </SInline>
        
      </SCardBottom>
    </SContainer>
  )
}

export default ResultsModule