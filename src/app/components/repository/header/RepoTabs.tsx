import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../common/containers/FlexContainers"
import {
  faFile,
  faServer,
  faFlask,
  faVectorSquare,
  faCode
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ProcessAPI } from "../../../api/ProcessAPI"
import { ICreateLabelStudioProject, LabelStudioAPI } from "../../../api/LabelStudioAPI"
import { I } from "vitest/dist/types-e3c9754d.js"

const SContainer = styled(SFlexRow)`
  grid-area: tabs;
  align-items: end;
  gap: 20px;
  padding: 0 0 0 65px;
`

const STab = styled(SFlexRow)`
  gap: 5px;
  font-size: 0.8rem;
  box-sizing: border-box;
  padding: 10px;
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

const RepoTabs = ({ activeTab, setActiveTab, projectId, name }: any) => {
  
  const { repoEntity, userId, repoId, repoDescription, repoName} = useSelector((state: any) => state)


  const nav = useNavigate()

  const initializeLabelStudio = () => {
    const payload: ICreateLabelStudioProject = {
      name: repoName,
      description: repoDescription,
      owner: repoEntity,
      created_by: userId,
      repo_id: repoId
    }
    LabelStudioAPI.initializeLabelStudioProject(payload)
    .then((res: any) => {
      console.log("res: ", res)
    })
    .catch((err: any) => console.error(err))
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
    ProcessAPI.launchJupyterNotebook(repoEntity)
    .then((res:any) => {
      if(repoEntity.startsWith("ORG"))
        nav("http://localhost:8888/tree/_fs/organization"+repoEntity)
      else if(repoEntity.startsWith("USR"))
        nav("http://localhost:8888/tree/_fs/user/"+repoEntity)
      else
      console.log("launching jupyter notebook...")
    })
    .catch((err: any) => console.error(err))
  }

  const tabs = [
    {
      title: "Files",
      callback: () => console.log("FILES"),
      icon: faFile,
    },
    {
      title: "Datasets",
      callback: () => console.log("DATASETS"),
      icon: faServer,
    },
    {
      title: "Experiments",
      callback: () => console.log("EXPERIMENTS"),
      icon: faFlask,
    },
    
    {
      title: "Annotate",
      callback: initializeLabelStudio,
      icon: faVectorSquare,
    },
    {
      title: "Notebook",
      callback: initializeJupyterNotebook,
      icon: faCode,
    },
  ]

  

  const handleClickTab = (e: any) => {
    setActiveTab(e.target.id)

    

  }

  return (
    <SContainer>
      {tabs &&
        tabs.map((tab: any, index: number) => {
          return (
            <STab
              key={index}
              className={activeTab === tab.title ? "active" : ""}
              onClick={(e) => {
                handleClickTab(e)
                tab.callback()
                //window.open(tab.url,'_blank', 'rel=noopener noreferrer')
              }}
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

const mapStoreStateToProps = (state: any) => {
  return {
    projectId: state['projectId'],
    name: state['name']
  }
}

export default connect(mapStoreStateToProps)(RepoTabs)
