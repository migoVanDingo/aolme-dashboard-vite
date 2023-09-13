import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

const SButton = styled.button`
    width: 110px;
    height: 30px;
    background-color: ${({theme}) => theme.color.color_2_5};
    border-radius: ${({theme}) => theme.container.borderRadius.md};
    color: ${({theme}) => theme.color.color_5};
    font-size: 0.7rem;
    gap: 3px;
    font-weight: 600;
    border: 1px solid ${({theme}) => theme.color.color_4};

    &:hover{
        background-color: ${({theme}) => theme.color.color_2};
        border: 1px solid ${({theme}) => theme.color.color_7};
        color: ${({theme}) => theme.color.color_7};
    }

`

const SIcon = styled(FontAwesomeIcon)`
    padding: 0 5px;
`


const SelectBranch = ({ branch }: any) => {
  return (
    <SButton><SIcon icon={faCodeBranch}/>Branch: {branch && branch}<SIcon icon={faCaretDown}/></SButton>
  )
}

export default SelectBranch