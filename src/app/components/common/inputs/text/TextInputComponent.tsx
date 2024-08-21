import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"
import SelectInput from "../select/SelectInput"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  position: relative;
  margin: 15px 0;
  box-sizing: border-box;
  width: 100%;

`

const STextInput = styled.input`
  width: 100%;
  height: 35px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  padding: 4px 7px;
  font-size: 1rem;
  background-color: #dedede;
  font-family: "Helvetica", sans-serif;
  font-weight: 500;
  border: none;
  box-sizing: border-box;
  margin: 0;
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
  margin: 7px 0px;
  padding: 0;
`

const TextInputComponent = ({
  inputValue,
  inputType,
  setInputValue,
  label,
  selectOptions,
  setOptions,
  error,
}: any) => {
  const handleInput = (e: any) => {
    setInputValue(e.target.value)
  }

  return (
    <SContainer>
      <SLabel>{label}</SLabel>
      {inputType === "select" ? (
        <SelectInput defaultValue={inputValue} label={label.toUpperCase()} setInputValue={setInputValue} handleInput={handleInput}/>
      ) : inputType === "text-area" ? (
        <textarea
          style={{
            width: "300px",
            height: "100px",
            borderRadius: "5px",
            padding: "4px 7px",
            fontSize: "1rem",
            backgroundColor: "#dedede",
            fontFamily: "Helvetica, sans-serif",
            fontWeight: "500",
            border: "none",
            boxSizing: "border-box",
            margin: "0",
          }}
          onChange={handleInput}
          value={inputValue}
        />
      ) 
      : (
        <STextInput
          type={inputType}
          onChange={handleInput}
          value={inputValue}
        />
      )}
      {error && <SError>{error}</SError>}
    </SContainer>
  )
}

export default TextInputComponent
