import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RepoCard from './RepoCard'
import { SFlexRowWrap } from '../../common/containers/FlexContainers'
import { ProjectAPI } from '../../../api/ProjectAPI'
import { preprocessCSS } from 'vite'


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
  gap: 20px;
  margin: 0;
  padding: 0;

`


const RepoProfileContent = () => {

  const [projectList, setProjectList] = useState<any[]>([])


  useEffect(() => {

    const getProjects = () => {
      ProjectAPI.getProjectList()
      .then((result: any) => {
        setProjectList(result.data)
      })
      .catch((err: any) => console.error(err))
    }

    return getProjects()
      

  }, [])



  return (
    <SContainer>
      {
        projectList && projectList.map((project: any, index: number) => {
          return(
            <RepoCard key={index} data={project} />
          )
        })
      }
    </SContainer>
  )
}

export default RepoProfileContent