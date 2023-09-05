import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import { RepoHeader } from "../components/repository/header/RepoHeader"
import RepoContent from "../components/repository/content/RepoContent"
import RepoReadMe from "../components/repository/content/readme/RepoReadMe"
import { useParams } from "react-router-dom"
import { ProjectAPI } from "../api/ProjectAPI"
import { connect } from "react-redux"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
`

const Repository = ({owner, name, description}: any) => {
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
      {project && (<RepoHeader owner={owner} projectName={name}/>)}
      <RepoContent />
      <RepoReadMe />
    </SContainer>
  )
}

const mapStoreStateToProps = (state: any) => {
  return {
    ...state
  }
}

export default connect(mapStoreStateToProps)(Repository) 
