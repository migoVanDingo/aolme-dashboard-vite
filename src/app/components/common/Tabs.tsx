import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "./containers/FlexContainers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface IContainer {}

const SContainer = styled(SFlexRow)`
  width: 100%;
  grid-area: tabs;
  padding: 10px;
  margin: 0;
  gap: 10px;
  margin-left: 0;
  box-sizing: border-box;


`
const STab = styled(SFlexRow)`
  box-sizing: content-box;
  width: 120px;
  height: 30px;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 0.8rem;
  background-color: ${({ theme }) => theme.color.color_1};

  color: ${({ theme }) => theme.color.color_7};
  gap: 5px;
  border-radius: 6px;

  &:hover{
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.color_2_5};
    border: 1px solid ${({ theme }) => theme.color.color_3};
  }


  &.active {
    border: 1px solid ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
    font-weight: 500;
    box-shadow: 1px 2px 4px ${({ theme }) => theme.color.shadow.dark}
  }

  &.create-new{
    background-color: ${({ theme }) => theme.accent.color_1_dim};
    color: ${({ theme }) => theme.color.color_7};
    font-weight: 500;
    font-size: .9rem;
    box-shadow: 1px 2px 4px ${({ theme }) => theme.color.shadow.dark};
    margin-left: auto;

    &:hover{
      cursor: pointer;
      background-color: ${({ theme }) => theme.accent.color_1};
      color: ${({ theme }) => theme.color.color_9};
    }
  }
`

const SIcon = styled(FontAwesomeIcon)`
  
`

const Tabs = ({ tabs, activeTab, setContent }: any) => {
  const [active, setActive] = useState<number>(0)

  const handleClick = (index: number, tab: string) => {
    setActive(index)
    console.log(tab)
    setContent(tab)
  }

  return (
    <SContainer>
      {tabs &&
        tabs.map((tab: any, index: number) => {
          return (
            <STab
              key={index}
              onClick={() => handleClick(index, tab.type)}
              className={tab.className}
            >
              <SIcon
                className={active == index ? "active" : ""}
                icon={tab.icon}
              />
              {tab.title}
            </STab>
          )
        })}
    </SContainer>
  )
}

export default Tabs
