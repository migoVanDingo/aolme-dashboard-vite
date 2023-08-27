import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../common/containers/FlexContainers"
import { faFile, faServer, faFlask, faVectorSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
  
  color: ${({ theme }) => theme.header.buttonColorHover};

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.header.buttonColor};
    cursor: pointer;
  }

  &.active{
    border-bottom: 2px solid ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.header.buttonColor};
  }
`

const SIcon = styled(FontAwesomeIcon)``

const tabs = [
  {
    title: "Files",
    url: "link",
    icon: faFile,
  },
  {
    title: "Datasets",
    url: "link",
    icon: faServer,
  },
  {
    title: "Experiments",
    url: "link",
    icon: faFlask,
  },
  ,
  {
    title: "Annotate",
    url: "link",
    icon: faVectorSquare,
  },
]

const RepoTabs = ({ activeTab, setActiveTab }: any) => {

    const handleClickTab = (e: any) => {
        setActiveTab(e.target.id)
    }

  return (
    <SContainer>
      {tabs &&
        tabs.map((tab: any, index: number) => {
          return (
            <STab key={index} className={activeTab === tab.title ? "active" : ''} onClick={handleClickTab} id={tab.title}>
              <SIcon icon={tab.icon} />
              {tab.title}
            </STab>
          )
        })}
    </SContainer>
  )
}

export default RepoTabs
