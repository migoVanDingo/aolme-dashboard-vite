import { createTheme, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import ViewDataset, { loader as ViewDatasetLoader } from "./app/components/dataset/ViewDataset"
import CreateSubset, { loader as CreateSubsetLoader } from "./app/components/dataset/subset/CreateSubset"
import OrgDataset from "./app/components/organization/dataset/OrgDataset"
import DatastoreDashboard, { loader as DatastoreDashboardLoader } from "./app/components/organization/datastore/DatastoreDashboard"
import DatastoreSubsetDetails, { loader as DatastoreSubsetDetailsLoader } from "./app/components/organization/datastore/DatastoreSubsetDetails"
import DatastoreSubsetList from "./app/components/organization/datastore/DatastoreSubsetList"
import ViewDatastore, { loader as ViewDatastoreLoader } from "./app/components/organization/datastore/ViewDatastore"
import OrgModules from "./app/components/organization/modules/OrgModules"
import OrgRepos from "./app/components/organization/repo/OrgRepos"
import OrgSettings from "./app/components/organization/settings/OrgSettings"
import OrgUsers from "./app/components/organization/user/OrgUsers"
import ProfileLayout, { loader as ProfileLoader } from "./app/components/profile/ProfileLayout"
import ProDatastoresDash, { loader as ProDatastoreDashLoader } from "./app/components/profile/tabs/datastores/ProDatastoresDash"
import ProProjectsDash from "./app/components/profile/tabs/projects/ProProjectsDash"
import ProjectList, { loader as ProfileProjectsLoader } from "./app/components/profile/tabs/projects/ProjectList"
import ProResourcesDash from "./app/components/profile/tabs/resources/ProResourcesDash"
import ProSettingsDash from "./app/components/profile/tabs/settings/ProSettingsDash"
import ProTeamsDash from "./app/components/profile/tabs/teams/ProTeamsDash"
import ProjectLayout, { loader as ProjectLoader } from "./app/components/project/ProjectLayout"
import ProjDatasetLayout from "./app/components/project/datasets/ProjDatasetLayout"
import ProjDiscussionLayout from "./app/components/project/discussion/ProjDiscussionLayout"
import ProjFilesLayout from "./app/components/project/files/ProjFilesLayout"
import ProjPipelinesLayout from "./app/components/project/pipelines/ProjPipelinesLayout"
import ProjResultsLayout from "./app/components/project/results/ProjResultsLayout"
import ProjSettingsLayout from "./app/components/project/settings/ProjSettingsLayout"
import ProtectedRoute from "./app/components/routes/ProtectedRoute"
import CreateDatastore, { loader as CreateDatastoreLoader } from "./app/pages/CreateDatastore"
import CreateProfile from "./app/pages/CreateProfile"
import CreateProject, { loader as CreateProjectLoader } from "./app/pages/CreateProject"
import Login from "./app/pages/Login"
import Organization, { loader as OrgLoader } from "./app/pages/Organization"
import ProfileCreateDataset, { loader as ProfileCreateDatasetLoader } from "./app/pages/ProfileCreateDataset"
import Repository, { loader as RepoLoader } from "./app/pages/Repository"
import RootLayout, { loader as RootLoader } from "./app/pages/RootLayout"
import Settings from "./app/pages/Settings"
import VerifyEmail from "./app/pages/VerifyEmail"
import { dark_grey_1 } from "./app/theme/ThemeConfig"
import Routes from "./constants/routes"

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
})

const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    element: <ProtectedRoute />,
    children: [
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
              },
              {
                path: Routes.PROFILE_DATASET_CREATE,
                element: <ProfileCreateDataset />,
                loader: ProfileCreateDatasetLoader,
                action: () => null,
                id: "profile-dataset-create",
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
            path: Routes.VERIFY_EMAIL,
            element: <VerifyEmail />,
            loader: () => null,
            action: () => null,
            id: "verify-email",
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
          /* {
            path: Routes.ORGANIZATION_CREATE,
            element: <CreateOrganization />,
            loader: () => null,
            action: () => null,
          }, */
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
    ]
  },
  
  {
    path: Routes.LOGIN,
    element: <Login />,
    loader: () => null,
    action: () => null,
    id: "login",
  },
  {
    path: Routes.SIGNUP,
    element: <CreateProfile />,
    loader: () => null,
    action: () => null,
    id: "signup",
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
