import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RepoCard from './RepoCard'
import { SFlexCol, SFlexRowWrap } from '../../common/containers/FlexContainers'
import { RepoAPI } from '../../../api/RepoAPI'
import { preprocessCSS } from 'vite'
import { useSelector } from 'react-redux'


const SContainer = styled(SFlexCol)`
  width: 100%;
  gap: 20px;
  margin: 0;
  padding: 20px 0 0;
  position:relative;
  grid-area: content;
  overflow-y: auto;

`

const RepoProfileContent = () => {

  const [repoList, setRepoList] = useState<any[]>([])

  const userId =  useSelector((state: any) => state.userId)

  useEffect(() => {

    const getList = () => {

      RepoAPI.getRepoByOwner(userId)
      .then((result: any) => {
        setRepoList(result.data)
      })
      .catch((err: any) => console.error(err))
    }

    return getList()
      

  }, [])



  return (
    <SContainer>
      {
        repoList && repoList.map((repo: any, index: number) => {
          return(
            <RepoCard key={index} repo={repo} />
          )
        })
      }
    </SContainer>
  )
}

export default RepoProfileContent