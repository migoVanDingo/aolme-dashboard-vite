import { useDispatch } from "react-redux"
import { UserAPI } from "../api/UserAPI"
import { PayloadLogin } from "../utility/interface/user"
import { setStoreUserId, setStoreUsername } from "../store/slices/user"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()

  async function login(payload: PayloadLogin) {
    const response = await UserAPI.login(payload)
    console.log('useAuth.ts -- login() -- response: ', response)
    const { username, userId } = response

    localStorage.setItem("userId", userId)
    localStorage.setItem("username", username)
    nav("/profile")

    /* .then((result: any) => {
            const { username, userId } = result
            console.log("useAuth.ts -- login() result: ", result)
            localStorage.setItem("userId", userId)
            localStorage.setItem("username", username)
            //localStorage.setItem("email", email)
            dispatch(setStoreUserId(userId))
            dispatch(setStoreUsername(username))
            //dispatch(setStoreUserEmail(email))

            nav("/profile")
          })
          .catch((err: any) => {
            console.error("useAuth.ts -- login() Error: ", err)
          }) */
  }

  return { login }
}
