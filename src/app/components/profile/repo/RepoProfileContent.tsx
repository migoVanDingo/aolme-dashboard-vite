import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RepoCard from './RepoCard'
import { SFlexCol, SFlexRowWrap } from '../../common/containers/FlexContainers'
import { ProjectAPI } from '../../../api/ProjectAPI'
import { preprocessCSS } from 'vite'


const SContainer = styled(SFlexCol)`
  width: 100%;
  gap: 20px;
  margin: 0;
  padding: 0;
  position:relative;
  grid-area: content;

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

    //return getProjects()
      

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