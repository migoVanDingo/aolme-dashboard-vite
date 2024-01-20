import React, { useContext, useState, useEffect } from "react"
import { UserAPI } from "../api/UserAPI"
import { store } from "../store"
import { setUserId } from "../actions"
import { PayloadCreateUser, PayloadLogin } from "../utility/interface/user"
import { hashed } from "../utility/hash"

const AuthContext = React.createContext<any | null | undefined>("")

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<any>()
  const [loading, setLoading] = useState<any>(false)

  //const auth = getAuth()

  /* useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []); */

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

  function login(payload: PayloadLogin) {
    UserAPI.login(payload)
      .then((result: any) => {
        console.log("Login.tsx HandleLogin(): ", result.data)
        const { username, userId } = result.data

        store.dispatch(setUserId(userId))

        return result.data
      })
      .catch((err: any) => {
        setLoading(false)
        console.error("AuthContext.tsx -- login() Error: ", err)
      })
  }

  function logout() {
    return store.dispatch(setUserId(""))
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
