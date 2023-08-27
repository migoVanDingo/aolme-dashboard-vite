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
  gap: 0;
  margin-left: 0;
  box-sizing: border-box;

  border-bottom: 1px solid ${({ theme }) => theme.header.buttonColor};
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

  color: ${({ theme }) => theme.text.color};
  gap: 5px;
  border-radius: 6px;

  &:hover{
    cursor: pointer;
  }


  &.active {
    background-color: ${({ theme }) => theme.header.backgroundColor};
    font-weight: 500;
    box-shadow: 1px 2px 4px ${({ theme }) => theme.header.boxShadow}
  }
`

const SIcon = styled(FontAwesomeIcon)`
  
`

const Tabs = ({ tabs, iconArr, setContent }: any) => {
  const [active, setActive] = useState<number>(0)

  const handleClick = (index: number, tab: string) => {
    setActive(index)
    setContent(tab)
  }

  return (
    <SContainer>
      {tabs &&
        tabs.map((tab: any, index: number) => {
          return (
            <STab
              key={index}
              onClick={() => handleClick(index, tab.title)}
              className={active == index ? "active" : ""}
            >
              <SIcon
                className={active == index ? "active" : ""}
                icon={iconArr[index]}
              />
              {tab.title}
            </STab>
          )
        })}
    </SContainer>
  )
}

export default Tabs
