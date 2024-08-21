import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../common/containers/FlexContainers'
import { OrganizationAPI } from '../../../api/OrganizationAPI'
import OrgList from './OrgList'
import EntityUserAPI from '../../../api/EntityUserAPI'

const SContainer = styled(SFlexCol)`
  width: 100%;
  margin-top: 20px;
  grid-area: content;

`

const SHeading = styled.h2`
  width:100%;
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
  padding: 0 0 15px 0;
  margin-bottom: 10px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
  grid-area: tabs;


`

const ProfileOrgListModule = ({ userId, organizations }: any) => {
  
  return (
    <SContainer>
      <OrgList organizations={organizations && organizations}/>
      

    </SContainer>
  )
}

export default ProfileOrgListModule