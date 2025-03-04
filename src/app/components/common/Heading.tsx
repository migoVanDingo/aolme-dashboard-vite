import React from 'react'
import styled from 'styled-components'

interface IStyledHeading {

}

const SHeading = styled.p<IStyledHeading>`

    font-weight: 200;
    color: ${({theme}) => theme.color.color_6};
    margin: 0;
    
    
    
    &.xl {
        font-size: 3rem;
    }

    &.lg {
        font-size: 2rem;
    }

    &.md {
        font-size: 1.6rem;
    }

    &.sm {
        font-size: 1.2rem;
    }

    &.neutral {

    }

    &.accent {
        color: ${({theme}) => theme.accent.color_1_dim};
    }

   
`

const Heading = ({heading, size, color} : any) => {
  return (
    <SHeading className={`${size + " "} ${color}`}>{heading}</SHeading>
  )
}

export default Heading