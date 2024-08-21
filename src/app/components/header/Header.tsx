import React from "react"
import styled from "styled-components"
import Hamburger from "./Hamburger"
import Logo from "./Logo"
import { SFlexRow } from "../common/containers/FlexContainers"
import CreateNew from "./CreateNew"
import Notifications from "./Notifications"
import Avatar from "./Avatar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../hooks/useProfile"

const SHeader = styled.div`
  width: 100vw;
  background-color: ${({ theme }) => theme.color.color_1};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_2};
  padding: 10px ${({ theme }) => theme.spacing.edges};
  margin: 0;
  position: relative;
  box-sizing: border-box;
  display: flex;

  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
`

const SContainerRight = styled(SFlexRow)`
  position: relative;
  right: 0;
  border: 2px solid green;
  width: 100px;
  height: 30px;
`

const SUsername = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.color_8};
  padding: 0;
  margin: 0;
  font-weight: bold;
  cursor: pointer;
  

`

interface IHeader {
  username: string
}

const Header = ({ username }: IHeader) => {

  const nav = useNavigate()

  return (
    <SHeader>
      <Logo />
      <SUsername onClick={() => nav("/profile")}>{username}</SUsername>
      <CreateNew />
      <Notifications />
      <Avatar />
    </SHeader>
  )
}

export default Header
