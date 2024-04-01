import React, { useState } from "react"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import TextInputComponent from "../../common/inputs/text/TextInputComponent"
import {
  FormCreateRepo,
  FormEditRepo,
  ICreateRepository,
} from "../../../utility/interface/repository"
import { RepoAPI } from "../../../api/RepoAPI"
import IDataset from "../../../utility/interface/dataset"
import SelectInput from "../../common/inputs/select/SelectInput"
import { DatasetAPI } from "../../../api/DatasetAPI"
import {
  setDatasetDescription,
  setDatasetId,
  setDatasetName,
} from "../../../actions"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  width: 400px;
  height: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.color_2};
  padding: 7px;
`
const SHeading = styled.p`
  font-size: 2rem;
  font-weight: 700;
`

const SButtonContainer = styled(SFlexRow)`
  gap: 20px;
  padding: 0;
  margin: 0;
`
const SButton = styled.button`
  width: 130px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_2_5};
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
`

const types = ["IMAGE", "TEXT", "AUDIO", "VIDEO"]

const CreateDataset = ({ trigger, hideCreateNew }: any) => {
  const dispatch = useDispatch()
  const { orgId, userId } = useSelector((state: any) => state)

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [type, setType] = useState<string>(types[0])
  const [status, setStatus] = useState<string>("")

  const [nameError, setNameError] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<string>("")
  const [typeError, setTypeError] = useState<string>("")
  const [statusError, setStatusError] = useState<string>("")

  const formInputs: FormCreateRepo[] = [
    {
      label: "Dataset Name",
      type: "text",
      inputValue: name,
      setInputValue: setName,
      error: nameError,
    },
    {
      label: "Type",
      type: "select",
      inputValue: type,
      setInputValue: setType,
      error: typeError,
    },
    {
      label: "Description",
      type: "text-area",
      inputValue: description,
      setInputValue: setDescription,
      error: descriptionError,
    },
  ]

  const handleCreate = async () => {
    const payload: IDataset = {
      owner: userId,
      entity_id: orgId ? orgId : userId,
      entity_type: orgId ? "ORGANIZATION" : "USER",
      name: name,
      description: description,
      is_public: false,
      type: type,
    }

    console.log("repoPayload: ", payload)

    DatasetAPI.createDataset(payload)
      .then((res) => {
        dispatch(setDatasetId(res.data.dataset_id))
        dispatch(setDatasetName(res.data.name))
        dispatch(setDatasetDescription(res.data.description))
        trigger()
        console.log(
          "CreateDataset::handleCreate():: Dataset Created: ",
          res.data,
        )
      })
      .catch((err) => {
        console.log("Dataset Creation Failed: ", err)
      })
  }

  const getDatasetTypeOptions = () => {
    return
  }

  const handleChangeSelect = (type: string) => {
    console.log("Type: ", type)
    setType(type)
  }
  return (
    <SContainer>
      <SHeading>Create Org Dataset</SHeading>

      {formInputs.map((input: FormCreateRepo, index: number) => {
        if (input.type === "select") {
          return (
            <SelectInput
              value={type}
              options={types}
              label={"PROPS"}
              handleInput={handleChangeSelect}
            />
          )
        }
        return (
          <TextInputComponent
            key={index}
            inputValue={input.inputValue}
            inputType={input.type}
            setInputValue={input.setInputValue}
            label={input.label}
            error={input.error}
          />
        )
      })}

      <SButtonContainer>
        <SButton onClick={handleCreate} type="button">
          {"Save Changes"}
        </SButton>
        <SButton onClick={hideCreateNew} type="button">
          {"Cancel"}
        </SButton>
      </SButtonContainer>
    </SContainer>
  )
}

export default CreateDataset
