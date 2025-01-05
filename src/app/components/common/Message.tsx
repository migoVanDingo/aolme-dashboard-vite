import React from 'react'
import styled from 'styled-components'

const SLine = styled.p`
    padding:0 5px 0 0;
    margin: 0;

    font-weight: 100;
    
    
    &.sm {
        font-size: 0.8rem;
    }

    &.md {
        font-size: 1rem;
    }

    &.lg {
        font-size: 1.2rem;
    }

    &.error {
        color: red;
    }

    &.success {
        color: green;
    }

    &.accent{
        color: ${({theme}) => theme.accent.color_2};
    }
    
    &.italic {
        font-style: italic;
    }
`

interface IMessage {
    text: string
    size?: string
    color?: string
    italic?: string
}

const Message = ({ text, size, color, italic}: any) => {
  return (
    <SLine className={`${size && size + " "} ${color && color + " "} ${italic && italic}`}>{text}</SLine>
  )
}

export default Message