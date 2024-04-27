import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../common/containers/FlexContainers';
import LabelTimelineComponent from './LabelTimelineComponent';

const SContainer = styled(SFlexCol)`
    width: 100%;
    box-sizing: border-box;
    padding: 40px;
    border: 1px solid blue;

`

const LabelTimelineMap = ({ annotationArr }: any) => {

    useEffect(() => {
        const init = () => {
            console.log("LabelTimelineMap::annoArr::", annotationArr)
        }
        return init()
    }, []);
  return (
    <SContainer>
        {
            annotationArr.map((annotation: any) => {
                return <LabelTimelineComponent annotation={annotation} />
            })
        }
    </SContainer>
  )
}

export default LabelTimelineMap