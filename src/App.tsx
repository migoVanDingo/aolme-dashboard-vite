import React, { useEffect, useState } from "react"
import "@mantine/core/styles.css"
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
import PrivateRoute from "./app/components/authentication/PrivateRoute"
import PublicRoute from "./app/components/authentication/PublicRoute"
import { useAuth } from "./app/context/AuthContext"
import AuthProvider from "./app/context/AuthContext"
import { useDispatch } from "react-redux"
import { setStoreUserId } from "./app/actions"
import CreateOrganization from "./app/pages/CreateOrganization"
import Organization from "./app/pages/Organization"
import CreateRepositoryV2 from "./app/pages/CreateRepositoryV2"
import Test from "./app/pages/Test"
import ActivityMap from "./app/pages/ActivityMap"

import { createTheme, MantineProvider } from "@mantine/core"
import ProfileV2 from "./app/pages/ProfileV2"
import Notebook from "./app/pages/Notebook"

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
})

const SBody = styled.div`
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_8};
  width: 100vw;

  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: helvetica;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: all 0.2s ease;

  overflow-y: auto;
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

  const { currentUser } = useAuth()
  const dispatch = useDispatch()

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
    if (theme === dark_grey_1) setTheme(light_grey_1)
    else setTheme(dark_grey_1)
  }
  return (
    <Router>
      <MantineProvider theme={mantineTheme}>
        <ThemeProvider theme={theme}>
          <SButton onClick={handleThemeChange}></SButton>

          <AuthProvider>
            <SBody>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Header />
                      <Profile />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <CreateProfile />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Header />
                      <Settings />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Header />
                      <Profile />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/repository/create"
                  element={
                    <PrivateRoute>
                      <Header />
                      <CreateRepositoryV2 />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/repository/:repoId"
                  element={
                    <PrivateRoute>
                      <Header />
                      <Repository />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/organization/create"
                  element={
                    <PrivateRoute>
                      <Header />
                      <CreateOrganization />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/organization/:orgId"
                  element={
                    <PrivateRoute>
                      <Header />
                      <Organization />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/dataset/:datasetId/activity-map/"
                  element={
                    <>
                      <PrivateRoute>
                        <Header />
                        <ActivityMap />
                      </PrivateRoute>
                    </>
                  }
                />
                <Route
                  path="/notebook"
                  element={
                    <>
                      <PrivateRoute>
                        <Header />
                        <Notebook />
                      </PrivateRoute>
                    </>
                  }
                />
              </Routes>
            </SBody>
          </AuthProvider>
        </ThemeProvider>
      </MantineProvider>
    </Router>
  )
}

export default App
