import React from "react"
import styled from "styled-components"



const SButton = styled.button`
    color: ${({ theme }) => theme.color.color_1};
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

    &.add-stage {
        width: 150px;
        height: 40px;

        background-color: ${({ theme }) => theme.color.color_2_5};
        border-radius: ${({ theme }) => theme.container.borderRadius.md};
        border: 1px solid ${({ theme }) => theme.color.color_5};
        color: ${({ theme }) => theme.color.color_5};
        cursor: pointer;
        &:hover{
            color: ${({theme}) => theme.accent.color_1};
            border-color: ${({theme}) => theme.accent.color_1};
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
