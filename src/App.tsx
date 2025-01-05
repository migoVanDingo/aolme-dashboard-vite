import "@mantine/core/styles.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import { useAuth } from "./app/context/AuthContext"
import CreateOrganization from "./app/pages/CreateOrganization"
import CreateRepositoryV2 from "./app/pages/CreateProject"
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
import { loader as ProfileLoader } from "./app/components/profile/ProfileLayout"
import { loader as RepoLoader } from "./app/pages/Repository"
import { loader as CreateSubsetLoader } from "./app/components/dataset/subset/CreateSubset"
import { loader as DatastoreDashboardLoader } from "./app/components/organization/datastore/DatastoreDashboard"
import { loader as ViewDatastoreLoader } from "./app/components/organization/datastore/ViewDatastore"
import { loader as DatastoreSubsetDetailsLoader } from "./app/components/organization/datastore/DatastoreSubsetDetails"
import { loader as CreateProjectLoader } from "./app/pages/CreateProject"
import { loader as ProjectLoader } from "./app/components/project/ProjectLayout"
import { loader as ProfileProjectsLoader } from "./app/components/profile/tabs/projects/ProjectList"
import { loader as ProDatastoreDashLoader } from "./app/components/profile/tabs/datastores/ProDatastoresDash"
import { loader as CreateDatastoreLoader } from "./app/pages/CreateDatastore"
import RootLayout, { loader as RootLoader } from "./app/pages/RootLayout"
import CreateSubset from "./app/components/dataset/subset/CreateSubset"
import DatastoreDashboard from "./app/components/organization/datastore/DatastoreDashboard"
import ViewDatastore from "./app/components/organization/datastore/ViewDatastore"
import DatastoreSubsetList from "./app/components/organization/datastore/DatastoreSubsetList"
import DatastoreSubsetDetails from "./app/components/organization/datastore/DatastoreSubsetDetails"
import CreateProfile from "./app/pages/CreateProfile"
import ProfileLayout from "./app/components/profile/ProfileLayout"
import ProProjectsDash from "./app/components/profile/tabs/projects/ProProjectsDash"
import ProDatasetsDash from "./app/components/profile/tabs/datastores/ProDatastoresDash"
import ProTeamsDash from "./app/components/profile/tabs/teams/ProTeamsDash"
import ProResourcesDash from "./app/components/profile/tabs/resources/ProResourcesDash"
import ProSettingsDash from "./app/components/profile/tabs/settings/ProSettingsDash"
import ProjectList from "./app/components/profile/tabs/projects/ProjectList"
import CreateProject from "./app/pages/CreateProject"
import ProjectLayout from "./app/components/project/ProjectLayout"
import ProjFilesLayout from "./app/components/project/files/ProjFilesLayout"
import ProjDatasetLayout from "./app/components/project/datasets/ProjDatasetLayout"
import ProjPipelinesLayout from "./app/components/project/pipelines/ProjPipelinesLayout"
import ProjResultsLayout from "./app/components/project/results/ProjResultsLayout"
import ProjDiscussionLayout from "./app/components/project/discussion/ProjDiscussionLayout"
import ProjSettingsLayout from "./app/components/project/settings/ProjSettingsLayout"
import Routes from "./constants/routes"
import ProDatastoresDash from "./app/components/profile/tabs/datastores/ProDatastoresDash"
import CreateDatastore from "./app/pages/CreateDatastore"

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
})

