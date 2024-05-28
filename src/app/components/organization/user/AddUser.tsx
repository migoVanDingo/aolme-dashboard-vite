import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import {
  EditUser,
  FormEditUser,
  PayloadCreateUser,
} from "../../../utility/interface/user"
import TextInputComponent from "../../common/inputs/text/TextInputComponent"
import { UserAPI } from "../../../api/UserAPI"
import { useSelector } from "react-redux"

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
const AddUser = ({ trigger, hideCreateNew }: any) => {
  const orgId = useSelector((state: any) => state.orgId)
  const userId = useSelector((state: any) => state.userId)

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  const [usernameError, setUsernameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [roleError, setRoleError] = useState<string>("")
  const [statusError, setStatusError] = useState<string>("")

  const formInputs: FormEditUser[] = [
    {
      label: "Username",
      type: "text",
      inputValue: username,
      setInputValue: setUsername,
      error: usernameError,
    },
    {
      label: "Email",
      type: "text",
      inputValue: email,
      setInputValue: setEmail,
      error: emailError,
    },
    {
      label: "Role",
      type: "select",
      inputValue: role,
      setInputValue: setRole,
      error: roleError,
    },
/*     {
      label: "Status",
      type: "select",
      inputValue: status,
      setInputValue: setStatus,
      error: statusError,
    }, */
  ]

  const handleSaveUserUpdate = async () => {
    let err = false
    console.log("Update profile")

    if(username === "") setUsernameError("Username is required")
    if(email === "") setEmailError("Email is required")
        

    const updatePayload: PayloadCreateUser = {
      username,
      email,
      roles: role,
      created_by: userId,
    }

    console.log("Update Payload: ", updatePayload)

    UserAPI.createOrgUser(updatePayload, orgId)
      .then((result: any) => {
        console.log(result.data)
        
        trigger()
        hideCreateNew()
      })
      .catch((err: any) => {
        console.error("CreateProfile.tsx -- handleCreateProfile() Error:", err)
      })

    if (!err) {
    }
  }

  return (
    <SContainer>
      <SHeading>Add Org User</SHeading>

      {formInputs.map((input: FormEditUser, index: number) => {
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
      <SButton onClick={handleSaveUserUpdate} type="button">
        {"Save Changes"}
      </SButton>
      <SButton onClick={hideCreateNew} type="button">
        {"Cancel"}
      </SButton>
      </SButtonContainer>
    </SContainer>
  )
}

export default AddUser
