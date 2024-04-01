import React, { useEffect } from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"

const SSelect = styled.select`
  width: 300px;
  height: 35px;
`
const SContainer = styled(SFlexCol)`
  align-items: baseline;
  position: relative;
  margin: 15px 0;
  box-sizing: border-box;
`
const SLabel = styled.label`
  margin: 5px 0;
  font-size: 0.8rem;
  font-weight: 200;
`

const statusOptions = ["ACTIVE", "INVITED", "INACTIVE", "BANNED"]

const roleOptions = ["DEVELOPER", "OWNER", "ADMIN", "SUPERUSER"]

const defaultOptions = ["No options available."]

const SelectInput = ({
  defaultValue,
  label,
  setInputValue,
  handleInput,
  type,
  options,
}: any) => {
  useEffect(() => {
    console.log("Default Value: ", defaultValue)
    console.log("Label: ", label)
  }, [defaultValue])

  return (
    <SContainer>
        {
            label === "PROPS" && <SLabel>{"Type"}</SLabel>
        }
      <SSelect
        onChange={(e: any) => handleInput(e.target.value)}
        defaultValue={defaultValue}
        value={type}
      >
        {label === "STATUS"
          ? statusOptions.map((option: string, index: number) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            })
          : label === "ROLE"
          ? roleOptions.map((option: string, index: number) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            })
          : label === "PROPS"
          ? options.map((option: string, index: number) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            })
          : defaultOptions.map((option: string, index: number) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            })}
      </SSelect>
    </SContainer>
  )
}

export default SelectInput
