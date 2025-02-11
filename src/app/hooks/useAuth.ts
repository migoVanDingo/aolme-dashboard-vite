import { useDispatch } from "react-redux"
import { UserAPI } from "../api/UserAPI"
import { PayloadCreateUser, PayloadLogin, PayloadVerifyEmail } from "../utility/interface/user"
import { setStoreUserId, setStoreUsername } from "../store/slices/user"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const useAuth = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  
  const [ipAddress, setIpAddress] = useState<string>("");

  useEffect(() => {
    const init = () => {
      fetchIpAddress();
    }

    return init();
  }, []);

  const fetchIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };


  async function login(payload: PayloadLogin) {
    const response = await UserAPI.login(payload)
    console.log('useAuth.ts -- login() -- response: ', response)

    if (response.status === "FAILED") {
      return { status: "FAILED", message: response.error }
    }
    const { username, user_id } = response.user
    sessionStorage.setItem("access_token", response.access_token)

    sessionStorage.setItem("userId", user_id)
    sessionStorage.setItem("username", username)

    dispatch(setStoreUserId(user_id))
    dispatch(setStoreUsername(username))
    nav("/profile/projects")

  }

  async function register(payload: PayloadCreateUser) {
      console.log("Request register: ", payload)

      let registerPayload = {
        ...payload,
        ip:""
      }

      if(ipAddress){
        registerPayload.ip = ipAddress;
      }
      
      return await UserAPI.register(registerPayload)
    }

    

  return { login, register }
}
