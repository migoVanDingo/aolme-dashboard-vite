import { Form } from "react-router-dom"
import SelectInputBasic from "../inputs/select/SelectInputBasic"
import styled from "styled-components"
import { SFlexCol } from "../containers/FlexContainers"

const SContainer = styled(SFlexCol)`
  width: 620px;
  gap: 10px;
  padding: 50px;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.color.color_4};
`

const SForm = styled(Form)`
    width: 100%;
`
const SHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  padding: 20px 10px 10px 0;
  margin: 0;
  background-color: ${({ theme }) => theme.color.color_2};

  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  box-sizing: border-box;
  width: 100%;
`

export interface ISelectionFormProps {
  label: string
  name: string
  defaultValue: string
  options: string[]
  disabled: boolean
}

const SelectionForm = ({
  selectionFormProps,
  formState,
  handleChange,
  formOptions,
  formDisabled,
  handleReset,
  handleSubmit,
}: any) => {
  return (
    <SContainer>
      <SHeading>Select Subset Group</SHeading>
      <SForm method="post">
        {selectionFormProps.map(
          (selector: ISelectionFormProps, index: number) => {
            return (
              <SelectInputBasic
                key={index}
                label={selector.label}
                name={selector.name}
                defaultValue={selector.defaultValue}
                handleChange={handleChange}
                value={formState[selector.name]}
                options={formOptions[selector.name]}
                disabled={formDisabled[selector.name]}
              />
            )
          },
        )}

        {/* <button type="submit">submit</button> */}
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </SForm>
    </SContainer>
  )
}

export default SelectionForm
