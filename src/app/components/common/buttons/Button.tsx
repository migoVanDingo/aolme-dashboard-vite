import React from "react"
import styled from "styled-components"



const SButton = styled.button`

    &.edit-profile {
        width: 80%;
        height: 25px;
        border-radius: 8px;
        background-color: ${({theme}) => theme.accent.color_1};
        border: none;

        &:active{
            background-color: ${({theme}) => theme.accent.color_1_dim};
        }
    }
`

const Button = ({ handleClick, className, innerHtml }: any) => {
  return (
    <SButton onClick={handleClick} className={className}>
      {innerHtml}
    </SButton>
  )
}

export default Button
