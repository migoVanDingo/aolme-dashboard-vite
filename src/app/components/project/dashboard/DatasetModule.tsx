import React from 'react'
import styled from 'styled-components'

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid green;
    grid-area: dataset;
`

const DatasetModule = () => {
  return (
    <SContainer>DatasetModule</SContainer>
  )
}

export default DatasetModule