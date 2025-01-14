import styled from "styled-components"
import { SFlexCol } from "../../containers/FlexContainers"

const SSelect = styled.select`
  width: 100%;
  height: 30px;
  border-radius: ${({theme}) => theme.container.borderRadius.sm};
  overflow-x: scroll;
  padding: 0px;
  font-size: 0.8rem;
  background-color: #dedede;
  font-family: 'Helvetica', sans-serif;
  font-weight: 500;
`
const SContainer = styled(SFlexCol)`
width: 100%;
  align-items: baseline;
  position: relative;
  margin: 15px 0;
  box-sizing: border-box;
`
const SLabel = styled.label`
  margin: 5px 0;
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_7};
  &.disabled {
    color: ${({ theme }) => theme.color.color_2};
  }

  &.sm {
    font-size: 0.7rem;
  }

  &.md {
    font-size: 1rem;
  }

  &.lg {
    font-size: 1.2rem;
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
  labelSize
}: any) => {
  return (
    <SContainer>
      <SLabel className={`${disabled && "disabled"} ${labelSize && labelSize}`}>{label}</SLabel>

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
