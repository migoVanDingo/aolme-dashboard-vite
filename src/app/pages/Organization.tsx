import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  SFlexCol,
  SFlexRow,
} from "../components/common/containers/FlexContainers"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import EntityUserAPI from "../api/EntityUserAPI"
import { SContent, SUserCol, SUserRow} from "../components/styled/Organization"
import OrgUsers from "../components/organization/OrgUsers"

const SContainer = styled(SFlexCol)`
  height: calc(100vh - ${({ theme }) => theme.header.height});
  width: 100%;
  align-items: baseline;
  padding: 0px 10px;
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
`


const SSidebar = styled.div`
  height: 100%;
  width: 100%;
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.color.color_1};
  padding: 0;
  margin: 0;
`

const SOrgToolbar = styled.ul`
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
`

const STooblarItem = styled.li`
  width: 100%;
  padding: 10px 20px;
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
  const { orgId } = useParams<{ orgId: string }>()
  const { orgName } = useSelector((state: any) => state)

  const [organizationName, setOrganizationName] = useState<string>("")
  const [organizationId, setOrganizationId] = useState<string>("")
  const [userList, setUserList] = useState<any>([])
  const [selected, setSelected] = useState<string>("USERS")

  useEffect(() => {
    const init = () => {
      if (orgId !== null && orgId !== undefined && orgId !== "") {
        console.log('running...')
        setOrganizationId(orgId)
        setOrganizationName(orgName)
        loadOrgUsers(orgId)
      }
    }

    return init
  }, [orgId, orgName])

  const loadOrgUsers = (orgId : string) => {
    
    if(userList === null || userList === undefined || userList.length === 0){
      EntityUserAPI.getUserListByEntityId(orgId)
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
  const loadOrgRepositories = () => {
    setSelected("REPO")
    console.log("loadOrgDatasets")
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
                  <STooblarItem
                    className={selected === option.type ? "selected" : ""}
                    key={index}
                    onClick={() => selectToolbarOption(option.type, option.callback)}
                  >
                    <a>{option.option}</a>
                  </STooblarItem>
                )
              })}
          </SOrgToolbar>
        </SSidebar>
       {
          userList !== null && selected === "USERS" ? (<OrgUsers userList={userList}/>) : ""
       }
      </SOrgDashboard>
    </SContainer>
  )
}

export default Organization
