import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../common/containers/FlexContainers"
import {
  faFile,
  faServer,
  faFlask,
  faVectorSquare,
  faCode,
  faBookBookmark,
  faComments,
  faSquarePollVertical,
  faCodePullRequest,
  faA,
  faArrowsUpDown,
  faGear,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ProcessAPI } from "../../../api/ProcessAPI"
import {
  ICreateLabelStudioProject,
  LabelStudioAPI,
} from "../../../api/LabelStudioAPI"

const SContainer = styled(SFlexRow)`
  grid-area: tabs;
  align-items: end;
  gap: 20px;
  padding: 0 0 0 25px;
`

const STab = styled(SFlexRow)`
  gap: 5px;
  font-size: 0.8rem;
  box-sizing: border-box;
  padding: 10px 10px 0;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;

  color: ${({ theme }) => theme.color.color_5};

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.color.color_5};
    cursor: pointer;
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.color.color_8};
  }
`

const SIcon = styled(FontAwesomeIcon)``

const RepoTabs = ({ activeTab, setHighlightedTab, name }: any) => {

  const repoEntity = useSelector(
    (state: any) => state.repo.storeRepoEntityntity,
  )
  const userId = useSelector((state: any) => state.user.storeUserId)
  const repoId = useSelector((state: any) => state.repo.storeRepoId)
  const repoDescription = useSelector(
    (state: any) => state.repo.storeRepoDescription,
  )
  const repoName = useSelector((state: any) => state.repo.storeRepoName)

  const nav = useNavigate()

  const initializeLabelStudio = () => {
    const payload: ICreateLabelStudioProject = {
      name: repoName,
      description: repoDescription,
      owner: repoEntity,
      created_by: userId,
      repo_id: repoId,
    }
    LabelStudioAPI.getLabelStudioProjectByRepoId(repoId)
      .then((res: any) => {
        console.log("res: ", res)
        if (res.data && res.data.length > 0) {
          window.open("http://localhost:8080", "_blank")
        } else {
          LabelStudioAPI.initializeLabelStudioProject(payload)
            .then((res: any) => {
              console.log("res: ", res)
              window.open("http://localhost:8080", "_blank")
            })
            .catch((err: any) => console.error(err))
        }
      })
      .catch((err: any) => console.error(err))
    //window.open('http://localhost:8080/projects/' + projectId + '/data?tab=83','_blank')
    /* LabelStudioAPI.initializeLabelStudioProject(payload)
    .then((res: any) => {
      console.log("res: ", res)
    })
    .catch((err: any) => console.error(err)) */
    /* console.log("name: ", name)
    console.log("projectId: ", projectId)
    ProcessAPI.launchLabelStudio(name)
    .then((res: any) => {
      console.log("res: ", res)
      //nav('')
      if(res.status === 204){
        setInterval(()=>{}, 3000)
        console.log("response 204 aww yiss")
        nav("http://localhost:8080/projects/" + projectId + "/data?tab=83")
      }
        
    })
    .catch((err: any) => console.error(err)) */
  }

  const initializeJupyterNotebook = () => {
    const payload = {
      entity_id: repoEntity,
      description: "JUPYTER NOTEBOOK",
      owner: userId,
      type: "NOTEBOOK",
      is_public: 0,
      repo_id: repoId,
    }

    ProcessAPI.launchJupyterNotebook(payload)
      .then((res: any) => {
        console.log("launching jupyter notebook...")
      })
      .catch((err: any) => console.error(err))
  }

  const initializeMLFlow = () => {
    window.open("http://localhost:9001", "_blank")
  }

  const tabs = [
    {
      title: "Files",
      callback: () => console.log("FILES"),
      icon: faFile,
      path: "/project/:projectName/files",
      id: "files",
    },
    {
      title: "Datasets",
      callback: () => console.log("DATASETS"),
      icon: faServer,
      path: "/project/:projectName/datasets",
      id: "datasets",
    },
    {
      title: "Pipelines",
      callback: () => console.log("PIPELINES"),
      icon: faArrowsUpDown,
      path: "/project/:projectName/pipelines",
      id: "pipelines",
    },
    /* {
      title: "Pull Requests",
      callback: () => console.log("PULL REQUESTS"),
      icon: faCodePullRequest,
      path: "/project/:projectName/files",
      id: "files"
    }, */
    {
      title: "Results",
      callback: () => console.log("RESULTS"),
      icon: faSquarePollVertical,
      path: "/project/:projectName/results",
      id: "results",
    },
    {
      title: "Discussion",
      callback: () => console.log("DISCUSSION"),
      icon: faComments,
      path: "/project/:projectName/discussion",
      id: "discussion",
    },
    {
      title: "Settings",
      callback: () => console.log("SETTINGS"),
      icon: faGear,
      path: "/project/:projectName/settings",
      id: "settings",
    },
  ]

  const handleClickTab = (tab: any) => {
    localStorage.setItem("activeProjectTab", tab.id)
    setHighlightedTab(tab.id)
    nav(tab.path.replace(":projectName", name))
  }

  return (
    <SContainer>
      {tabs &&
        tabs.map((tab: any, index: number) => {
          return (
            <STab
              key={index}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => handleClickTab(tab)}
              id={tab.title}
            >
              <SIcon icon={tab.icon} />
              {tab.title}
            </STab>
          )
        })}
    </SContainer>
  )
}

export default RepoTabs
