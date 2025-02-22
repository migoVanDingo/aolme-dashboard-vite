import React from 'react'
import styled from 'styled-components'
import FilesModule from '../files/FilesModule'
import ProjectInfoModule from './ProjectInfoModule'
const SContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid green;
    grid-area: pipeline;

    display: grid;

`


const PipelineModule = () => {
  return (
    <SContainer>
      Pipeline Module
    </SContainer>
  )
}

export default PipelineModule