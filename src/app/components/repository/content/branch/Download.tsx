import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const SButton = styled.button`
    margin-left: auto;
    width: 110px;
    height: 30px;
    background-color: ${({theme}) => theme.accent.color_1_dim};
    border-radius: ${({theme}) => theme.container.borderRadius.md};
    color: ${({theme}) => theme.color.color_8};
    font-size: 0.7rem;
    border: none;
    gap: 3px;
    font-weight: 600;

    &:hover{
        background-color: ${({theme}) => theme.accent.color_1};
    }


`
const SIcon = styled(FontAwesomeIcon)`
    margin-left: 10px;
`

const Download = () => {
  return (
    <SButton>Download<SIcon icon={faCaretDown}/></SButton>
  )
}

export default Download