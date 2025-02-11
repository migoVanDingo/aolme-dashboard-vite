import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import TextInputComponent from "../components/common/inputs/text/TextInputComponent"
import Button from "../components/common/buttons/Button"
import { hashed } from "../utility/hash"
import { FormCreateProfile, PayloadCreateUser } from "../utility/interface/user"
import { UserAPI } from "../api/UserAPI"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Input } from "../utility/input"
import { JobAPI } from "../api/job/JobAPI"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  background-color: ${({ theme }) => theme.color.color_2};
  min-height: 100vh;
  padding: 0 30rem;
`
const SHeading = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.color_6};
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
const SLoadingContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  align-items: center;
`

const CreateProfile = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [verifyPw, setVerifyPw] = useState<string>("")

  const [usernameError, setUsernameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [verifyError, setVerifyError] = useState<string>("")

  const [intervalId, setIntervalId] = useState<any>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [lock, setLock] = useState<boolean>(true)

  const { register } = useAuth()
  const nav = useNavigate()

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

  useEffect(() => {
    const init = () => {
      if (intervalId && !lock){
        clearInterval(intervalId)
        setTimeout(() => {
          
          nav("/login")
        }, 3000)
      }
    }

    return init()
  }, [intervalId, lock]);

  const handleCreateProfile = async () => {
    let err = false
    console.log("create profile")

    if (username === "") {
      setUsernameError("Mandatory field")
      err = true
    } else if (Input.hasHarmfulCharacters(username)) {
      setUsernameError("Invalid characters")
      err = true
    }

    if (email === "") {
      setEmailError("Mandatory field")
      err = true
    } else if (Input.hasHarmfulCharacters(email)) {
      setEmailError("Invalid characters")
      err = true
    } else if (!Input.isValidEmail(email)) {
      setEmailError("Invalid email")
      err = true
    }

    if (password == "") {
      setPasswordError("Password is a mandatory field")
      err = true
    } else {
      const { isError, errorList } = Input.verifyPassword(password) as any
      if (isError) {
        setPasswordError(errorList.join(",\n "))
        err = true
      }
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
      setLoadingMessage("Creating User Account")
      setLoading(true)
      const payload: PayloadCreateUser = {
        username,
        email,
        password,
      }

      //AuthContext
      const newUser = register(payload)
        .then((res: any) => {
          if (res) {
            console.log("res: ", res)
            handlePolling(res.data)
          }
        })
        .catch((err: any) => console.error(err))
    } else console.log("errors")
  }

  const handlePolling = (jobId: string) => {
    setIntervalId(setInterval(() => handleCheckStatus(jobId), 1000))
    
  }

  const handleCheckStatus = (jobId: string) => {
    JobAPI.pollJobStatus(jobId)
      .then((res: any) => {
        console.log(res.data.status)
        if (res.data.status === "COMPLETED") {
          setLoadingMessage("User Account Created. Redirecting to Login")
          console.log("COMPLETED --- response: ", res)
          setLock(false)
          setLoading(false)
          
          
        } else if (res.data.status === "FAILED") {
          clearInterval(intervalId)
          setLoading(false)
          console.log("FAILED --- response: ", res)
          window.alert(
            "Failed to register user, check logs and db for job_id: " + jobId,
          )
          console.error(
            "Failed to register user, check logs and db for job_id: " + jobId,
          )
        } 
      })
      .catch((err: any) =>
        console.error(
          "F:CreateNewSetLabelProject.tsx::::FN:handlePolling",
          err,
        ),
      )
  }

  if (loading) {
    return (
      <SLoadingContainer>
        <LoadingSpinner message={loadingMessage} />
      </SLoadingContainer>
    )
  } else {
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
}

export default CreateProfile
