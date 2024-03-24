import React from 'react'
import { SContent, SUserCol, SUserRow } from '../styled/SOrganization'

const OrgRepos = ({ list }: any) => {
    return (
        <SContent>
          {list &&
            list.map((user: any, index: number) => {
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

export default OrgRepos