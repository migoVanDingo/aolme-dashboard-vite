import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  gap: 5px;
  position: relative;
  margin: 15px 0;
`

const STextInput = styled.input`
  width: 220px;
  height: 30px;
  border-radius: ${({theme}) => theme.container.borderRadius.md};
  padding: 0px 7px;
  font-size: 1rem;
  background-color: ${({theme}) => theme.color.contrast.color_2};
`

const SLabel = styled.label`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 200;
`

const TextInput = ({ projectName, setProjectName }: any) => {

  const handleInput = (e: any) => {
    setProjectName(e.target.value)

  }

  return (
    <SContainer>
      <SLabel> Give your Repo a Name</SLabel>
      <STextInput onChange={handleInput} value={projectName}/>
    </SContainer>
  )
}

export default TextInput
