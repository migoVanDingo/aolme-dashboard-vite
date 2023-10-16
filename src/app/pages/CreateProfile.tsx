import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import TextInputComponent from "../components/common/inputs/text/TextInputComponent"
import Button from "../components/common/buttons/Button"
import { hashed } from "../utility/hash"
import { PayloadCreateUser } from "../utility/interface/user"
import { UserAPI } from "../api/UserAPI"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
`
const SHeading = styled.p`
  font-size: 2rem;
  font-weight: 700;
`
const SButton = styled.button`
  width: 150px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 2px 2px 8px ${({ theme }) => theme.color.shadow.dark};
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

interface FormCreateProfile {
  label: string
  type: string
  inputValue: string
  error: string
  setInputValue: (a: string) => void
}

const CreateProfile = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [verifyPw, setVerifyPw] = useState<string>("")

  const [usernameError, setUsernameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [verifyError, setVerifyError] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

  const formInputs: FormCreateProfile[] = [
    {
      label: "Username",
      type: "text",
      inputValue: username,
      setInputValue: setUsername,
      error: usernameError,
    },
    {
      label: "Email",
      type: "email",
      inputValue: email,
      setInputValue: setEmail,
      error: emailError,
    },
    {
      label: "Password",
      type: "password",
      inputValue: password,
      setInputValue: setPassword,
      error: passwordError,
    },
    {
      label: "Verify Password",
      type: "password",
      inputValue: verifyPw,
      setInputValue: setVerifyPw,
      error: verifyError,
    },
  ]

  const handleCreateProfile = () => {
    let err = false
    console.log("create profile")

    if (username === "") {
      setUsernameError("Mandatory field")
      err = true
    }

    if (email === "") {
      setEmailError("Mandatory field")
      err = true
    }

    if (password === "") {
      setPasswordError("Mandatory Field")
      err = true
    }

    if (verifyPw === "") {
      setVerifyError("You must verify password")
      err = true
    }

    if (password !== verifyPw && password !== "" && verifyPw !== "") {
      setVerifyError("Passwords don't match")
      err = true
    }

    if (!err) {
      setLoading(true)
      const payload: PayloadCreateUser = {
        username,
        email,
        password,
      }

      UserAPI.createUser(payload)
        .then((result: any) => {
          console.log(result.data)
          setLoading(false)
        })
        .catch((err: any) => {
          setLoading(false)
          console.error(
            "CreateProfile.tsx -- handleCreateProfile() Error: ",
            err,
          )
        })
    } else console.log("errors")
  }

  return (
    <SContainer>
      <SHeading>Create Profile</SHeading>

      {formInputs.map((input: FormCreateProfile, index: number) => {
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

      <SButton onClick={handleCreateProfile} type="button">
        {"Create Profile"}
      </SButton>
    </SContainer>
  )
}

export default CreateProfile
