import React from "react"
import styled from "styled-components"
import {
  faFile,
  faHardDrive,
  faCubes,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import dvcImg from "../../../../../assets/dvc.jpeg"
import gitImg from "../../../../../assets/git.png"

const SContainer = styled(SFlexRow)`
  background-color: ${({ theme }) => theme.color.color_3};
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid ${({theme}) => theme.button.branch.border};

`

const STab = styled(SFlexRow)`
  gap: 5px;
  font-size: 0.8rem;
  box-sizing: border-box;
  padding: 10px;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  color: ${({ theme }) => theme.header.buttonColorHover};

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.header.buttonColor};
    cursor: pointer;
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.header.buttonColor};
  }
`

const SImage = styled.img`
  height: 10px;
  width: 10px;
`


const SIcon = styled(FontAwesomeIcon)``

const tabs = [
  {
    title: "All",
    url: "link",
    icon: faFile,
  },
  {
    title: "Data",
    url: "link",
    icon: faHardDrive,
  },
  {
    title: "Models",
    url: "link",
    icon: faCubes,
  },
  ,
  {
    title: "Notebooks",
    url: "link",
    icon: faBookOpen,
  },
  {
    title: "DVC",
    url: "link",
    image: dvcImg,
  },
  {
    title: "Git",
    url: "link",
    image: gitImg,
  },
]

const MenuTabs = ({ activeTab, setActiveTab }: any) => {
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
              onClick={handleClickTab}
              id={tab.title}
            >
              {tab.icon && <SIcon icon={tab.icon} />}
              {tab.image && <SImage src={tab.image} />}
              {tab.title}
            </STab>
          )
        })}
    </SContainer>
  )
}

export default MenuTabs
