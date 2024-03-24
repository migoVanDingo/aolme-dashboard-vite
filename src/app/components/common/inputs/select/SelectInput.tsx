import React, { useEffect } from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"

const SSelect = styled.select`
    width: 300px;
    height: 35px;
`

const statusOptions = [
    "ACTIVE",
    "INVITED",
    "INACTIVE",
    "BANNED"
]

const roleOptions = [
    "DEVELOPER",
    "OWNER",
    "ADMIN",
    "SUPERUSER"
]

const defaultOptions = [
    "No options available."
]


const SelectInput = ({ defaultValue, label, setInputValue, handleInput }: any) => {
    useEffect(() => {
        console.log("Default Value: ", defaultValue)
        console.log('Label: ', label)
    }   , [defaultValue])

  return (

      <SSelect onChange={handleInput} defaultValue={defaultValue}>
        {
            label === "STATUS" ? statusOptions.map((option: string, index: number) => {
                return <option key={index} value={option}>{option}</option>
            }) : label === "ROLE" ? roleOptions.map((option: string, index: number) => {
                return <option key={index} value={option}>{option}</option>
            }) : defaultOptions.map((option: string, index: number) => {
                return <option key={index} value={option}>{option}</option>
            })
        }
      </SSelect>

  )
  
}

export default SelectInput
