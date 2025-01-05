import React from "react"
import styled, { useTheme } from "styled-components"
import Tabs from "../../../common/Tabs"
import { faBuilding, faEye } from "@fortawesome/free-solid-svg-icons"
import ProjectsDashHeader from "./ProjectsDashHeader"
import { Outlet, useOutletContext } from "react-router-dom"
import Card from "../../../common/cards/Card"
import UsernameTag from "../../../common/UsernameTag"
import Button from "../../../common/buttons/Button"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import ProjectApi from "../../../../api/ProjectAPI"
import avatar from "../../../../../assets/lucy-photo.jpg"

const SContainer = styled.div`
  grid-area: content;
  width: 100%;
  padding: 0 45px;
  display: grid;
  grid-template-columns: [left]1fr [col2] 6fr [right];
  grid-template-rows: [top] ${({ theme }) => theme.profile.nav.height} [row2] 200px [row3] 200px [row4] auto[end];
  grid-template-areas:
    "profile list"
    "profile list"
    "view list"
    "view list";

  grid-gap: 40px;

  position: relative;
  margin: 40px auto 0;
  min-height: calc(100% - ${({ theme }) => theme.profile.nav.height});
`

const SProfileContainer = styled.div`
  width: 100%;

  grid-area: profile;
  position: relative;
  background-color: ${({ theme }) => theme.color.color_2};

  box-sizing: border-box;
`

const SListContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: list;

  background-color: ${({ theme }) => theme.color.color_2};
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 80px auto;
  padding: 0;
  margin: 0;
  grid-template-areas:
    "header"
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

const ProProjectsDash = () => {
  const theme = useTheme()
  const { username, handleEditProfile } =
    useOutletContext() as {
      username: string
      handleEditProfile: () => void
    }

  return (
    <SContainer>
      <SProfileContainer>
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
      </SProfileContainer>
      <SListContainer>
        <ProjectsDashHeader />
        <Outlet />
      </SListContainer>
    </SContainer>
  )
}

export default ProProjectsDash
