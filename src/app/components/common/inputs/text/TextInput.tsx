import React from "react";
import styled from "styled-components";
import { SFlexCol } from "../../containers/FlexContainers";
import { SContainer, SLabel, STextInput } from "../../../styled/SInputs";

const STextContainer = styled(SContainer)`
  width: 100%;
`

const TextInput = ({ value, onChange, label, type, size }: any) => {
  return (
    <SContainer>
      {label && <SLabel>{label}</SLabel>}
      <STextInput
        className={size}
        type={type || "text"}
        onChange={onChange}
        value={value}
      />
    </SContainer>
  );
};

export default TextInput;
