import React from 'react'
import { SContainer, SLabel, SCheckbox } from '../../../styled/SInputs'

const CheckboxInput = ({ checked, setChecked, label }: any) => {

    const handleInput = () => {
      setChecked(!checked)
  
    }
  
    return (
      <SContainer>
        <SLabel>{label}</SLabel>
        <SCheckbox onChange={handleInput} value={checked}/>
      </SContainer>
    )
}

export default CheckboxInput