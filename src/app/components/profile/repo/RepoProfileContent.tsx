import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RepoCard from './RepoCard'
import { SFlexCol, SFlexRowWrap } from '../../common/containers/FlexContainers'
import { RepoAPI } from '../../../api/RepoAPI'
import { preprocessCSS } from 'vite'
import { useSelector } from 'react-redux'
import { useProfile } from '../../../hooks/useProfile'
import { useRouteLoaderData } from 'react-router-dom'


const SContainer = styled(SFlexCol)`
  width: 100%;
  gap: 20px;
  margin: 0;
  padding: 20px 0 0;
  position:relative;
  grid-area: content;
  overflow-y: auto;

  box-sizing: border-box;


`

const RepoProfileContent = ({ userRepos }: any) => {


  return (
    <SContainer>
      {
        userRepos && userRepos.map((repo: any, index: number) => {
          return(
            <RepoCard key={index} repo={repo} />
          )
        })
      }
    </SContainer>
  )
}

export default RepoProfileContent