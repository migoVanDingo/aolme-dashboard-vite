import { useDispatch } from "react-redux"
import { UserAPI } from "../api/UserAPI"
import { PayloadCreateUser, PayloadLogin } from "../utility/interface/user"
import { setStoreUserId, setStoreUsername } from "../store/slices/user"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()

  async function login(payload: PayloadLogin) {
    const response = await UserAPI.login(payload)
    console.log('useAuth.ts -- login() -- response: ', response)
    const { username, user_id } = response

    localStorage.setItem("userId", user_id)
    localStorage.setItem("username", username)
    dispatch(setStoreUserId(user_id))
    dispatch(setStoreUsername(username))
    nav("/profile/projects")

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

  async function register(payload: PayloadCreateUser) {
      console.log("Request register: ", payload)
      UserAPI.createUser(payload)
        .then((result: any) => {
          console.log("AuthContext.tsx -- signUp() result: ", result.data)
          console.log(result.data)
          return result.data
        })
        .catch((err: any) => {
          console.error("AuthContext.tsx -- signUp() Error:", err)
        })
    }

  return { login, register }
}
