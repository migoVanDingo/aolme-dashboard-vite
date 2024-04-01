import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../common/containers/FlexContainers'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SContainer = styled(SFlexCol)`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    
`

const SDsHeading = styled.h1`
    font-size: 2rem;
    font-weight: 200;
    margin: 20px 0;
    color: ${({ theme }) => theme.color.color_6};
`

const SPara = styled.p`
    font-size: 1rem;
    font-weight: 200;
    margin: 20px 0;
    text-align: center;
    color: ${({ theme }) => theme.color.color_6};
`

const ViewDataset = ({ hideView, viewId, dataset }: any) => {
    //const { datasetId, datasetName, datasetDescription } = useSelector((state: any) => state)


    
  return (
    <SContainer>
        <SDsHeading>{dataset.name}</SDsHeading>
        <SPara>{dataset.description}</SPara>
        <button onClick={hideView}>Hide View</button>

    </SContainer>
  )
}

export default ViewDataset