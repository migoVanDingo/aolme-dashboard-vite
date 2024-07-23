import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../components/common/containers/FlexContainers'

const SContainer = styled(SFlexCol)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    background-color: #f0f0f0;
    
`

const SFrame = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`

const Notebook = () => {
  return (
    <SContainer><SFrame src="http://10.0.0.45:8000/" title="W3Schools Free Online Web Tutorials"></SFrame></SContainer>
  )
}

export default Notebook