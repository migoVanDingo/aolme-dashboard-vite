import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "./containers/FlexContainers"
import profileImg from "../../../assets/avatar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortDown } from "@fortawesome/free-solid-svg-icons"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  gap: 5px;
  position: relative;
`

const SLabel = styled.label`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 200;
`

const SSelectOwner = styled(SFlexRow)`
  width: 140px;
  height: 30px;
  background: ${({ theme }) => theme.color.color_2};
  box-shadow: 1px 1px 2px ${({ theme }) => theme.color.shadow.dark};
  align-items: center;
  color: ${({ theme }) => theme.color.color_6};
  justify-content: space-around;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.color.color_3};
  }
`

const SImageContainer = styled.div`
  border-radius: 50px;
  height: 20px;
  width: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.color_6};
`

const SImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const SIcon = styled(FontAwesomeIcon)`
  ${({ theme }) => theme.color.color_6}
`

const SMenu = styled.ul`
  width: 140px;
  position: absolute;
  top: 53px;
  right: 0;
  background: ${({ theme }) => theme.color.color_2};
  padding: 5px;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  box-sizing: border-box;
  box-shadow: 2px 2px 6px ${({ theme }) => theme.color.shadow.dark};
  z-index: 1000;
`

const SListItem = styled.li`
  width: 100%;
  list-style: none;
  padding: 7px 15px;
  font-size: 0.8rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.color.color_5};
  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
    color: ${({ theme }) => theme.color.color_8};
    cursor: pointer;
  }
`



const UserDropdown = ({ projectOwner, setProjectOwner, users }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  

  const handleOpenDropdown = () => {
    setIsOpen(true)
    console.log(isOpen)
  }

  const handleSelectOwner = (e: any) => {
    setIsOpen(false)
    //console.log(e.target.id)
    setProjectOwner(e.target.id)
    
  }



  return (
    <SContainer>
      <SLabel>{"Select Owner"}</SLabel>
      <SSelectOwner onClick={handleOpenDropdown}>
        <SImageContainer>
          <SImage src={profileImg} />
        </SImageContainer>
        {projectOwner}
        <SIcon icon={faSortDown} />
      </SSelectOwner>
      {isOpen && (
        <SMenu>
          {users &&
            users.map((user: any, index: number) => {
              return (
                <SListItem key={index} id={user} onClick={handleSelectOwner}>
                  <SImageContainer>
                    <SImage src={profileImg} />
                  </SImageContainer>
                  {user}
                </SListItem>
              )
            })}
        </SMenu>
      )}
    </SContainer>
  )
}

export default UserDropdown
