import { useEffect, useState } from "react"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { DatasetAPI } from "../api/DatasetAPI"
import EntityUserAPI from "../api/EntityUserAPI"
import { RepoAPI } from "../api/RepoAPI"
import {
  SFlexCol
} from "../components/common/containers/FlexContainers"
import { useOrg } from "../hooks/useOrg"

const SContainer = styled(SFlexCol)`

  width: 100%;
  align-items: baseline;
  padding: 0px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.color_6};



  &.loading {
    align-items: center;
    justify-content: center;
  }
`

const SOrgDashboard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.color_2};
  display: grid;
  position: relative; 
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  grid-template-columns: 200px repeat(4, 1fr);
  grid-template-rows: 50px auto;
  grid-template-areas:
    "sidebar header header header header"
    "sidebar content content content content";

`

const SHeader = styled.div`
  grid-area: header;
  background-color: ${({ theme }) => theme.color.color_2_5};
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color.color_6};
  font-weight: 200;
  padding-left: 20px;
  display:fixed;
`

const SSidebar = styled.div`

  width: 100%;
  height: 100%;
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.color.color_1};
  padding-top: 48px;
  margin: 0;


`

const SOrgToolbar = styled.ul`
  list-style: none;
  height: auto;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: fixed;
  letter-spacing: 1px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1rem;

`

const SToolbarItem = styled.li`
  width: 100%;
  padding: 10px 20px 10px 40px;
  font-family: Arial, sans-serif;
  font-weight: 200;
  transition: all 0.2s ease;

  &:hover {
    color: #0de99f;
    background-color: ${({ theme }) => theme.color.color_2_5};
    cursor: pointer;
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.color_4};
  }
