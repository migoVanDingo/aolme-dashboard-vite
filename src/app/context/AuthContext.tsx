import React, { useContext, useState, useEffect } from "react"
import { UserAPI } from "../api/UserAPI"
import { store } from "../store"
import { setStoreUserEmail, setStoreUserId, setStoreUsername } from "../actions"
import { PayloadCreateUser, PayloadLogin } from "../utility/interface/user"
import { hashed } from "../utility/hash"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext<any | null | undefined>("")

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<any>()
  const [loading, setLoading] = useState<any>(false)
  const dispatch = useDispatch()
  const nav = useNavigate()

  //const auth = getAuth()

  useEffect(() => {
    const getUser = () => {
      let userId = localStorage.getItem("userId")
      let username = localStorage.getItem("username")
      //let email = localStorage.getItem("email")

      console.log("AuthContext::User found: ", userId, username)
      


      userId ? dispatch(setStoreUserId(userId)) : console.error("AuthContext::User not found")
      username ? dispatch(setStoreUsername(username)) : console.error("AuthContext::User not found")
      /* email ? dispatch(setStoreUserEmail(email)) : console.error("AuthContext::User not found") */

      setCurrentUser(userId)
    }

    

    return getUser()
  }, [])

  async function register(payload: PayloadCreateUser) {
    console.log("processed: ", payload)
    UserAPI.createUser(payload)
      .then((result: any) => {
        console.log(result.data)
        return result.data
      })
      .catch((err: any) => {
        console.error("AuthContext.tsx -- signUp() Error:", err)
      })
  }

  async function login(payload: PayloadLogin) {
    UserAPI.login(payload)
      .then((result: any) => {
        const { username, userId } = result
        console.log("AuthContext.tsx -- login() result: ", result.data)
        localStorage.setItem("userId", userId)
        localStorage.setItem("username", username)
        //localStorage.setItem("email", email)
        dispatch(setStoreUserId(userId))
        dispatch(setStoreUsername(username))
        //dispatch(setStoreUserEmail(email))
        setCurrentUser(userId)
        nav("/profile")
      })
      .catch((err: any) => {
        setLoading(false)
        console.error("AuthContext.tsx -- login() Error: ", err)
      })
  }

  function logout() {
    return store.dispatch(setStoreUserId(""))
  }

  function resetPassword(email: string) {
    return "NOT IMPLEMENTED"
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
