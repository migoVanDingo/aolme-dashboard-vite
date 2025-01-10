import React from "react"
import styled from 'styled-components'
import { SFlexCol } from "../common/containers/FlexContainers"

export const SContainer = styled(SFlexCol)`
  align-items: baseline;
  gap: 5px;
  position: relative;
  margin: 15px 0 5px 0;
`

export const STextInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: ${({theme}) => theme.container.borderRadius.sm};
  overflow-x: scroll;
  padding: 0px 7px;
  font-size: 1rem;
  background-color: #dedede;
  font-family: 'Helvetica', sans-serif;
  font-weight: 500;

  &.sm {
    width: 150px;
  }

  &.md {
    width: 220px; 
  }

  &.lg {
    width: 350px;
  }

  
`

export const SLabel = styled.label`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 200;
`

export const SCheckbox = styled.input.attrs({type: 'checkbox'})`

`