import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../common/containers/FlexContainers'
import { OrganizationAPI } from '../../../api/OrganizationAPI'
import OrgList from './OrgList'
import EntityUserAPI from '../../../api/EntityUserAPI'

const SContainer = styled(SFlexCol)`
  width: 100%;

`

const SHeading = styled.h2`
  width:100%;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  padding: 0 0 15px 0;
  margin-bottom: 10px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};

`

const ProfileOrgListModule = ({ userId }: any) => {

  const [organizations, setOrganizations] = useState<any>([])

  useEffect(() => {

    const getUserOrgs = () => {
      
      EntityUserAPI.getEntityListByUserId(userId)
      .then((res: any) => {
        console.log("ENTITIES: ",res.data)
        setOrganizations(res.data)
      })
      .catch((err: any) => {
        console.error(err)
      })  
    }

    console.log(userId ? userId : "No user id")
    return getUserOrgs
  }, [userId])


  return (
    <SContainer>
      <SHeading>Organizations</SHeading>
      <OrgList organizations={organizations}/>
      

    </SContainer>
  )
}

export default ProfileOrgListModule