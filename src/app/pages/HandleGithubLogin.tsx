import React, { useEffect } from "react"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import styled from "styled-components"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"
import { useAuth } from "../hooks/useAuth"
import { UserAPI } from "../api/UserAPI"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setStoreEmail, setStoreUserId, setStoreUsername } from "../store/slices/user"
const SContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.color_2};
  min-height: 100vh;
  padding: 120px;
`

const HandleGithubLogin = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [message, setMessage] = React.useState("Signing in with Github")

  // Get query parameter
  const search = window.location.search
  const params = new URLSearchParams(search)
  const user_id = params.get("user_id")

  const [userId, setUserId] = React.useState(user_id)

  const { getAccessToken } = useAuth()

  useEffect(() => {
    const init = () => {
      if (userId) {
        // Get Access Token
        getAccessToken()
        getUser(userId)
      }
    }

    return init()
  }, [userId])

  const getUser = async (userId: string) => {
    setTimeout(async () => {
      const user = await UserAPI.getUserById(userId) as any

      if (user) {
        setMessage("Redirecting to User Dashboard")
        console.log('user', user)
        setTimeout(() => {
          // Set user in session storage
          sessionStorage.setItem("username", user.username)
          sessionStorage.setItem("userId", user.user_id)

          dispatch(setStoreUserId(user_id))
          dispatch(setStoreUsername(user.username))

          nav("/profile/projects")
        }, 2000)
      } else {
        console.log("User not found")
        setMessage("User not found")
      }
    }, 2000)
  }

  return (
    <SContainer>
      <LoadingSpinner message={message} />
    </SContainer>
  )
}

export default HandleGithubLogin
