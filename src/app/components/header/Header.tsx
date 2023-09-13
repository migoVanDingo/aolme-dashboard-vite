import React from 'react'
import styled from 'styled-components'
import Hamburger from './Hamburger'
import Logo from './Logo'
import { SFlexRow } from '../common/containers/FlexContainers'
import CreateNew from './CreateNew'
import Notifications from './Notifications'
import Avatar from './Avatar'

const SHeader = styled.div`
    width: 100vw;
    background-color: ${({theme}) => theme.header.height};
    box-shadow: 0px 2px 3px ${({theme}) => theme.color.shadow.dark};
    padding: 5px ${({theme}) => theme.spacing.edges};
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

const Header = () => {
  return (
    <SHeader>
      
        <Hamburger />
        <Logo />
        <CreateNew />
        <Notifications />
        <Avatar />
    </SHeader>
  )
}

export default Header