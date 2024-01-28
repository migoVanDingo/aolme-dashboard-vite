import React from "react"
import { SContent, SUserCol, SUserRow} from "../../components/styled/Organization"

const OrgUsers = ({userList} : any) => {
  return (
    <SContent>
      <SUserRow className="th">
        <SUserCol>#</SUserCol> <SUserCol>Username</SUserCol>{" "}
        <SUserCol>Email</SUserCol>
      </SUserRow>
      {userList &&
        userList.map((user: any, index: number) => {
          return (
            <SUserRow key={index}>
              <SUserCol>{index + 1}</SUserCol>{" "}
              <SUserCol>{user.username}</SUserCol>{" "}
              <SUserCol>{user.email}</SUserCol>
            </SUserRow>
          )
        })}
     </SContent>
  )
}

export default OrgUsers
