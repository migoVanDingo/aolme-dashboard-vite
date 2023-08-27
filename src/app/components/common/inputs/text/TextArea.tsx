import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  gap: 5px;
  position: relative;
  margin: 15px 0;
`

const STextArea = styled.textarea`
  width: 500px;
  height: 200px;
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
const TextArea = ({ projectDescription, setProjectDescription }: any) => {

  const handleInput = (e: any) => {
    setProjectDescription(e.target.value)

  }

  return (
    <SContainer>
      <SLabel> Description</SLabel>
      <STextArea onChange={handleInput} value={projectDescription}/>
    </SContainer>
  )
}

export default TextArea