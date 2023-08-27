import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import Avatar from "../../header/Avatar"

const SContainer = styled(SFlexCol)`
  grid-area: collab;
  margin-left: 20px;
 
  gap: 10px;
`

const SHeading = styled(SFlexRow)`
  font-size: 0.9rem;
  font-weight: 600;
  align-items: center;
  color: ${({ theme }) => theme.text.contrast};
  border-bottom: 1px solid ${({ theme }) => theme.button.branch.border};
  padding-bottom: 5px;
  
`

const SCount = styled.p`
  margin: 0;
  margin-left: 15px;
  background-color: ${({ theme }) => theme.color.color_3};
  padding: 3px 10px;
  font-size: 0.9rem;
  font-size: 600;
  border-radius: ${({ theme }) => theme.container.borderRadius.xlg};
`
const SUser = styled(SFlexRow)`
  width: 100%;
  font-size: 0.8rem;
  margin-left: 40px;
  gap: 5px;
`
const count = 3

const users = [
  {
    username: "Migo",
  },
  {
    username: "Bubz",
  },
  {
    username: "Jamiriquai",
  },
]

const RepoCollab = () => {
  return (
    <SContainer>
      <SHeading>
        Collaborators<SCount>{count}</SCount>
      </SHeading>

      {users &&
        users.map((user: any, index: number) => {
          return (
            <SUser key={index}>
              <Avatar className={"small"}/>
              {user.username}
            </SUser>
          )
        })}
    </SContainer>
  )
}

export default RepoCollab
