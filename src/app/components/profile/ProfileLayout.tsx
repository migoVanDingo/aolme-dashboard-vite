import styled, { useTheme } from "styled-components"
import { ProfileHeader } from "./header/ProfileHeader"
import Card from "../common/cards/Card"
import UsernameTag from "../common/UsernameTag"
import Button from "../common/buttons/Button"
import { Outlet, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useProfile } from "../../hooks/useProfile"
import { headerTabs } from "./Constant"
import avatar from "../../../assets/lucy-photo.jpg"

const SProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 35px auto;
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
const SItemContainer = styled.div`
border: 1px solid red;
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

const ProfileLayout = () => {
  const { userId, username } = useRouteLoaderData("root") as {
    userId: string
    username: string
  }

  const theme = useTheme()
  const { activeTab, setActiveTab, handleEditProfile } = useProfile(userId)

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
        
        
      </SContainer>
    </SProfileContainer>
  )
}

export default ProfileLayout
