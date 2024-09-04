import "@mantine/core/styles.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import { useAuth } from "./app/context/AuthContext"
import CreateOrganization from "./app/pages/CreateOrganization"
import CreateRepositoryV2 from "./app/pages/CreateRepositoryV2"
import Organization from "./app/pages/Organization"
import Profile from "./app/pages/Profile"
import Repository from "./app/pages/Repository"
import Settings from "./app/pages/Settings"
import { dark_grey_1, light_grey_1 } from "./app/theme/ThemeConfig"

import { createTheme, MantineProvider } from "@mantine/core"
import ViewDataset, { loader as ViewDatasetLoader } from "./app/components/dataset/ViewDataset"
import OrgDataset from "./app/components/organization/dataset/OrgDataset"
import OrgModules from "./app/components/organization/modules/OrgModules"
import OrgRepos from "./app/components/organization/repo/OrgRepos"
import OrgSettings from "./app/components/organization/settings/OrgSettings"
import OrgUsers from "./app/components/organization/user/OrgUsers"
import Login from "./app/pages/Login"
import { loader as OrgLoader } from "./app/pages/Organization"
import { loader as ProfileLoader } from "./app/pages/Profile"
import { loader as RepoLoader } from "./app/pages/Repository"
import { loader as CreateSubsetLoader} from "./app/components/dataset/subset/CreateSubset"
import RootLayout, { loader as RootLoader } from "./app/pages/RootLayout"
import CreateSubset from "./app/components/dataset/subset/CreateSubset"

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: RootLoader,
    id: "root",
    children: [
      {
        path: "/profile",
        element: <Profile />,
        loader: ProfileLoader,
        action: () => null,
        id:"profile"
      },
      {
        path: "/settings",
        element: <Settings />,
        loader: () => null,
        action: () => null,
      },
      {
        path: "/repository/create",
        element: <CreateRepositoryV2 />,
        loader: () => null,
        action: () => null,
      },
      {
        path: "/repository/:repoName",
        element: <Repository />,
        loader: RepoLoader,
        action: () => null,
        id: "repo"
      },
      {
        path: "/organization/create",
        element: <CreateOrganization />,
        loader: () => null,
        action: () => null,
      },
      {
        path: "/organization/:orgName",
        element: <Organization />,
        loader: OrgLoader,
        action: () => null,
        id: "org", 
        children: [
          {
            path: "/organization/:orgName/datasets",
            element: <OrgDataset />,
            loader: () => null,
            action: () => null,
            id: "org-dataset"

          },
          {
            path: "/organization/:orgName/datasets/:datasetName",
            element: <ViewDataset />,
            loader: ViewDatasetLoader,
            action: () => null,
            id: "org-dataset-view"

          },
          {
            path: "/organization/:orgName/datasets/:datasetName/subset",
            element: <CreateSubset />,
            loader: CreateSubsetLoader,
            action: () => null,
            id: "org-dataset-create-subset"

          },
          {
            path: "/organization/:orgName/users",
            element: <OrgUsers />,
            loader: () => null,
            action: () => null,
            id: "org-users"

          },
          {
            path: "/organization/:orgName/repositories",
            element: <OrgRepos />,
            loader: () => null,
            action: () => null,
            id: "org-repos"

          }
          ,
          {
            path: "/organization/:orgName/modules",
            element: <OrgModules />,
            loader: () => null,
            action: () => null,
            id: "org-modules"

          }
          ,
          {
            path: "/organization/:orgName/settings",
            element: <OrgSettings />,
            loader: () => null,
            action: () => null,
            id: "org-settings"

          }
        ]
      },
     
    ],
  },
  {
    path: "/login",
    element:  <Login />,
    loader: () => null,
    action: () => null,
    id: "login"
  }
])

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
    <MantineProvider theme={mantineTheme}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </MantineProvider>
  )

  /* return (
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
  ) */
}

export default App
