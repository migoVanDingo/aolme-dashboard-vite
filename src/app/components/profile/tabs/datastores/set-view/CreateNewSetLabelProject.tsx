import React, { useRef, useState } from "react"
import styled from "styled-components"
import {
  SFlexCol,
  SFlexRow,
} from "../../../../common/containers/FlexContainers"
import TextInputComponent from "../../../../common/inputs/text/TextInputComponent"
import SelectInputBasic from "../../../../common/inputs/select/SelectInputBasic"
import LoadingSpinner from "../../../../common/loading/LoadingSpinner"
import { useSelector } from "react-redux"
import { PayloadCreateLabelProject } from "../../../../../api/labeler/payload/PayloadCreateLabelProject"

const SContainer = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-areas:
    "top"
    "bottom";
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
`

const SHeader = styled(SFlexRow)`
  grid-area: top;
  padding: 20px 25px;
`

const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
  width: 100%;

  &.sm {
    font-size: 1.2rem;
  }

  &.lg {
    font-size: 1.8rem;
  }
`

const STextDivider = styled.p`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`

const SForm = styled(SFlexCol)`
  grid-area: bottom;
  padding: 0 25px 25px;
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
`

const SDivider = styled.div`
  width: 100%;
  padding: 10px 25px;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_4};
`

const SLabelHeadingContainer = styled(SFlexRow)`
  width: 100%;
  gap: 10px;
  margin: 20px 0;
`

const SButton = styled.button`
  width: 130px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  background-color: ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_8};
  box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  margin-top: 10px;
  cursor: pointer;

  &.submit {
    background-color: ${({ theme }) => theme.accent.color_1};
  }

  &.push-right {
    margin-left: auto;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.color_4};
    color: ${({ theme }) => theme.color.color_8};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.color_6};
    color: ${({ theme }) => theme.color.color_8};
  }
`

const SLoadingContainer = styled(SFlexCol)`
    width: 100%;
    height: 100%;
    align-items: center;

    `

const SError = styled.p`
    color: #cc0505;
    background-color: ${({ theme }) => theme.color.color_1};
    padding: 10px;
    border-radius: ${({ theme }) => theme.container.borderRadius.sm};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
    margin-top: 10px;
    `

const CreateNewSetLabelProject = ({ scrollTop, fileSet, setMetadata }: any) => {

    const userId = useSelector((state: any) => state.user.storeUserId)
    const datasetId = useSelector((state: any) => state.dataset.datasetId)
    const datastoreId = useSelector((state: any) => state.datastore.storeDatastoreId)
 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formState, setFormState] = useState({
    template: "Make a Selection",
    projectName: "",
    description: "",
    instructions: "",
    fps: 0,
    labels: [""], // Start with one label
  })

  const handleAddLabel = () => {
    setFormState((prevState) => ({
      ...prevState,
      labels: [...prevState.labels, ""], // Add empty string for a new label
    }))
  }

  const handleLabelChange = (index: number, value: string) => {
    setFormState((prevState) => {
      const updatedLabels = [...prevState.labels]
      updatedLabels[index] = value
      return { ...prevState, labels: updatedLabels }
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }))
  }

  const handleChangeTemplate = (e: any) => {
    handleInputChange("template", e.target.value)
  }

  const handleSubmit = () => {
    
    setError("")
    if(formState.template === "Make a Selection" && formState.projectName === ""){
        setError("You must select a template or provide a project name")
        scrollTop()
    }

    const payload = PayloadCreateLabelProject({userId, datasetId, datastoreId, fileSet, metadata: setMetadata, projectInfo: formState})

    


  }

  const isTemplateSelected = formState.template !== "Make a Selection"

  if (loading) {
    return (
    <SLoadingContainer>
        <LoadingSpinner message={"Initializing Labeling Project"} />
    </SLoadingContainer>
    )
  } else {
    return (
      <SContainer>
        <SHeader>
          <SHeading>Create New Label Project</SHeading>
        </SHeader>

        <SForm>
            {
                error && error !== "" && <SError>{error}</SError>
            }
   
          <SelectInputBasic
            label={"Select from Template"}
            handleChange={handleChangeTemplate}
            value={formState.template ? formState.template : "Make a Selection"}
            options={[
              "Make a Selection",
              "keyboard-detection",
              "table-roi",
              "ground-truth",
            ]}
          />

          {!isTemplateSelected && (
            <>
              <STextDivider>OR</STextDivider>
              <TextInputComponent
                label={"Name of New Project Template"}
                labelSize={"md"}
                inputValue={formState.projectName}
                setInputValue={(value: any) =>
                  handleInputChange("projectName", value)
                }
              />

              <SDivider />

              <TextInputComponent
                inputType={"text"}
                label={"Frames Per Second (Enter integer value e.g. 30)"}
                labelSize={"md"}
                inputValue={formState.fps}
                setInputValue={(value: any) =>
                  handleInputChange("fps", value)
                }
              />

              <TextInputComponent
                inputType={"text-area"}
                label={"Description (Optional)"}
                labelSize={"md"}
                inputValue={formState.description}
                setInputValue={(value: any) =>
                  handleInputChange("description", value)
                }
              />

              <TextInputComponent
                inputType={"text-area"}
                label={"Labeling Instructions (Optional)"}
                labelSize={"md"}
                inputValue={formState.instructions}
                setInputValue={(value: any) =>
                  handleInputChange("instructions", value)
                }
              />
            </>
          )}

          <SLabelHeadingContainer>
            <SHeading>Add Labels</SHeading>
            <SButton onClick={handleAddLabel}>Add Label</SButton>
          </SLabelHeadingContainer>

          {formState.labels.map((label: any, index: number) => (
            <TextInputComponent
              key={index}
              inputValue={label}
              setInputValue={(value: any) => handleLabelChange(index, value)}
              label={"Label Name"}
              labelSize={"md"}
            />
          ))}

          <SLabelHeadingContainer>
            <SButton className={"push-right submit"} onClick={handleSubmit}>
              Create Project
            </SButton>
          </SLabelHeadingContainer>
        </SForm>
      </SContainer>
    )
  }
}

export default CreateNewSetLabelProject
