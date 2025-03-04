import React from 'react'
import styled from 'styled-components'
import Heading from '../Heading'
import Paragraph from '../Paragraph'
import DynamicHeading from '../DynamicHeading'
import DynamicParagraph from '../DynamicParagraph'
const SContainer = styled.div<{gridArea: string}>`
    grid-area: ${(props: any) => props.gridArea || ''};
    width: 100%;
    border: 1px solid ${({theme}) => theme.color.color_5};

    align-self: flex-start;
    

    &.p-1 {
        padding: 1rem;
    }

    &.p-2 {
        padding: 2rem;
    }

    &.p-3 {
        padding: 3rem;
    }

    &.b-none {
        border: none;
    }


    &.b-weight-100 {
        border-width: 1px;
    }

    &.b-weight-200 {
        border-width: 2px;
    }

    &.b-weight-300 {
        border-width: 3px;
    }

    &.b-weight-500 {
        border-width: 5px;
    }

    
    &.b-rad-sm {
        border-radius: ${({theme}) => theme.container.borderRadius.sm};
    }

    &.b-rad-md {
        border-radius: ${({theme}) => theme.container.borderRadius.md};
    }

    &.b-rad-lg {
        border-radius: ${({theme}) => theme.container.borderRadius.lg};
    }

`

const DynamicDescriptionCard = ({containerStyles, headingStyles, textStyles, gridArea, heading, text}: any) => {
  return (
    <SContainer className={containerStyles} gridArea={gridArea}>
        <DynamicHeading heading={heading} styles={headingStyles} />
        <DynamicParagraph text={text} styles={textStyles}/>
    </SContainer>
  )
}

export default DynamicDescriptionCard