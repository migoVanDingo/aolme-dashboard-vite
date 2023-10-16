import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import TextInputComponent from "../components/common/inputs/text/TextInputComponent"
import Button from "../components/common/buttons/Button"
import { hashed } from "../utility/hash"
import { PayloadCreateUser, PayloadLogin } from "../utility/interface/user"
import { UserAPI } from "../api/UserAPI"
import { store } from "../store"
import { setUserId } from "../actions"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

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

interface FormLogin {
  label: string
  type: string
  inputValue: string
  error: string
  setInputValue: (a: string) => void
}

const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [usernameError, setUsernameError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)

  const formInputs: FormLogin[] = [
    {
      label: "Username/Email",
      type: "text",
      inputValue: username,
      setInputValue: setUsername,
      error: usernameError,
    },
    {
      label: "Password",
      type: "password",
      inputValue: password,
      setInputValue: setPassword,
      error: passwordError,
    },
  ]

  const handleLogin = async () => {
    let err = false
    console.log("create profile")

    if (username === "") {
      setUsernameError("Mandatory field")
      err = true
    }

    if (password === "") {
      setPasswordError("Mandatory Field")
      err = true
    }


    

    if (!err) {
      setLoading(true)
      const hash = await hashed(password)
      const payload: PayloadLogin = {
        username,
        password: hash,
      }

      const currentUser = UserAPI.login(payload)
        .then((result: any) => {
          console.log("Login.tsx HandleLogin(): ", result.data)
          const { username, userId } = result.data

          console.log('username: ', username)
          console.log('userId: ', userId)
          store.dispatch(setUserId(userId))

          navigate('/profile')
          setLoading(false)
        })
        .catch((err: any) => {
          setLoading(false)
          console.error(
            "Login.tsx -- handleLogin() Error: ",
            err,
          )
        })
    } else console.log("errors")
  }

  return (
    <SContainer>
        
      <SHeading>Create Profile</SHeading>

      {formInputs.map((input: FormLogin, index: number) => {
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

      <SButton onClick={handleLogin} type="button">
        {"Login"}
      </SButton>
    </SContainer>
  )
}

const mapStoreStateToProps = (state: any) => {
    return {
      ...state,
    }
  }
export default connect(mapStoreStateToProps)(Login)
