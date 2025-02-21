import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Checkbox } from "@mantine/core"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import {
  useLoaderData,
  useNavigate
} from "react-router-dom"
import styled from "styled-components"
import { useSelectGroups } from "../../../hooks/useSelectGroups"
import { ICreateSubset, ILabelSubset } from "../../../utility/interface/dataset"
import { FormCreateRepo } from "../../../utility/interface/repository"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import SelectionForm from "../../common/form/SelectionForm"
import SelectInput from "../../common/inputs/select/SelectInput"
import TextInputComponent from "../../common/inputs/text/TextInputComponent"
import { mainSelectionFormProps } from "./mainSelectionFormProps"


const SContainer = styled(SFlexCol)`
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  min-height: 100vh;
  margin: 0 50px;
  background-color: ${({ theme }) => theme.color.color_2};
  padding: 20px 100px;

  grid-area: content;
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
  width: 100%;
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
  width: 100%;
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

const SFormSection = styled.label`
  margin: 20px 0;
`

const types = ["IMAGE", "TEXT", "AUDIO", "VIDEO"]

const CreateSubset = ({}: any) => {
  const { selectedDataset, datastoreGroups, datastoreEntities } =
    useLoaderData() as any
  const nav = useNavigate()

  const userId = useSelector((state: any) => state.user.storeUserId)
  const entityId = useSelector((state: any) => state.org.storeOrgId)

  const [selectedFiles, setSelectedFiles] = useState<any[]>([])
  const [dataset, setDataset] = useState<any>(selectedDataset)

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [fileSetId, setFileSetId] = useState<string>("")
  const [datasetType, setDatasetType] = useState<string>("")
  const [datasetTypeError, setDatasetTypeError] = useState<string>("")

  const [nameError, setNameError] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)

  const [isDatastoreFiles, setIsDatastoreFiles] = useState<boolean>(true)
  const [isUploadFiles, setIsUploadFiles] = useState<boolean>(false)

  const {
    formState,
    handleChange,
    formOptions,
    formDisabled,
    activityMapGroups,
    handleReset,
  } = useSelectGroups(mainSelectionFormProps, datastoreGroups)

/*   useEffect(() => {
    const init = () => {
      if(selectedDataset) {
        dispatch(setDatasetId(dataset.dataset_id))
      }
    }
    return init()
  }, [selectedDataset]); */

  const toggleFileSource = () => {
    setIsDatastoreFiles(!isDatastoreFiles)
    setIsUploadFiles(!isUploadFiles)
  }

  const inputFile = useRef(null) as any

  const handleFileReset = () => {
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
    /*    {
      label: "File Set Id",
      type: "text",
      inputValue: fileSetId,
      setInputValue: setFileSetId,
      error: fileSetError,
    }, */
    {
      label: "Dataset Type (ex. Typing, Writing, Talking, etc.)",
      type: "text",
      inputValue: datasetType,
      setInputValue: setDatasetType,
      error: datasetTypeError,
    },
    {
      label: "Description",
      type: "text-area",
      inputValue: description,
      setInputValue: setDescription,
      error: descriptionError,
    },
  ]

  const handleSubmit = () => {
    const payload = {
      owner: userId,
      entity_id: "ORG8466MS8EOVO8RR9H02ASA7",
      name: name,
      description: description,
      subset_info: formState,
      dataset_type: datasetType,
    }
    let ret = false
    if(!name){
      setNameError("Name is required")
      ret = true
    }
    if(!description){
      setDescriptionError("Description is required")
      ret = true
    }
    if(!datasetType){
      setDatasetTypeError("Dataset Type is required")
      ret = true
    }
    if(ret){
      return
    }
    /* const createSubset = DatasetAPI.createDatastoreSubset(payload)
    console.log("createSubset: ", createSubset) */
  }

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

    /* DatasetAPI.createSubset(payload, selectedFiles, (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    })
      .then((res: any) => {
        setTimeout(() => {
          console.log(
            "CreateSubset::handleCreate():: Subset Created: ",
            res.data,
          )
          initializeLabelStudio(res.data)
        }, 3000)
      })
      .then(() => {
        nav(-1)
      })

      .catch((err) => {
        console.error("CreateSubset::handleCreate():: Error: ", err)
      }) */
  }

  const initializeLabelStudio = (subset: any) => {
    /* const payload: ICreateLabelStudioProject = {
      name: subset.name,
      description: subset.description,
      owner: dataset.entity_id,
      created_by: userId,
      subset_id: subset.subset_id,
      dataset_id: dataset.dataset_id,
      entity_id: dataset.entity_id,
    }

    LabelStudioAPI.initializeLabelStudioProject(payload)
      .then((res: any) => {
        console.log("res: ", res)
        if (selectedFiles.length > 0) {
          syncLsFiles(subset)
        }
      })
      .catch((err: any) => console.error(err)) */
  }

  const syncLsFiles = (subset: any) => {
    const payload: ILabelSubset = {
      subset_id: subset.subset_id,
      dataset_id: dataset.dataset_id,
      entity_id: dataset.entity_id,
    }
    console.log("syncLSFiles payload: ", payload)

/*     LabelStudioAPI.syncLabelStudioFiles(payload, fileSetId)
      .then((res: any) => {
        console.log("syncLSFiles res: ", res)
      })
      .catch((err: any) => console.error(err)) */
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
              defaultValue={types[0]}
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

      <SFormSection>
        Use AOLME Datastore
        <Checkbox checked={isDatastoreFiles} onClick={toggleFileSource} />
      </SFormSection>

      <SFormSection>
        Upload Files to Datastore
        <Checkbox checked={isUploadFiles} onClick={toggleFileSource} />
      </SFormSection>

      {isUploadFiles ? (
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
      ) : (
        <SelectionForm
          selectionFormProps={mainSelectionFormProps}
          formState={formState}
          handleChange={handleChange}
          formOptions={formOptions}
          formDisabled={formDisabled}
          handleReset={handleReset}
          /* handleSubmit={handleSubmit} */
        />
      )}

      <SButtonContainer>
        <SButton onClick={handleSubmit} type="submit">
          {"Save Changes"}
        </SButton>
        <SButton onClick={() => nav(-1)} type="button">
          {"Cancel"}
        </SButton>
      </SButtonContainer>
    </SContainer>
  )
}

export default CreateSubset

export const loader = async () => {
  const selectedDataset = JSON.parse(
    sessionStorage.getItem("selectedDataset") as any,
  )
  //const datastoreEntities = await DatasetAPI.getGroupEntities()

  //console.log("dataStoreEntites: ", datastoreEntities)

  //const groups = await DatastoreAPI.getGroups()

  return {
    //datastoreGroups: groups,
    selectedDataset,
  }
}
function dispatch(arg0: { type: string; datasetId: string }) {
  throw new Error("Function not implemented.")
}

