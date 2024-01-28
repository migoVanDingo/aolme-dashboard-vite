import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"
import { SContainer, SLabel, STextInput} from "../../../styled/Inputs"


const TextInput = ({ name, setName, label }: any) => {

  const handleInput = (e: any) => {
    setName(e.target.value)

  }

  return (
    <SContainer>
      <SLabel>{label}</SLabel>
      <STextInput onChange={handleInput} value={name}/>
    </SContainer>
  )
}

export default TextInput
