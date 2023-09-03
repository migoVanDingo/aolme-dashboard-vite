import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import { RepoHeader } from "../components/repository/header/RepoHeader"
import RepoContent from "../components/repository/content/RepoContent"
import RepoReadMe from "../components/repository/content/readme/RepoReadMe"
import { useParams } from "react-router-dom"
import { ProjectAPI } from "../api/ProjectAPI"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
`

const Repository = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState<any>()

  useEffect(() => {
    const project = () => {
      if (projectId !== null && projectId !== undefined) {
        ProjectAPI.getProjectById(projectId)
          .then((result: any) => {
            setProject(result.data[0])
          })
          .catch((err: any) => console.error(err))
      }
    }

    return project()

  }, [projectId])


  return (
    <SContainer>
      {project && (<RepoHeader owner={project.owner} projectName={project.name}/>)}
      <RepoContent />
      <RepoReadMe />
    </SContainer>
  )
}

export default Repository
