import { useEffect, useState } from "react"
import { EditUser, FormEditUser } from "../../../utility/interface/user"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import TextInputComponent from "../../common/inputs/text/TextInputComponent"
import SelectInput from "../../common/inputs/select/SelectInput"
import { UserAPI } from "../../../api/UserAPI"
import { useDispatch } from "react-redux"
import { setStoreUserEmail, setStoreUsername } from "../../../actions"

const SButtonContainer = styled(SFlexRow)`
  gap: 20px;
  padding: 0;
  margin: 0;
`

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  width: 400px;
  margin: 0 auto;
`
const SHeading = styled.p`
  font-size: 2rem;
  font-weight: 700;
`
const SButton = styled.button`
  width: 130px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_2_5};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 0px 2px 4px ${({ theme }) => theme.color.color_1};
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

const OrgEditUser = ({ user, trigger, hideEdit }: any) => {
  const [username, setUsername] = useState<string>(user.username)
  const [email, setEmail] = useState<string>(user.email)
  const [role, setRole] = useState<string>(user.roles)
  const [status, setStatus] = useState<string>(user.user_status)

  const [usernameError, setUsernameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [roleError, setRoleError] = useState<string>("")
  const [statusError, setStatusError] = useState<string>("")

  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Status: ", status)
    console.log("Role: ", role)
  }, [role, status])

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
    {
      label: "Status",
      type: "select",
      inputValue: status,
      setInputValue: setStatus,
      error: statusError,
    },
  ]

  const handleSaveUserUpdate = async () => {
    const updatePayload: EditUser = {
      user_id: user.user_id,
      roles: role,
      email: email,
      username: username,
      user_status: status,
      entity_user_id: user.entity_user_id,
    }

    console.log("Update Payload: ", updatePayload)

    UserAPI.updateUser(updatePayload, user.user_id)
      .then((result: any) => {
        console.log(result.data)
        trigger()
        hideEdit()
      })
      .catch((err: any) => {
        console.error("CreateProfile.tsx -- handleCreateProfile() Error:", err)
      })
  }

  return (
    <SContainer>
      <SHeading>Update User</SHeading>

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
        <SButton onClick={handleSaveUserUpdate} type="button">
          {"Cancel"}
        </SButton>
      </SButtonContainer>
    </SContainer>
  )
}

export default OrgEditUser
