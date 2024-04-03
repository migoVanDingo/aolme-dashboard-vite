import React, { useRef, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import { useDispatch, useSelector } from "react-redux"
import { FormCreateRepo } from "../../../utility/interface/repository"
import SelectInput from "../../common/inputs/select/SelectInput"
import TextInputComponent from "../../common/inputs/text/TextInputComponent"
import QuickUpload from "../../repository/content/files/QuickUpload"
import FileUpload from "../../common/inputs/file-upload/FileUpload"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { ICreateSubset } from "../../../utility/interface/dataset"
import { DatasetAPI } from "../../../api/DatasetAPI"

const SContainer = styled(SFlexCol)`
  align-items: flex-start;
  width: 400px;
  height: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.color_2};
  padding: 7px;
`
const SHeading = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  padding-bottom: 0;
`

const SDatasetId = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
  margin: 5px 0 0;
  color: ${({ theme }) => theme.color.color_6};
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

const SButtonContainer2 = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`

const SIcon = styled(FontAwesomeIcon)`
  border: none;
  position: absolute;
  padding-left: 5px;
`

const SInput = styled.input`
  font-size: ${({ theme }) => theme.color.color_2};
  cursor: pointer;
  height: 100%;
  z-index: 10;
  &::file-selector-button {
    border: none;
    

    padding-left: 30px;
    color: ${({ theme }) => theme.color.color_6};
    background-color: transparent;
    border-right: 2px solid ${({ theme }) => theme.color.color_1};
    height: 100%;
    cursor: pointer;
  }
`

const SInnerContainer = styled(SFlexRow)`
  background-color: ${({ theme }) => theme.color.color_3};
  font-size: 1rem;
  width: 300px;
  height: 35px;
  align-items: center;
  
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
  }
`

const SButton2 = styled.button`
  width: 1fr;
  margin-left: auto;
`

const types = ["IMAGE", "TEXT", "AUDIO", "VIDEO"]

const CreateSubset = ({ dataset, createViewInactive, triggerRender }: any) => {
  const dispatch = useDispatch()
  const { orgId, userId } = useSelector((state: any) => state)

  const [selectedFiles, setSelectedFiles] = useState<any[]>([])

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [type, setType] = useState<string>(types[0])
  const [status, setStatus] = useState<string>("")

  const [nameError, setNameError] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<string>("")
  const [typeError, setTypeError] = useState<string>("")
  const [statusError, setStatusError] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)

  const inputFile = useRef(null)

  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = ""
      inputFile.current.type = "text"
      inputFile.current.type = "file"
    }
  }

  const formInputs: FormCreateRepo[] = [
    {
      label: "Subset Name",
      type: "text",
      inputValue: name,
      setInputValue: setName,
      error: nameError,
    },
    /* {
        label: "Type",
        type: "select",
        inputValue: type,
        setInputValue: setType,
        error: typeError,
      }, */
    {
      label: "Description",
      type: "text-area",
      inputValue: description,
      setInputValue: setDescription,
      error: descriptionError,
    },
  ]

  const handleCreate = async () => {
    //add this to .then() of the api call
    //--> handleReset()

    const payload: ICreateSubset = {
      owner: userId,
      dataset_id: dataset.dataset_id,
      name: name,
      description: description,
      is_public: false,
    }

    DatasetAPI.createSubset(payload, selectedFiles, (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    })
      .then((res) => {
        console.log("CreateSubset::handleCreate():: Subset Created: ", res.data)
        createViewInactive()
        triggerRender()
        handleReset()
      })
      .catch((err) => {
        console.error("CreateSubset::handleCreate():: Error: ", err)
      })
  }

  const handleChangeSelect = (type: string) => {
    console.log("Type: ", type)
  }

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files)
  }

  return (
    <SContainer>
      <SHeading>Create Subset</SHeading>
      <SDatasetId>Dataset: {dataset.name}</SDatasetId>
      <SDatasetId>ID: {dataset.dataset_id}</SDatasetId>

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

      <SInnerContainer>
        <SIcon icon={faUpload} />
        <SInput
          name="files"
          type="file"
          ref={inputFile}
          onChange={handleFileChange}
          multiple
        />
      </SInnerContainer>

      <SButtonContainer>
        <SButton onClick={handleCreate} type="button">
          {"Save Changes"}
        </SButton>
        <SButton onClick={createViewInactive} type="button">
          {"Cancel"}
        </SButton>
      </SButtonContainer>
    </SContainer>
  )
}

export default CreateSubset
