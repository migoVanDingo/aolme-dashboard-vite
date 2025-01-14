import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import {
  SFlexCol,
  SFlexRow,
} from "../../../../common/containers/FlexContainers"
import SelectInputBasic from "../../../../common/inputs/select/SelectInputBasic"

const SContainer = styled(SFlexCol)`
  width: 100%;
  align-items: baseline;

  padding: 20px 40px;
`

const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`

const SButtonContainer = styled(SFlexRow)`
width: 100%;
  gap: 20px;
  padding: 0;
  margin: 0;
`

const SButton = styled.button`
  width: 130px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_4};
    color: ${({ theme }) => theme.color.color_8};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.color_6};
    color: ${({ theme }) => theme.color.color_8};
  }

  &.push-right{
    margin-left: auto;
  }

  &.submit {
    background-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.color.color_6};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
    margin-top: 10px;
    cursor: pointer;
  }

`

const DatasetFileGroupSelect = ({ handleSubmit }: any) => {
  const datastoreConfig = useSelector(
    (state: any) => state.datastore.storeDatastoreConfig,
  )
  const [formState, setFormState] = useState<any>(
    datastoreConfig && datastoreConfig.length > 0
      ? datastoreConfig.reduce((acc: any, field: any) => {
          
          acc[field.field_name] = ""
          return acc
        }, {})
      : [],
  )

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  return (
    <SContainer>
      <SHeading>Make Selections</SHeading>

      {datastoreConfig && datastoreConfig.length > 0 ? (
        datastoreConfig.map((field: any, index: number) => {
          return (
            <SelectInputBasic
              label={field.field_label}
              name={field.field_name}
              handleChange={handleChange}
              value={formState[field.field_name]}
              defaultValue={`Select ${field.field_label}`}
              options={field.field_options}
              disabled={false}
              labelSize={"md"}
            />
          )
        })
      ) : (
        <p>No file groups available</p>
      )}
      <SButtonContainer>
      <SButton className={"push-right"}>Cancel</SButton>
        <SButton onClick={() => handleSubmit(formState)}>Submit</SButton>
        
      </SButtonContainer>
    </SContainer>
  )
}

export default DatasetFileGroupSelect