`

const Organization = () => {


  const { loaderOrgUsers, loaderOrgRepos, loaderOrgDatasets, orgId, orgName } = useLoaderData() as {
    orgId: any
    orgName: any
    loaderOrgUsers: any
    loaderOrgRepos: any
    loaderOrgDatasets: any
  }

  const { orgUsers, orgRepos, orgDatasets} = useOrg(loaderOrgUsers, loaderOrgRepos, loaderOrgDatasets)

  const [organizationName, setOrganizationName] = useState<string>(orgName)
  const [organizationId, setOrganizationId] = useState<string>(orgId)

  const [userList, setUserList] = useState<any[]>(loaderOrgUsers)
  const [repoList, setRepoList] = useState<any>(loaderOrgRepos)

  const [selected, setSelected] = useState<string>("USERS")
  const [editUser, setEditUser] = useState<boolean>(false)
  const [editRepo, setEditRepo] = useState<boolean>(false)

  const [triggerGetUserList, setTriggerGetUserList] = useState<boolean>(false)
  const [triggerGetRepoList, setTriggerGetRepoList] = useState<boolean>(false)

  const nav = useNavigate()

  const userTrigger = () => {
    setEditUser(false)
    setTriggerGetUserList(!triggerGetUserList)
  }

  const repoTrigger = () => {
    setEditRepo(false)
    setTriggerGetRepoList(!triggerGetRepoList)
  }

  useEffect(() => {
    const init = () => {
      console.log("orgIdYO", orgId)
      console.log("orgName", orgName)
      if (orgId !== null && orgId !== undefined && orgId !== "") {
        console.log("running...")
        setOrganizationId(orgId)
        setOrganizationName(orgName)
      }
    }

  
  }, [])

/*   useEffect(() => {
    loadOrgUsers(organizationId)
    console.log("organizationId", organizationId)
  }, [organizationId])

  useEffect(() => {
    refreshOrgUsers(organizationId)
  }, [triggerGetUserList])

  useEffect(() => {
    loadOrgRepositories(organizationId)
  }, [organizationId]) */

  useEffect(() => {
    console.log("triggerGetRepoList", triggerGetRepoList)
    refreshOrgRepositories(organizationId)
  }, [triggerGetRepoList])



  const loadOrgUsers = (oid: string) => {
    /* if (userList === null || userList === undefined || userList.length === 0) {
      console.log("oid", oid)
      EntityUserAPI.getUserListByEntityId(oid)
        .then((res: any) => {
          console.log("ENTITY_USERS: ", res.data)
          setSelected("USERS")
          setUserList(res.data)
        })
        .catch((err: any) =>
          console.error("Organization::getUserListByEntityId:", err),
        )
    } */
        setSelected("USERS")
        nav("/organization/"+orgName+"/users")
  }

  const refreshOrgUsers = (oid: string) => {
    EntityUserAPI.getUserListByEntityId(oid)
      .then((res: any) => {
        console.log("ENTITY_USERS: ", res.data)
        setSelected("USERS")
        setUserList(res.data)
      })
      .catch((err: any) =>
        console.error("Organization::getUserListByEntityId:", err),
      )
  }

  const loadOrgRepositories = (orgId: string) => {
    /* if(repoList === null || repoList === undefined || repoList.length === 0){
      RepoAPI.getRepoByEntity(orgId)
      .then((res: any) => {
        setSelected("REPO")
        console.log("REPOS: ", res.data)
        setRepoList(res.data)
      })
      .catch((err: any) =>
        console.error("Organization::getRepositoriesByEntityId:", err),
      )
    } */
      setSelected("REPO")
      nav("/organization/"+orgName+"/repositories")
  }

  const refreshOrgRepositories = (orgId: string) => {

    /* RepoAPI.getRepoByEntity(orgId)
    .then((res: any) => {
      setSelected("REPO")
      console.log("REPOS: ", res.data)
      setRepoList(res.data)
    })
    .catch((err: any) =>
      console.error("Organization::getRepositoriesByEntityId:", err),
    ) */
  }

  const loadOrgDatastore = () => {
    setSelected("DATASTORE")
      nav("/organization/"+orgName+"/datastore/dashboard")
  }

  const loadOrgDatasets = () => {

    setSelected("DATASET")
    nav("/organization/"+orgName+"/datasets")
  }

  const loadOrgModules = () => {
    setSelected("MODULE")
    nav("/organization/"+orgName+"/modules")
  }

  const loadOrgSettings = () => {
    setSelected("SETTINGS")
    nav("/organization/"+orgName+"/settings")
  }

  const toolbarOptions = [
    {
      option: "Users",
      icon: "user",
      type: "USERS",
      callback: loadOrgUsers,
    },
    {
      option: "Datastore",
      icon: "datastore",
      type: "DATASTORE",
      callback: loadOrgDatastore,
    },
    {
      option: "Repositories",
      icon: "repo",
      type: "REPO",
      callback: loadOrgRepositories,
    },
    {
      option: "Datasets",
      icon: "dataset",
      type: "DATASET",
      callback: loadOrgDatasets,
    },
    {
      option: "Modules",
      icon: "module",
      type: "MODULE",
      callback: loadOrgModules,
    },

    {
      option: "Settings",
      icon: "settings",
      type: "SETTINGS",
      callback: loadOrgSettings,
    },
  ]

  const selectToolbarOption = (type: string, callback: any) => {
    setSelected(type)
    callback()
  }
  return (
    <SContainer>
      <SOrgDashboard>
        <SHeader>Organization: {organizationName && organizationName}</SHeader>
        <SSidebar>
          <SOrgToolbar>
            {toolbarOptions &&
              toolbarOptions.map((option: any, index: number) => {
                return (
                  <SToolbarItem
                    className={selected === option.type ? "selected" : ""}
                    key={index}
                    onClick={() =>
                      selectToolbarOption(option.type, option.callback)
                    }
                  >
                    <a>{option.option}</a>
                  </SToolbarItem>
                )
              })}
          </SOrgToolbar>
        </SSidebar>
        <Outlet />
        {/* {userList  && selected === "USERS" ? (
          <OrgUsers
            userList={userList}
            trigger={userTrigger}
            editUser={editUser}
            setEditUser={setEditUser}
          />
        ) : selected === "REPO" ? (
          <OrgRepos
            repoList={repoList}
            trigger={repoTrigger}
            editRepo={editRepo}
            setEditRepo={setEditRepo}
          />
        ) : selected === "DATASET" ? (
          <OrgDataset />
        ): (<></>)} */}
      </SOrgDashboard>
    </SContainer>
  )
}

export default Organization

export const loader = async () => {

  const orgId = localStorage.getItem("orgId") as string
  const orgName = localStorage.getItem("orgName") as string
  const loaderOrgUsers = await EntityUserAPI.getUserListByEntityId(orgId)
  const loaderOrgRepos = await RepoAPI.getRepoByEntity(orgId)
  const loaderOrgDatasets = await DatasetAPI.getDatasetListByEntity(orgId)

  const data = {
    orgId,
    orgName,
    loaderOrgUsers,
    loaderOrgRepos,
    loaderOrgDatasets,
  }

  return data
}
