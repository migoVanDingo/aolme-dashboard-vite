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

const SOption = styled.option`
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  background-color: ${({ theme }) => theme.color.color_2_5};
`


const defaultOptions = ["No options available."]

const CustomSelect = ({
  label,
  handleInput,
  type,
  options,
}: any) => {
/*   useEffect(() => {
    console.log("Default Value: ", defaultValue)
    console.log("Label: ", label)
  }, [defaultValue]) */



  return (
    <SContainer>
      <SLabel>{label}</SLabel>

      <SSelect
        onChange={(e: any) => handleInput(e)}
        value={type}
      >
        <SOption value=""> Select Stage</SOption>
        {options.map((option: string, index: number) => {
          return (
            <SOption key={index} value={option}>
              {option}
            </SOption>
          )
        })}
      </SSelect>
    </SContainer>
  )
}

export default CustomSelect
