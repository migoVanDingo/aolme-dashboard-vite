import React from 'react'
import styled from 'styled-components'

interface IStyledHeading {

}

const SHeading = styled.p<IStyledHeading>`

    
    color: ${({theme}) => theme.color.color_6};
    margin: 0;
    

    &.f-weight-100 {
        font-weight: 100;
    }

    &.f-weight-200 {
        font-weight: 200;
    }

    &.f-weight-300 {
        font-weight: 300;
    }

    &.f-weight-500 {
        font-weight: 500;
    }
    
    
    &.f-xl {
        font-size: 3rem;
    }

    &.f-lg {
        font-size: 2rem;
    }

    &.f-md {
        font-size: 1.6rem;
    }

    &.f-sm {
        font-size: 1.2rem;
    }

    &.neutral {

    }

    &.accent {
        color: ${({theme}) => theme.accent.color_1_dim};
    }

    &.p-1 {
        padding: 1rem;
    }

    &.p-2 {
        padding: 2rem;
    }

    &.p-3 {
        padding: 3rem;
    }

   
`

const DynamicHeading = ({styles, heading} : any) => {
  return (
    <SHeading className={styles}>{heading}</SHeading>
  )
}

export default DynamicHeading