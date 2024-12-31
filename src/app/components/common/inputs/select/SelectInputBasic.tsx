import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"

const SSelect = styled.select`
  width: 100%;
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
  &.disabled {
    color: ${({ theme }) => theme.color.color_2};
  }
`

const SelectInputBasic = ({
  label,
  name,
  handleChange,
  value,
  defaultValue,
  options,
  disabled,
}: any) => {
  return (
    <SContainer>
      <SLabel className={disabled && "disabled"}>{label}</SLabel>

      <SSelect
        onChange={(e: any) => handleChange(e)}
        value={value}
        name={name}
        disabled={disabled}
      >
        <option value={""}>{defaultValue}</option>
        {options.map((option: string, index: number) => {
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

export default SelectInputBasic
