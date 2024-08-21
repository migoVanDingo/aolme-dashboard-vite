import {
  faBuilding,
  faEye
} from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  useLoaderData,
  useRouteLoaderData
} from "react-router-dom"
import styled, { useTheme } from "styled-components"
import avatar from "../../assets/lucy-photo.jpg"
import { setStoreUserId } from "../actions"
import EntityUserAPI from "../api/EntityUserAPI"
import { RepoAPI } from "../api/RepoAPI"
import Tabs from "../components/common/Tabs"
import UsernameTag from "../components/common/UsernameTag"
import Button from "../components/common/buttons/Button"
import Card from "../components/common/cards/Card"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import { headerTabs, repoTabs } from "../components/profile/Constant"
import ActivityProfileContent from "../components/profile/activity/ActivityProfileContent"
import { ProfileHeader } from "../components/profile/header/ProfileHeader"
import ProfileOrgListModule from "../components/profile/org/ProfileOrgListModule"
import RepoProfileContent from "../components/profile/repo/RepoProfileContent"
import { useProfile } from "../hooks/useProfile"
import CreateRepositoryV2 from "./CreateRepositoryV2"

const SProfileContainer = styled.div`
  width: 100%;
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
  height: 100%;
  padding-bottom: 50px;
  overflow-y: auto;
  grid-area: list;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px auto;
  grid-template-areas:
    "tabs"
    "content";
`

const orgTabs = [
  {
    title: "My Orgs",
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
  const { uid, username } = useRouteLoaderData("root") as {
    uid: string
    username: string
  }

  const { userRepos, userOrgs } = useLoaderData() as { userRepos: any[], userOrgs: any[] }


  //Hooks
  const theme = useTheme()

  const {
    userId,
    activeTab,
    setActiveTab,
    repoContent,
    setRepoContent,
    orgContent,
    setOrgContent,
    handleEditProfile,
  } = useProfile(uid)



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
              <RepoProfileContent userRepos={userRepos} />
            ) : repoContent === "PUBLIC" ? (
              <ActivityProfileContent />
            ) : repoContent === "NEW" ? (
              <CreateRepositoryV2 />
            ) : (
              ""
            )}
          </SItemContainer>
        ) : activeTab === "Organizations" ? (
          userOrgs.length > 0 && (
            <SItemContainer>
              <Tabs
                tabs={orgTabs}
                setContent={setOrgContent}
                activeTab={orgContent}
              />
              {orgContent === "MY_ORGS" ? (
                <ProfileOrgListModule
                  userId={userId}
                  organizations={userOrgs}
                />
              ) : (
                ""
              )}
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

export const loader = async () => {
  const userRepos = await RepoAPI.getRepoByOwner(
    localStorage.getItem("userId") as string,
  )

  const userOrgs = await EntityUserAPI.getEntityListByUserId(localStorage.getItem("userId") as string)

  return {
    userRepos,
    userOrgs,
  }
}
