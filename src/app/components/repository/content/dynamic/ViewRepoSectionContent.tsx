import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'

const SContainer = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`

const ViewRepoSectionContent = ({ parentContent, existingContent }: any) => {

    useEffect(() => {
        if (parentContent) {
            console.log("ViewRepoSectionContent::parentContent: ",parentContent)
        }
        if (existingContent) {
            console.log("ViewRepoSectionContent::existingContent",existingContent)
        }

    }, [parentContent, existingContent]);

  return (
    <SContainer>
        hi
    </SContainer>
  )
}

export default ViewRepoSectionContent