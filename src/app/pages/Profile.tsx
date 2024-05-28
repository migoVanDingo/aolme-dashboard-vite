import React, { useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import Card from "../components/common/cards/Card"
import avatar from "../../assets/lucy-photo.jpg"
import Tabs from "../components/common/Tabs"
import {
  faFolder,
  faClockRotateLeft,
  faUser,
  faUserGroup,
  faPlus,
  faBuilding,
  faEye,
} from "@fortawesome/free-solid-svg-icons"
import UsernameTag from "../components/common/UsernameTag"
import Button from "../components/common/buttons/Button"
import RepoProfileContent from "../components/profile/repo/RepoProfileContent"
import ActivityProfileContent from "../components/profile/activity/ActivityProfileContent"
import { UserAPI } from "../api/UserAPI"
import { useLocation, useParams } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import { useAuth } from "../context/AuthContext"
import ProfileOrgListModule from "../components/profile/org/ProfileOrgListModule"
import EntityUserAPI from "../api/EntityUserAPI"
import { ProfileHeader } from "../components/profile/header/ProfileHeader"
import {
  faDatabase,
  faPeopleGroup,
  faBriefcase,
  faGear,
} from "@fortawesome/free-solid-svg-icons"
import CreateNew from "../components/header/CreateNew"
import CreateRepositoryV2 from "./CreateRepositoryV2"

const SProfileContainer = styled.div`
  width: 100%;
  height: calc(100% ${({ theme }) => theme.header.height});
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-areas:
    "header"
    "content ";

  position: relative;
  background-color: ${({ theme }) => theme.color.color_2};
`

const SContainer = styled.div`
  width: 75%;

  display: grid;
  grid-template-columns: [left]1fr [col2] 4fr [right];
  grid-template-rows: [top]60px [row2] 200px [row3] 200px [row4] auto[end];
  grid-template-areas:
    "profile list"
    "profile list"
    "view list"
    "view list";

  grid-gap: 40px;

  position: relative;
  margin: 40px auto 0;
  height: 100%;
`

const SHeading1 = styled.h1`
  color: ${({ theme }) => theme.color.color_8};
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  margin: 0;
  padding: 0 0 10px 0;

  border-bottom: 1px solid ${({ theme }) => theme.color.color_5};
`

const SViewContainer = styled(SFlexCol)`
  grid-area: view;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
`
const SViewList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
`

const SViewItem = styled.li`
  width: 100%;
  padding: 7px 15px;
  background-color: transparent;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_2_5};
    cursor: pointer;
  }

  &.active {
    background-color: ${({ theme }) => theme.color.color_4};
  }
`

const SItemContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  grid-area: list;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px auto;
  grid-template-areas:
    "tabs"
    "content";
`
const repoTabs = [
  {
    title: "Personal",
    type: "PERSONAL",
    action: "",
    icon: faUser,
  },
  {
    title: "Public",
    type: "PUBLIC",
    action: "",
    icon: faUserGroup,
  },
  {
    title: "New Repo",
    type: "NEW",
    action: "",
    icon: faPlus,
  },
]

const headerTabs = [
  {
    title: "Repositories",
    callback: () => console.log("Repositories"),
    icon: faDatabase,
  },
  {
    title: "Organizations",
    callback: () => console.log("Organizations"),
    icon: faPeopleGroup,
  },
  {
    title: "Resources",
    callback: () => console.log("Resources"),
    icon: faBriefcase,
  },
  {
    title: "Settings",
    callback: () => console.log("Settings"),
    icon: faGear,
  },
]

const orgTabs = [
  {
    title: "My Organizations",
    type: "MY_ORGS",
    action: "",
    icon: faBuilding,
  },
  {
    title: "Watching",
    type: "WATCHING",
    action: "",
    icon: faEye,
  },
]

const Profile = ({}: any) => {
  //Hooks
  const theme = useTheme()

  const username = useSelector((state: any) => state.username)
  const userId = useSelector((state: any) => state.userId)

  //State
  const [repoContent, setRepoContent] = useState<any>("PERSONAL")
  const [orgContent, setOrgContent] = useState<any>("MY_ORGS")

  const [activeTab, setActiveTab] = useState<string>("Repositories")
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [organizations, setOrganizations] = useState<any>([])

  useEffect(() => {
    const init = () => {}
    return init()
  }, [])

  useEffect(() => {
    const getUserOrgs = (userId: string) => {
      if (userId && userId !== "" && activeTab === "Organizations") {
        EntityUserAPI.getEntityListByUserId(userId)
          .then((res: any) => {
            console.log("ENTITIES: ", res.data)
            setOrganizations(res.data)
          })
          .catch((err: any) => {
            console.error(err)
          })
      }
    }

    //console.log(userId ? userId : "No user id")
    return getUserOrgs(userId)
  }, [activeTab, userId])

  const viewEntities = (entity: string, index: number) => {
    setSelectedIndex(index)
    setActiveTab(entity)
  }

  const handleEditProfile = () => {
    console.log("EDIT PROFILE")
  }
  return (
    <SProfileContainer>
      <ProfileHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={headerTabs}
      />
      <SContainer>
        
          <Card
            cardStyle={theme.profile.card}
            imageSrc={avatar}
            username={username}
          >
            <UsernameTag username={username} />
            <Button
              handleClick={handleEditProfile}
              className={"edit-profile"}
              innerHtml={"Edit Profile"}
            />
          </Card>
        

        {activeTab === "Repositories" ? (
          <SItemContainer>
            <Tabs 
              tabs={repoTabs} 
              setContent={setRepoContent} 
              activeTab={repoContent} 
            />

            {repoContent === "PERSONAL" ? (
              <RepoProfileContent />
            ) : repoContent === "PUBLIC" ? (
              <ActivityProfileContent />
            ) : repoContent === "NEW" ?  (
              <CreateRepositoryV2 />
            ): ""}
          </SItemContainer>
        ) : activeTab === "Organizations" ? (
          organizations.length > 0 && (
            <SItemContainer>
              <Tabs tabs={orgTabs} setContent={setOrgContent} activeTab={orgContent} />
              {orgContent === "MY_ORGS" ? (
              <ProfileOrgListModule
                userId={userId}
                organizations={organizations}
              /> ) : ""}
            </SItemContainer>
          )
        ) : (
          ""
        )}
      </SContainer>
    </SProfileContainer>
  )
}

export default Profile
