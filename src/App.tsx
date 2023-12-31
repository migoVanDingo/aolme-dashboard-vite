import React, { useState } from "react"
import styled, { ThemeProvider } from "styled-components"
import { light, dark, dark_grey_1, light_grey_1 } from "./app/theme/ThemeConfig"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Repository from "./app/pages/Repository"
import Settings from "./app/pages/Settings"
import Profile from "./app/pages/Profile"
import Header from "./app/components/header/Header"
import CreateRepository from "./app/pages/CreateRepository"
import CreateProfile from "./app/pages/CreateProfile"
import Login from "./app/pages/Login"

const SBody = styled.div`
  background-color: ${({ theme }) => theme.color.color_0};
  color:${({ theme }) => theme.color.color_8};
  width: 100vw;

  height: 100%;


  position: absolute;
  top:0;
  left:0;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: helvetica;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: all 0.2s ease;

  overflow-y: scroll;
  

`
const SButton = styled.button`
  height: 20px;
  width: 20px;
  background-color: ${({ theme }) => theme.color.color_2};

  z-index: 1000;

  position: fixed;
  bottom: 0;
`

function App() {
  const [theme, setTheme] = useState<object>(dark_grey_1)

  function selectTheme(e: any) {
    switch (e.target.value) {
      case "dark":
        setTheme(dark_grey_1)
        break
      case "light":
        setTheme(light_grey_1)
        break

      default:
        setTheme(dark_grey_1)
        break
    }
  }

  const handleThemeChange = () => {
    if(theme === dark_grey_1)
      setTheme(light_grey_1)
    else 
      setTheme(dark_grey_1)
  }
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SButton onClick={handleThemeChange} ></SButton>
        
        <SBody>
          <Header />
        
          <Routes>
            <Route path="/" element={<Profile />} />

            <Route path="/login" element={<Login />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/profile/signup" element={<CreateProfile />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/project/:projectId" element={<Repository />} />

            <Route path="/project/create" element={<CreateRepository />} />
          </Routes>
        </SBody>
      </ThemeProvider>
    </Router>
  )
}

export default App
