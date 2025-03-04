import React from 'react'
import styled from 'styled-components'

const SContainer = styled.div`
    width: 100%;
    min-height: calc(calc(100vh - ${({theme}) => theme.header.height}) - 125px);
    grid-area: files;
` 

const ProjFilesLayout = () => {
  return (
    <SContainer>
      
    </SContainer>
  )
}

export default ProjFilesLayout