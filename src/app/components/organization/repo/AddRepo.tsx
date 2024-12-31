import React, { useState } from "react"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import styled from "styled-components"
import { useSelector } from "react-redux"
import TextInputComponent from "../../common/inputs/text/TextInputComponent"
import {
  FormCreateRepo,
  FormEditRepo,
  ICreateRepository,
} from "../../../utility/interface/repository"
import { RepoAPI } from "../../../api/RepoAPI"

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

const AddRepo = ({ trigger, hideCreateNew }: any) => {
  const orgId = useSelector((state: any) => state.org.storeOrgId)
  const userId = useSelector((state: any) => state.user.storeUserId)

  const [repoName, setRepoName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [owner, setOwner] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  const [repoNameError, setRepoNameError] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<string>("")
  const [ownerError, setOwnerError] = useState<string>("")
  const [statusError, setStatusError] = useState<string>("")

  const formInputs: FormCreateRepo[] = [
    {
      label: "Repository Name",
      type: "text",
      inputValue: repoName,
      setInputValue: setRepoName,
      error: repoNameError,
    },
    {
      label: "Description",
      type: "text-area",
      inputValue: description,
      setInputValue: setDescription,
      error: descriptionError,
    },
    {
      label: "Owner",
      type: "select",
      inputValue: owner,
      setInputValue: setOwner,
      error: ownerError,
    },
  ]

  const handleCreateRepo = async () => {
    const repoPayload: ICreateRepository = {
      owner: owner ? owner : userId,
      entity_id: orgId,
      entity_type: "ORGANIZATION",
      name: repoName,
      description: description,
      is_public: false,
      created_by: userId,
    }

    RepoAPI.createRepo(repoPayload)
    .then((res: any) => {
        console.log("New Repository: " , res.data)
        hideCreateNew()
        trigger()
    })
    .catch((err: any) => console.error(err))

    console.log("repoPayload: ", repoPayload)
  }
  return (
    <SContainer>
      <SHeading>Create Org Repo</SHeading>

      {formInputs.map((input: FormCreateRepo, index: number) => {
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
        <SButton onClick={handleCreateRepo} type="button">
          {"Save Changes"}
        </SButton>
        <SButton onClick={hideCreateNew} type="button">
          {"Cancel"}
        </SButton>
      </SButtonContainer>
    </SContainer>
  )
}

export default AddRepo
