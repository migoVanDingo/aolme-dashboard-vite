import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  SFlexCol,
  SFlexRow,
} from "../components/common/containers/FlexContainers"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import EntityUserAPI from "../api/EntityUserAPI"
import {
  SContent,
  SUserCol,
  SUserRow,
} from "../components/styled/SOrganization"
import OrgUsers from "../components/organization/user/OrgUsers"
import OrgRepos from "../components/organization/repo/OrgRepos"
import { RepoAPI } from "../api/RepoAPI"
import OrgDataset from "../components/organization/dataset/OrgDataset"

const SContainer = styled(SFlexCol)`
  height: calc(100vh - ${({ theme }) => theme.header.height});
  width: 100%;
  align-items: baseline;
  padding: 0px;
  box-sizing: border-box;



  &.loading {
    align-items: center;
    justify-content: center;
  }
`

const SOrgDashboard = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.color_1};
  display: grid;
  position: relative; 
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  grid-template-columns: 200px repeat(4, 1fr);
  grid-template-rows: 50px repeat(4, 1fr);
  grid-template-areas:
    "sidebar header header header header"
    "sidebar content content content content"
    "sidebar content content content content"
    "sidebar content content content content"
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
  height: auto;
  width: 100%;
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.color.color_1};
  padding: 0;
  margin: 130px 0;

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
  const { orgName, orgId } = useSelector((state: any) => state)

  const [organizationName, setOrganizationName] = useState<string>("")
  const [organizationId, setOrganizationId] = useState<string>("")

  const [userList, setUserList] = useState<any>([])
  const [repoList, setRepoList] = useState<any>([])

  const [selected, setSelected] = useState<string>("USERS")
  const [editUser, setEditUser] = useState<boolean>(false)
  const [editRepo, setEditRepo] = useState<boolean>(false)

  const [triggerGetUserList, setTriggerGetUserList] = useState<boolean>(false)
  const [triggerGetRepoList, setTriggerGetRepoList] = useState<boolean>(false)

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

    if (orgId === "" || orgName === "") {
      setInterval(() => {
        console.log("waiting...")
      }, 500)
    } else {
      return init()
    }
  }, [])

  useEffect(() => {
    loadOrgUsers(organizationId)
    console.log("organizationId", organizationId)
  }, [organizationId])

  useEffect(() => {
    refreshOrgUsers(organizationId)
  }, [triggerGetUserList])

  useEffect(() => {
    loadOrgRepositories(organizationId)
  }, [organizationId])

  useEffect(() => {
    console.log("triggerGetRepoList", triggerGetRepoList)
    refreshOrgRepositories(organizationId)
  }, [triggerGetRepoList])



  const loadOrgUsers = (oid: string) => {
    if (userList === null || userList === undefined || userList.length === 0) {
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
    }
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
    if(repoList === null || repoList === undefined || repoList.length === 0){
      RepoAPI.getRepoByEntity(orgId)
      .then((res: any) => {
        setSelected("REPO")
        console.log("REPOS: ", res.data)
        setRepoList(res.data)
      })
      .catch((err: any) =>
        console.error("Organization::getRepositoriesByEntityId:", err),
      )
    }
  }

  const refreshOrgRepositories = (orgId: string) => {

    RepoAPI.getRepoByEntity(orgId)
    .then((res: any) => {
      setSelected("REPO")
      console.log("REPOS: ", res.data)
      setRepoList(res.data)
    })
    .catch((err: any) =>
      console.error("Organization::getRepositoriesByEntityId:", err),
    )
  }

  const loadOrgDatasets = () => {
    setSelected("DATASET")
    console.log("loadOrgDatasets")
  }

  const loadOrgModules = () => {
    setSelected("MODULE")
    console.log("loadOrgModules")
  }
  const loadOrgConfigurations = () => {
    setSelected("CONFIG")
    console.log("loadOrgConfigurations")
  }
  const loadOrgSettings = () => {
    setSelected("SETTINGS")
    console.log("loadOrgSettings")
  }

  const toolbarOptions = [
    {
      option: "Users",
      icon: "user",
      type: "USERS",
      callback: loadOrgUsers,
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
      option: "Configurations",
      icon: "config",
      type:'CONFIG',
      callback: loadOrgConfigurations,
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
        {userList !== null && selected === "USERS" ? (
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
        ): (<></>)}
      </SOrgDashboard>
    </SContainer>
  )
}

export default Organization
