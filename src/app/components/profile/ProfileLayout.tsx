import {
  Outlet,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom"
import styled from "styled-components"

import { useProfile } from "../../hooks/useProfile"
import { headerTabs } from "./Constant"
import { ProfileHeader } from "./header/ProfileHeader"

const SProfileContainer = styled.div`
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.header.height});
  display: grid;
  grid-template-rows: 35px auto;
  grid-template-areas:
    "header"
    "content ";

  position: relative;
  background-color: ${({ theme }) => theme.color.color_2};

  box-sizing: border-box;
  padding-bottom: 20px;

`

const ProfileLayout = () => {
  const { userId, username } = useRouteLoaderData("root") as {
    userId: string
    username: string
  }

  const location = useLocation()
  const pathSegments = location.pathname.split("/")
  const segment = pathSegments[pathSegments.length - 1]

  const { activeTab, setActiveTab } = useProfile(
    userId,
    segment,
  )

  return (
    <SProfileContainer>
      <ProfileHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={headerTabs}
      />

      <Outlet context={{ username, userId }} />
    </SProfileContainer>
  )
}

export default ProfileLayout

export const loader = () => {
  

  return null
}
