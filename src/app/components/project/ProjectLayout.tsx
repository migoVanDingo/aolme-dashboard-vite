import React from "react"
import { SFlexCol } from "../common/containers/FlexContainers"
import styled from "styled-components"
import { RepoHeader } from "../repository/header/RepoHeader"
import ProjectAPI from "../../api/ProjectAPI"
import { Outlet, useLoaderData, useLocation } from "react-router-dom"
import TeamAPI from "../../api/TeamAPI"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: calc(100% - ${({ theme }) => theme.header.height});
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_8};
  padding-bottom: 100px;
`

const ProjectLayout = () => {
  const { project, username, entityName, loaderActiveTab } = useLoaderData() as {
    project: any
    username: string
    entityName: string
    loaderActiveTab: string
  }

  const location = useLocation()
  const pathSegments = location.pathname.split("/")
  const segment = pathSegments[pathSegments.length - 1]


  const [highlightedTab, setHighlightedTab] = React.useState<string>(segment !== project.name ? segment : "files")

  return (
    <SContainer>
      <RepoHeader
        owner={username}
        projectName={project.name}
        entityName={entityName}
        activeTab={highlightedTab}
        setHighlightedTab={setHighlightedTab}
      />
      <Outlet />
    </SContainer>
  )
}

export default ProjectLayout

export const loader = async () => {
  const project_id = localStorage.getItem("project_id") as string
  const username = localStorage.getItem("username") as string
  const user_id = localStorage.getItem("userId") as string
  let loaderActiveTab = localStorage.getItem("activeProjectTab") as string
  if (loaderActiveTab === "null" || loaderActiveTab === "" || !loaderActiveTab) {
    loaderActiveTab = "files"
  }
  console.log('activeProjectTab', loaderActiveTab)

  const project = await ProjectAPI.getProject({ project_id })


  let entityName = ""

  if (!project) {
    return {
      status: 404,
    }
  }

  if (user_id === project.entity_id) {
    entityName = username
  } else {
    const team = await TeamAPI.getTeam({ team_id: project.entity_id })
    entityName = team.name
  }

  return {
    project,
    username,
    entityName,
    loaderActiveTab
  }
}
