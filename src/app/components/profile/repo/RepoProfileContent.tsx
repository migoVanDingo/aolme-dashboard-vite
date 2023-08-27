import React from 'react'
import styled from 'styled-components'
import RepoCard from './RepoCard'
import { SFlexRowWrap } from '../../common/containers/FlexContainers'


const repos = [
  {
    name: "Hello-World",
    lastUpdated: "2 months ago",
    description: "Hello world machine learning repository",
    tags: ["tag1", "tag2"]
  },
  {
    name: "New testing stuff",
    lastUpdated: "yesterday",
    description: "We're testing a bunch of stuff",
    tags: ["tag1", "tag2", "tag3", "tag4"]
  }
]

const SContainer = styled(SFlexRowWrap)`
  width: 100%;
  height: 100%;
  justify-content: space-between;

`


const RepoProfileDeck = () => {
  return (
    <SContainer>
      {
        repos && repos.map((repo: any) => {
          return(
            <RepoCard data={repo} />
          )
        })
      }
    </SContainer>
  )
}

export default RepoProfileDeck