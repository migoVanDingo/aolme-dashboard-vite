import React from 'react'
import styled from 'styled-components'


const SParagraph = styled.p`


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
        font-size: 2rem;
    }

    &.f-lg {
        font-size: 1.5rem;
    }

    &.f-md {
        font-size: 1rem;
    }

    &.f-sm {
        font-size: 0.8rem;
    }

    &.f-xs {
        font-size: 0.6rem;
    }

    



    `

const DynamicParagraph = ({styles, text}: any) => {
  return (
    <SParagraph className={styles}>{text}</SParagraph>
  )
}

export default DynamicParagraph