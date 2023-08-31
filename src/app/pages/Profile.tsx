import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { SFlexCol } from '../components/common/containers/FlexContainers'
import Card from '../components/common/cards/Card'
import avatar  from '../../assets/avatar.png'
import Tabs from '../components/common/Tabs'
import { faFolder, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons'
import UsernameTag from '../components/common/UsernameTag'
import Button from '../components/common/buttons/Button'
import RepoProfileDeck from '../components/profile/repo/RepoProfileContent'
import ActivityProfileContent from '../components/profile/activity/ActivityProfileContent'

const username = "yumamaloca"

const tabs = [
  {
    title: "Repository",
    action: ""
  },
  {
    title: "Public activity",
    action: ""
  }
]

const SContainer = styled.div`

  width: 65%;

  display:grid;
  grid-template-columns: [left]1fr [col2] 4fr [right];
  grid-template-rows: [top]1fr [row2] 10fr [end];
  grid-template-areas: 
    "profile tabs"
    "profile content";

  grid-gap: 40px;
  
  position: relative;
  margin-top: 20px;
  height: 100%;

`

const Profile = () => {

  //Hooks
  const theme = useTheme()

  //State
  const [content, setContent] = useState<any>()

  const handleEditProfile = () => {
    console.log("yoseph!")
  }



  return (
    <SContainer>
      <Card cardStyle={theme.profile.card} imageSrc={avatar} username={username}>
        <UsernameTag username={username}/>
        <Button handleClick={handleEditProfile} className={"edit-profile"} innerHtml={"Edit Profile"}/>
      </Card>
      <Tabs tabs={tabs} setContent={setContent} iconArr={[faFolder, faClockRotateLeft]}/>
      {
        content === "Repository" ? (
          <RepoProfileDeck />
        ) : content === "Public activity" ? (
          <ActivityProfileContent />
        ) : ""
      }
      
    </SContainer>
  )
}

export default Profile