import React from 'react'
import Header from '../components/header/Header'
import { Outlet, useLoaderData } from 'react-router-dom'

const RootLayout = () => {

   const { uid, username} = useLoaderData() as { uid: string, username: string}

    return (
      <>
          <Header username={username}/>
          <Outlet />
      </>
    )
  }
  
  export default RootLayout

  export const loader = () => {
    const uid = localStorage.getItem("userId")
    const username = localStorage.getItem("username")

    console.log('RootLayout.tsx -- loader() -- uid: ', uid)

    return {
      uid,
      username
    }

  }