const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    element: <RootLayout />,
    loader: RootLoader,
    id: "root",
    children: [
      {
        path: Routes.PROFILE,
        element: <ProfileLayout />,
        loader: ProfileLoader,
        action: () => null,
        id: "profile",
        children: [
          {
            path: Routes.PROFILE_PROJECTS,
            element: <ProProjectsDash />,
            loader: () => null,
            action: () => null,
            id: "profile-projects",
            children: [
              {
                path: Routes.PROFILE_PROJECTS,
                element: <ProjectList />,
                loader: ProfileProjectsLoader,
                action: () => null,
                id: "projects-list",
              },
            ],
          },
          {
            path: Routes.PROFILE_DATASTORES,
            element: <ProDatastoresDash />,
            loader: ProDatastoreDashLoader,
            action: () => null,
            id: "profile-datastores",
          },
          {
            path: Routes.PROFILE_TEAMS,
            element: <ProTeamsDash />,
            loader: () => null,
            action: () => null,
            id: "profile-teams",
          },
          {
            path: Routes.PROFILE_RESOURCES,
            element: <ProResourcesDash />,
            loader: () => null,
            action: () => null,
            id: "profile-resources",
          },
          {
            path: Routes.PROFILE_SETTINGS,
            element: <ProSettingsDash />,
            loader: () => null,
            action: () => null,
            id: "profile-settings",
          },
          {
            path: Routes.PROFILE_PROJECTS_CREATE,
            element: <CreateProject />,
            loader: CreateProjectLoader,
            action: () => null,
            id: "profile-projects-create",
          },
          {
            path: Routes.PROFILE_DATASTORE_CREATE,
            element: <CreateDatastore />,
            loader: CreateDatastoreLoader,
            action: () => null,
            id: "profile-datastore-create",
          }
        ],
      },
      {
        path: Routes.PROJECT_VIEW,
        element: <ProjectLayout />,
        loader: ProjectLoader,
        action: () => null,
        id: "project-view",
        children: [
          {
            path: Routes.PROJECT_FILES,
            element: <ProjFilesLayout />,
            loader: () => null,
            action: () => null,
          },
          {
            path: Routes.PROJECT_DATASETS,
            element: <ProjDatasetLayout />,
            loader: () => null,
            action: () => null,
          },
          {
            path: Routes.PROJECT_PIPELINES,
            element: <ProjPipelinesLayout />,
            loader: () => null,
            action: () => null,
          },
          {
            path: Routes.PROJECT_RESULTS,
            element: <ProjResultsLayout />,
            loader: () => null,
            action: () => null,
          },
          {
            path: Routes.PROJECT_DISCUSSION,
            element: <ProjDiscussionLayout />,
            loader: () => null,
            action: () => null,
          },
          {
            path: Routes.PROJECT_SETTINGS,
            element: <ProjSettingsLayout />,
            loader: () => null,
            action: () => null,
          },
        ],
      },
      {
        path: Routes.SIGNUP,
        element: <CreateProfile />,
        loader: () => null,
        action: () => null,
        id: "signup",
      },
      {
        path: Routes.SETTINGS,
        element: <Settings />,
        loader: () => null,
        action: () => null,
      },
      {
        path: Routes.REPOSITORY,
        element: <Repository />,
        loader: RepoLoader,
        action: () => null,
        id: "repo",
      },
      {
        path: Routes.ORGANIZATION_CREATE,
        element: <CreateOrganization />,
        loader: () => null,
        action: () => null,
      },
      {
        path: Routes.ORGANIZATION,
        element: <Organization />,
        loader: OrgLoader,
        action: () => null,
        id: "org",
        children: [
          {
            path: Routes.ORG_DATASET,
            element: <OrgDataset />,
            loader: () => null,
            action: () => null,
            id: "org-dataset",
          },
          {
            path: Routes.ORG_DATASET_VIEW,
            element: <ViewDataset />,
            loader: ViewDatasetLoader,
            action: () => null,
            id: "org-dataset-view",
          },
          {
            path: Routes.ORG_DATASET_CREATE_SUBSET,
            element: <CreateSubset />,
            loader: CreateSubsetLoader,
            action: () => null,
            id: "org-dataset-create-subset",
          },
          //Datastore
          {
            path: Routes.ORG_DATASTORE_DASHBOARD,
            element: <DatastoreDashboard />,
            loader: DatastoreDashboardLoader,
            action: () => null,
            id: "org-datastore-dashboard",
          },
          {
            path: Routes.ORG_DATASTORE_VIEW,
            element: <ViewDatastore />,
            loader: ViewDatastoreLoader,
            action: () => null,
            id: "org-datastore-view",
            children: [
              {
                path: Routes.ORG_DATASTORE_VIEW_LIST,
                element: <DatastoreSubsetList />,
                loader: () => null,
                action: () => null,
                id: "org-datastore-view-list",
              },
              {
                path: Routes.ORG_DATASTORE_SUBSET_DETAILS,
                element: <DatastoreSubsetDetails />,
                loader: DatastoreSubsetDetailsLoader,
                action: () => null,
                id: "org-datastore-subset-details",
              },
            ],
          },
          //Users
          {
            path: Routes.ORG_USERS,
            element: <OrgUsers />,
            loader: () => null,
            action: () => null,
            id: "org-users",
          },
          {
            path: Routes.ORG_REPOS,
            element: <OrgRepos />,
            loader: () => null,
            action: () => null,
            id: "org-repos",
          },
          {
            path: Routes.ORG_MODULES,
            element: <OrgModules />,
            loader: () => null,
            action: () => null,
            id: "org-modules",
          },
          {
            path: Routes.ORG_SETTINGS,
            element: <OrgSettings />,
            loader: () => null,
            action: () => null,
            id: "org-settings",
          },
        ],
      },
    ],
  },
  {
    path: Routes.LOGIN,
    element: <Login />,
    loader: () => null,
    action: () => null,
    id: "login",
  },
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
