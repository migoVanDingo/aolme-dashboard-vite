import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { SFlexCol } from '../components/common/containers/FlexContainers'
import Card from '../components/common/cards/Card'
import avatar  from '../../assets/lucy-photo.jpg'
import Tabs from '../components/common/Tabs'
import { faFolder, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons'
import UsernameTag from '../components/common/UsernameTag'
import Button from '../components/common/buttons/Button'
import RepoProfileContent from '../components/profile/repo/RepoProfileContent'
import ActivityProfileContent from '../components/profile/activity/ActivityProfileContent'
import { UserAPI } from '../api/UserAPI'
import { useParams } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'


//const username = "Miguel"

const tabs = [
  {
    title: "Projects",
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
  grid-template-rows: [top]60px [row2] 200px [row3] 200px [row4] 200px [end];
  grid-template-areas: 
    "profile tabs"
    "profile content"
    "profile content"
    "profile content";

  grid-gap: 40px;
  
  position: relative;
  margin-top: 20px;
  height: 100%;

`

const Profile = ({ userId }: any) => {

  console.log('here you: ', userId)


  //Hooks
  const theme = useTheme()

  //State
  const [content, setContent] = useState<any>("Projects")
  const [username, setUsername] = useState<string>('')


    
  const handleEditProfile = () => {
    console.log("yoseph!")
  }

  useEffect(() => {

    const getCurrentUser = (userId: string) => {
      console.log('getCurrentUser()...')
      const getUser = UserAPI.getUserById(userId)
      .then((user: any) => {
        console.log("Profile.tsx -- getCurrentUser Response: ", user.data)
        setUsername(user.data['username'])
      })
      .catch((err: any) => console.error("Profile.tsx -- getCurrentUser Error: ", err))
    }

    if(userId !== null && userId !== undefined)
      return getCurrentUser(userId)


  }, [userId])



  return (
    <SContainer>
      <Card cardStyle={theme.profile.card} imageSrc={avatar} username={username}>
        <UsernameTag username={username}/>
        <Button handleClick={handleEditProfile} className={"edit-profile"} innerHtml={"Edit Profile"}/>
      </Card>
      <Tabs tabs={tabs} setContent={setContent} iconArr={[faFolder, faClockRotateLeft]}/>
      {
        content === "Projects" ? (
          <RepoProfileContent />
        ) : content === "Public activity" ? (
          <ActivityProfileContent />
        ) : ""
      }
      
    </SContainer>
  )
}

const mapStoreStateToProps = (state: any) => {
  return {
    ...state,
  }
}

export default connect(mapStoreStateToProps)(Profile)