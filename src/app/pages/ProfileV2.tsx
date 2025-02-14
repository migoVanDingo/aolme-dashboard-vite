import { faClockRotateLeft, faFolder } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled, { useTheme } from "styled-components"
import avatar from "../../assets/lucy-photo.jpg"
import EntityUserAPI from "../api/EntityUserAPI"
import Tabs from "../components/common/Tabs"
import UsernameTag from "../components/common/UsernameTag"
import Button from "../components/common/buttons/Button"
import Card from "../components/common/cards/Card"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import ActivityProfileContent from "../components/profile/activity/ActivityProfileContent"
import ProfileBody from "../components/profile/body/ProfileBody"
import { ProfileHeader } from "../components/profile/header/ProfileHeader"
import ProfileOrgListModule from "../components/profile/org/ProfileOrgListModule"
import RepoProfileContent from "../components/profile/repo/RepoProfileContent"

//const username = "Miguel"

const tabs = [
  {
    title: "Personal",
    action: "",
  },
  {
    title: "Public",
    action: "",
  },
]

const views = [
  {
    title: "Repositories",
    entity: "REPO",
  },
  {
    title: "Organizations",
    entity: "ORG",
  },
]

const SProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px auto;
  grid-template-areas:
    "header"
    "content ";

  position: relative;
`

const SContainer = styled.div`
  width: 65%;

  display: grid;
  grid-template-columns: [left]1fr [col2] 4fr [right];
  grid-template-rows: [top]60px [row2] 200px [row3] 200px [row4] auto[end];
  grid-template-areas:
    "header header"
    "profile tabs"
    "profile content"
    "view content"
    "view content";

  grid-gap: 40px;

  position: relative;
  margin-top: 20px;
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

const Profile = ({}: any) => {
  //Hooks
  const theme = useTheme()
  const username = useSelector((state: any) => state.user.storeUsername)
  const userId = useSelector((state: any) => state.user.storeUserId)

  const version = 2

  //State
  const [content, setContent] = useState<any>("Personal")
  const [selectedView, setSelectedView] = useState<string>("REPO")
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [organizations, setOrganizations] = useState<any>([])

  const handleEditProfile = () => {
    console.log("yoseph!")
  }

  useEffect(() => {
    const init = () => {}

    return init()
  }, [])

  const viewEntities = (entity: string, index: number) => {
    setSelectedIndex(index)
    setSelectedView(entity)
  }

  useEffect(() => {
    const getUserOrgs = (userId: string) => {
      if (userId && userId !== "") {
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
  }, [selectedView, userId])

  if (version === 2) {
    return (
      <SProfileContainer>
        <ProfileHeader />
        <ProfileBody />
      </SProfileContainer>
    )
  } else {
    return (
      <SContainer>
        <ProfileHeader />
        {username && (
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
        )}
        <SViewContainer>
          <SHeading1>View</SHeading1>
          <SViewList>
            {views &&
              views.map((view: any, index: number) => {
                return (
                  <SViewItem
                    className={index === selectedIndex ? "active" : ""}
                    key={index}
                    onClick={() => viewEntities(view.entity, index)}
                  >
                    <a>{view.title}</a>
                  </SViewItem>
                )
              })}
          </SViewList>
        </SViewContainer>

        {selectedView === "REPO" ? (
          <>
            <Tabs
              tabs={tabs}
              setContent={setContent}
              iconArr={[faFolder, faClockRotateLeft]}
            />
            {content === "Personal" ? (
              <RepoProfileContent />
            ) : content === "Public" ? (
              <ActivityProfileContent />
            ) : (
              ""
            )}
          </>
        ) : selectedView === "ORG" ? (
          organizations.length > 0 && (
            <ProfileOrgListModule
              userId={userId}
              organizations={organizations}
            />
          )
        ) : (
          ""
        )}
      </SContainer>
    )
  }
}

export default Profile
