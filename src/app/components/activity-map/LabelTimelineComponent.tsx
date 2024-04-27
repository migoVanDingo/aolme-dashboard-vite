import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../common/containers/FlexContainers'

const SContainer = styled(SFlexCol)`
    width: 100%;
    box-sizing: border-box;
    border: 1px solid green;
`
const SLabel = styled.h4`
    color: ${({ theme }) => theme.color.color_6};
    font-weight: 300;
`

const LabelTimelineComponent = ({ annotation }: any) => {

    useEffect(() => {
        const init = () => {
            console.log("LabelTimelineComponent::annotation::", annotation)
        }
        return init()
    }, []);
  return (
    <SContainer>
        <SLabel>{annotation.label}</SLabel>
        {/** TIMELINE */}
    </SContainer>
  )
}

export default LabelTimelineComponent