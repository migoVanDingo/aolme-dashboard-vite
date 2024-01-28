import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import { RepoHeader } from "../components/repository/header/RepoHeader"
import RepoContent from "../components/repository/content/RepoContent"
import RepoReadMe from "../components/repository/content/readme/RepoReadMe"
import { useParams } from "react-router-dom"
import { ProjectAPI } from "../api/ProjectAPI"
import { connect } from "react-redux"
import { store } from "../store"
import {
  setProjectCreatedAt,
  setProjectCreatedBy,
  setProjectDescription,
  setProjectId,
  setProjectLastUpdatedAt,
  setProjectLastUpdatedBy,
  setProjectName,
  setProjectOwner,
} from "../actions"

const SContainer = styled(SFlexCol)`
  width: 100%;
  box-sizing: border-box;
`

const Repository = ({ owner, name, description }: any) => {
  const { projectId } = useParams()
  const [project, setProject] = useState<any>()

  useEffect(() => {
    const project = () => {

      if (projectId !== null && projectId !== undefined) {
        const currentProject = ProjectAPI.getProjectById(projectId)
          .then((project: any) => {
            const data = project.data[0]

            store.dispatch(setProjectId(data["ls_project_id"]))
            store.dispatch(setProjectOwner(data["owner"]))
            store.dispatch(setProjectCreatedAt(data["created_at"]))
            store.dispatch(setProjectCreatedBy(data["created_by"]))
            store.dispatch(setProjectDescription(data["description"]))
            store.dispatch(setProjectLastUpdatedAt(data["updated_at"]))
            store.dispatch(setProjectLastUpdatedBy(data["updated_by"]))
            store.dispatch(setProjectName(data["name"]))
            setProject(data)
          })
          .catch((err: any) => console.error(err))
      }
    }

    return project()
  }, [projectId])

  return (
    <SContainer>
      {project && (
        <>
      <RepoHeader owner={owner} projectName={name} />
      <RepoContent />
      </>
      )}
      
      <RepoReadMe />
    </SContainer>
  )
}

const mapStoreStateToProps = (state: any) => {
  return {
    ...state,
  }
}

export default connect(mapStoreStateToProps)(Repository)
