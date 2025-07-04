import React, { useEffect } from "react"
import { SFlexCol } from "../common/containers/FlexContainers"
import styled from "styled-components"
import { RepoHeader } from "../repository/header/RepoHeader"
import ProjectAPI from "../../api/ProjectAPI"
import { Outlet, useLoaderData, useLocation } from "react-router-dom"
import TeamAPI from "../../api/TeamAPI"
import { useDispatch } from "react-redux"
import { setProjectDescription, setProjectId, setProjectName } from "../../store/slices/project"
import LoadingSpinner from "../common/loading/LoadingSpinner"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: calc(100% - ${({ theme }) => theme.header.height});
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_8};
  padding-bottom: 0px;

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
  const segment = pathSegments[pathSegments.length - 1].replaceAll("%20", " ")

  const dispatch = useDispatch()

  useEffect(() => {
    const init = () => {
      if(project) {
        dispatchProject(project)
      }

    
    }

    return init()
  }, [project]);

  const dispatchProject = (project: any) => {
    dispatch(setProjectId(project.project_id))
    dispatch(setProjectDescription(project.description))
    dispatch(setProjectName(project.name))
  }



  const [highlightedTab, setHighlightedTab] = React.useState<string>(segment !== project.name ? segment : "dashboard")

  if(highlightedTab && username && entityName && project) {
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
    )} else {
      return (
        <SContainer>
          <LoadingSpinner message={"Loading"}/>
        </SContainer>
      )
    }
  }

export default ProjectLayout

export const loader = async () => {
  const project_id = sessionStorage.getItem("project_id") as string
  const username = sessionStorage.getItem("username") as string
  const user_id = sessionStorage.getItem("userId") as string
  let loaderActiveTab = sessionStorage.getItem("activeProjectTab") as string
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
