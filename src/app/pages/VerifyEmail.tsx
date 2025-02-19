import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useSelector } from "react-redux"
import { UserAPI } from "../api/UserAPI"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"

const SContainer = styled(SFlexCol)`
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.color.color_1};
  color: ${({ theme }) => theme.color.color_5};
  font-size: 2rem;
  font-weight: 700;
  font-family: "Helvetica", sans-serif;
`
const SHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  font-family: "Helvetica", sans-serif;
`

const SSubHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "Helvetica", sans-serif;
`

const VerifyEmail = () => {
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const [toggle, setToggle] = useState<string>("LOADING")

  useEffect(() => {
    const init = () => {
      if (token !== null && token !== "") {
        console.log('VerifyEmail.tsx "token" is not null')
        setTimeout(() => {
        handleVerifyEmail(token)
        }, 2000)
      }
    }

    return init()
  }, [token])

  const handleVerifyEmail = (token: string) => {
    UserAPI.verifyEmail(token)
      .then((result: any) => {
        if (result.status === "SUCCESS") {
          setToggle("SUCCESS")
          setTimeout(() => {
            console.log('REDIRECTING TO LOGIN')
            nav("/login")
          }, 3000)
        }
      })
      .catch((error: any) => {
        console.error("VerifyEmail.tsx -- handleVerifyEmail() error: ", error)
        setToggle("FAILED")
      })
  }

  if (toggle === "SUCCESS") {
    return (
      <SContainer>
        <SHeading>Account verified!</SHeading>
        <SSubHeading>You will be redirected</SSubHeading>
      </SContainer>
    )
  } else if (toggle === "LOADING") {
    return (
      <SContainer>
        <LoadingSpinner message={"Verifying..."} />
      </SContainer>
    )
  } else if (toggle === "FAILED") {
    return (
      <SContainer>
        <SHeading>There was a problem verifying your account</SHeading>
        {/*  <SSubHeading>You will be redirected</SSubHeading> */}
      </SContainer>
    )
  }
}

export default VerifyEmail
