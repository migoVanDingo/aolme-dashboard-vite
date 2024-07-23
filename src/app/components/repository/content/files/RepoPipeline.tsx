import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'
import SelectInput from '../../../common/inputs/select/SelectInput'

const SContainer = styled(SFlexCol)`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.color.color_2_5};
    align-items: flex-start;
    padding: 25px;
`

const SPipelineHeading = styled.h2`
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.color.color_6};
    margin: 0;
    padding: 0px;
    border-bottom: 1px solid ${({ theme }) => theme.color.color_2_5};

`

const RepoPipeline = () => {
  return (
    <SContainer>
        <SPipelineHeading>Pipeline Stages</SPipelineHeading>
        <SelectInput label={"Stage 1"} />
    </SContainer>
  )
}

export default RepoPipeline