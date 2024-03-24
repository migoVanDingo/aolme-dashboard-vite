import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"
import { SContainer, SLabel, STextInput} from "../../../styled/SInputs"


const TextInput = ({ name, setName, label, type }: any) => {

  const handleInput = (e: any) => {
    setName(e.target.value)

  }

  return (
    <SContainer>
      <SLabel>{label}</SLabel>
      <STextInput type={type} onChange={handleInput} value={name}/>
    </SContainer>
  )
}

export default TextInput
