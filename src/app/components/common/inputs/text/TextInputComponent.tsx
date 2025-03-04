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
  height: 45px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  background-color: ${({ theme }) => theme.color.color_2};
  padding: 4px 7px;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.color_7};
  font-family: "Helvetica", sans-serif;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.color.color_4};
  box-sizing: border-box;
  margin: 0;

  &.dark {
    background-color: ${({ theme }) => theme.color.color_2_5};
    color: ${({ theme }) => theme.color.color_8};
  }
`

const SLabel = styled.label`
  margin: 5px 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.color_5};

  &.sm {
    font-size: 0.7rem;
  }

  &.md {
    font-size: 0.9rem;
    font-weight: 300;
  }

  &.lg {
    font-size: 1.1rem;
  }
`

const SError = styled.p`
  font-size: 0.8rem;
  color: #d80000;
  font-style: italic;
  margin: 7px 0px;
  padding: 0;
`

const STextArea = styled.textarea` 
    width: 100%;
    height: 100px;
    border-radius: 5px;
    padding: 4px 7px;
    font-size: 1rem;
    background-color: #dedede;
    font-family: "Helvetica", sans-serif;
    font-weight: 500;
    border: none;
    box-sizing: border-box;
    margin: 0;
`

const TextInputComponent = ({
  inputValue,
  inputType,
  setInputValue,
  label,
  labelSize,
  selectOptions,
  setOptions,
  error, 
  inputStyles
}: any) => {
  const handleInput = (e: any) => {
    setInputValue(e.target.value)
  }

  return (
    <SContainer>
      <SLabel className={labelSize && labelSize}>{label}</SLabel>
      {inputType === "select" ? (
        <SelectInput
          defaultValue={inputValue}
          label={label.toUpperCase()}
          setInputValue={setInputValue}
          handleInput={handleInput}
        />
      ) : inputType === "text-area" ? (
        <STextArea  onChange={handleInput} value={inputValue} />
      ) : (
        <STextInput
          className={inputStyles ? inputStyles : ""}
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
