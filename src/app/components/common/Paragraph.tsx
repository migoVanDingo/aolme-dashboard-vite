import React from 'react'
import styled from 'styled-components'
const SParagraph = styled.p<{size: string, weight: string, color: string}>`
    font-size: ${(props: any) => props.size ||'1rem'};
    font-weight: ${(props: any) => props.weight ||'200'};
    color: ${(props: any) => props.color || props.theme.color.color_6};
    `

const Paragraph = ({text, size, weight, color}: any) => {
  return (
    <SParagraph size={size} weight={weight} color={color}>{text}</SParagraph>
  )
}

export default Paragraph