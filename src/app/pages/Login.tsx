import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import TextInputComponent from "../components/common/inputs/text/TextInputComponent"
import { useAuth } from "../hooks/useAuth"
import { PayloadLogin } from "../utility/interface/user"

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

interface FormLogin {
  label: string
  type: string
  inputValue: string
  error: string
  setInputValue: (a: string) => void
}

const Login = ({ userId }: any) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    console.log(userId)
  }, [])

  const formInputs: FormLogin[] = [
    {
      label: "Username/Email",
      type: "text",
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
  ]

  const handleLogin = async () => {
    let err = false
    

    if (email === "") {
      setEmailError("Mandatory field")
      err = true
    }

    if (password === "") {
      setPasswordError("Mandatory Field")
      err = true
    }

    if (!err) {
      setLoading(true)

      const payload: PayloadLogin = {
        email,
        password,
      }
      console.log("payload: ", payload)
      //AuthContext
      await login(payload) as any
      
     
    } else console.log("errors")
  }

  return (
    <SContainer>
      <SHeading>Login</SHeading>

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
