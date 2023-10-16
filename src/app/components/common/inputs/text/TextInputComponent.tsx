import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  position: relative;
  margin: 15px 0;
`

const STextInput = styled.input`
  width: 300px;
  height: 35px;
  border-radius: ${({theme}) => theme.container.borderRadius.sm};
  padding: 4px 7px;
  font-size: 1rem;
  background-color: #dedede;
  font-family: 'Helvetica', sans-serif;
  font-weight: 500;
  border: none;
`

const SLabel = styled.label`
  margin: 5px 0;
  font-size: 0.8rem;
  font-weight: 200;
`

const SError = styled.p`
    font-size: 0.8rem;
    color: #d80000;
    font-style: italic;
    margin: 0;
    padding: 0;
`

const TextInputComponent = ({ inputValue, inputType, setInputValue, label, error }: any) => {

  const handleInput = (e: any) => {
    setInputValue(e.target.value)

  }

  return (
    <SContainer>
      <SLabel>{label}</SLabel>
      <STextInput type={inputType} onChange={handleInput} value={inputValue}/>
      {
        error && (
            <SError>{error}</SError>
        )
      }
    </SContainer>
  )
}

export default TextInputComponent
