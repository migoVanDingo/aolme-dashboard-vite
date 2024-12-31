import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { SFlexRow } from "../../common/containers/FlexContainers"


const SContainer = styled(SFlexRow)`
  grid-area: tabs;
  align-items: end;
  gap: 20px;
  padding: 0 0 0 calc(${({ theme }) => theme.spacing.edges} + 10px);
`

const STab = styled(SFlexRow)`
  gap: 5px;
  font-size: 0.8rem;
  box-sizing: border-box;
  padding: 5px ;
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

const RepoTabs = ({ activeTab, setActiveTab, tabs}: any) => {
  

  const [highlightedTab, setHighlightedTab] = React.useState<string>(activeTab)

  useEffect(() => {
    const init = () => {
   
      if(activeTab === ""){
        setHighlightedTab("Repositories")
      }
    }

    return init()
  }, []);



  

  const handleClickTab = (tab: any) => {

    setActiveTab(tab)
    setHighlightedTab(tab)
  }

  return (
    <SContainer>
      {tabs &&
        tabs.map((tab: any, index: number) => {
          return (
            <STab
              key={index}
              className={highlightedTab === tab.title ? "active" : ""}
              onClick={() => handleClickTab(tab.title)}
        
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
