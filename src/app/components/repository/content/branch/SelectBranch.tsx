import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

const SButton = styled.button`
    width: 110px;
    height: 30px;
    background-color: ${({theme}) => theme.button.branch.neutral};
    border-radius: ${({theme}) => theme.container.borderRadius.md};
    color: ${({theme}) => theme.button.text.neutral};
    font-size: 0.7rem;
    border: none;
    gap: 3px;
    font-weight: 600;
    border: 1px solid ${({theme}) => theme.button.text.neutral};

    &:hover{
        background-color: ${({theme}) => theme.button.branch.hover};
        border: 1px solid ${({theme}) => theme.button.text.hover};
        color: ${({theme}) => theme.button.text.hover};
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