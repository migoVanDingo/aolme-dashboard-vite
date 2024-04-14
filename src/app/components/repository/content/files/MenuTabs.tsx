import React from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import dvcImg from "../../../../../assets/dvc.jpeg"
import gitImg from "../../../../../assets/git.png"

const SContainer = styled(SFlexRow)`
  background-color: ${({ theme }) => theme.color.color_0};
  gap: 10px;
  width: 100%;
  /* border-bottom: 1px solid ${({theme}) => theme.color.color_5}; */

`

const STab = styled(SFlexRow)`
  gap: 5px;
  font-size: 0.8rem;
  box-sizing: border-box;
  padding: 10px;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  color: ${({ theme }) => theme.color.color_5};

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.color.color_7};
    cursor: pointer;
  }

  &.active {
    border-bottom: 3px solid ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.color.color_7};
  }
`

const SImage = styled.img`
  height: 10px;
  width: 10px;
`


const SIcon = styled(FontAwesomeIcon)``



const MenuTabs = ({ activeTab, setActiveTab, handleSelectFileMenuOption, tabs, setFolderPath }: any) => {
  const handleClickTab = (e: any, type: string) => {
    console.log("tabe: " , e.target.id)
    console.log("type: " , type)
    setActiveTab(type)
    setFolderPath([type.toLowerCase()])
    handleSelectFileMenuOption(type)
  }

  
    /* {
      title: "Notebooks",
      url: "link",
      type: "NOTEBOOK",
      icon: faBookOpen,
      callback: () => { console.log('not implemented')}
    }, 
    {
      title: "DVC",
      url: "link",
      image: dvcImg,
      callback: () => { console.log('not implemented')}
    },
    {
      title: "Git",
      url: "link",
      image: gitImg,
      callback: () => { console.log('not implemented')}
    },*/
  

  return (
    <SContainer>
      {tabs &&
        tabs.map((tab: any, index: number) => {
          return (
            <STab
              key={index}
              className={activeTab === tab.type ? "active" : ""}
              onClick={(e: any) => handleClickTab(e, tab.type)}
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
