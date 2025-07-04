import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import TextInputComponent from "../components/common/inputs/text/TextInputComponent"
import { useAuth } from "../hooks/useAuth"
import { PayloadLogin } from "../utility/interface/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons"
import { UserAPI } from "../api/UserAPI"
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth } from "../services/firebase"

const SContainer = styled(SFlexCol)`
  align-items: center;
  background-color: ${({ theme }) => theme.color.color_2};
  min-height: 100vh;
  padding: 120px;
`
const SFormContainer = styled(SFlexCol)`
  border: 2px solid ${({ theme }) => theme.color.color_3};
  padding: 2rem;
  width: 400px;
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};
`

const SLoginFormContainer = styled(SFlexCol)`
  width: 100%;
  padding-bottom: 2rem;

  &:first-child {
    border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
  }
`

const SHeading = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.color_6};
`
const SButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.color.color_3};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_2_5};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow.dark};
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

const SIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
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
      label: "Email",
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
      ;(await login(payload)) as any
    } else console.log("errors")
  }

  const handleGithubLogin = async () => {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();

    console.log("GitHub user:", user);
    console.log("Firebase ID Token:", idToken);

    // send token to FastAPI backend if needed
  } catch (err) {
    console.error("GitHub login error", err);
  }
};
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login Success:", result.user);
      const idToken = await result.user.getIdToken();
      console.log("ID Token:", idToken);
    } catch (err) {
      console.error("Google Login Error", err);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Email Login Success:", result.user);
      const idToken = await result.user.getIdToken();
      console.log("ID Token:", idToken);
    } catch (err) {
      console.error("Email Login Error", err);
    }
  };


  return (
    <SContainer>
      <SFormContainer>
        <SLoginFormContainer>
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

          <SButton onClick={handleEmailLogin} type="button">
            {"Login"}
          </SButton>
        </SLoginFormContainer>

        <SLoginFormContainer>
        <SHeading>Or</SHeading>
        <SButton onClick={handleGithubLogin} type="button">
            Login with Github <SIcon icon={faGithub} />
          </SButton>

          <SButton onClick={handleGoogleLogin} type="button">
            Login with Google <SIcon icon={faGoogle} />
          </SButton>
        </SLoginFormContainer>
      </SFormContainer>
    </SContainer>
  )
}

const mapStoreStateToProps = (state: any) => {
  return {
    ...state,
  }
}
export default connect(mapStoreStateToProps)(Login)
