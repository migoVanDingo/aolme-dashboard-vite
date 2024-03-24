import React, { useState } from "react"
import { SContent, SUserCol, SUserRow } from "../styled/SOrganization"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { Button, Modal } from "react-bootstrap"
import TextInput from "../common/inputs/text/TextInput"
import { SButton } from "../common/styled"
import { SFlexRow } from "../common/containers/FlexContainers"
import OrgEditUser from "./user/OrgEditUser"
import AddUser from "./user/AddUser"

const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.color_6};
  font-size: 1.1rem;
  &:hover {
    color: #33adff;
    cursor: pointer;
  }

  &:active {
    color: #00ffbb;
  }
`

const SUserRowChild = styled(SUserRow)`
  width: 100%;
  background: rgb(24, 24, 24);
  background: linear-gradient(
    0deg,
    rgba(24, 24, 24, 1) 0%,
    rgba(32, 32, 32, 1) 100%
  );

  &.new-guy{
    background-color: ${({ theme }) => theme.color.color_2};
    padding: 4px;
    border: 2px solid red;
  }
`

const SNewGuy = styled(SFlexRow)`
  width: 100%;
  height: 40px;
  border:none;
  background-color: ${({ theme }) => theme.color.color_2};
  padding: 8px 8px 10px;
  box-sizing: border-box;


  
`

const SDashedBox = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  border: 1.5px dashed ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_3};
  transition: all 0.3s ease;
  opacity: 0.8;


  &.active {
    border: 1.5px dashed ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
    opacity: 0.4;
    cursor: pointer;
  }

  background-color: transparent;
  font-size: 0.9rem;
  font-weight: 300;
  padding: 0.5px 15px;
  justify-content: baseline;
  align-items: center;
  color: ${({ theme }) => theme.color.color_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
`

const OrgUsers = ({ userList, trigger, edit, setEdit }: any) => {
  const [editUser, setEditUser] = useState<string>("")

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [role, setRole] = useState<string>("")

  const [createNew, setCreateNew] = useState<boolean>(false)
  const [createNewActive, setCreateNewActive] = useState<boolean>(false)

  const updateUser = (userId: string) => {
    console.log("UPDATE USER: ", userId)
    setEditUser(userId)
    setEdit(!edit)
  }

  const handleHover = () => {
    setCreateNewActive(true)
  }

  const handleLeave = () => {
    setCreateNewActive(false)
  }

  const handleCreateNew = () =>  {
    setCreateNew(true)
  }

  return (
    <SContent>
      <SUserRow className="th">
        <SUserCol>#</SUserCol> <SUserCol>Username</SUserCol>{" "}
        <SUserCol>Email</SUserCol>
        <SUserCol>Role</SUserCol>
        <SUserCol>Status</SUserCol>
        <SUserCol>Edit</SUserCol>
      </SUserRow>
      {userList &&
        userList.map((user: any, index: number) => {
          user.roles[0].replaceAll('"', "")

          if(createNew === true){
            return(<AddUser trigger={trigger} />)
          } else if (edit === true && editUser === user.user_id) {
            return (
              <OrgEditUser user={user} trigger={trigger} />
            )
          } else {
            return (
              <SUserRowChild key={index}>
                <SUserCol>{index + 1}</SUserCol>{" "}
                <SUserCol>{user.username}</SUserCol>{" "}
                <SUserCol>{user.email}</SUserCol>
                <SUserCol>{user.roles}</SUserCol>
                <SUserCol>{user.user_status}</SUserCol>
                <SUserCol>
                  <SIcon
                    onClick={() => updateUser(user.user_id)}
                    icon={faEdit}
                  />
                </SUserCol>
              </SUserRowChild>
            )
          }
        })}

        {
          createNew !== true && edit !== true && (<SNewGuy onClick={handleCreateNew} onMouseOver={handleHover} onMouseLeave={handleLeave} className={"new-guy"}>
  
          <SDashedBox onClick={() => console.log('click')} className={createNewActive ? "active" : ""}>+ Create New Org User</SDashedBox>
       
      </SNewGuy>)
        }
      
    </SContent>
  )
}

export default OrgUsers

/* entity_user_payload = {
  "entity_id": org['org_id'],
  "user_id": self.params['user_id'],
  "entity_type": "ORGANIZATION",
  "entity_status": "ACTIVE",
  "created_by": self.params['user_id'],
  "roles": "OWNER"

} */
