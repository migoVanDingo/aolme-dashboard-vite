import React, { useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers"
import { Accordion, rem } from "@mantine/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faKeyboard,
  faPencil,
  faComment,
  faVideo,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons"

const SSidebar = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.color.color_2_5};
  padding: 0px 20px;
  margin: 80px 0;
  align-items: flex-start;
  box-sizing: border-box;
`
const SHeading = styled.h2`
  width: 100%;
  font-family: sans-serif;
  font-weight: 100;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.color.color_6};
  margin: 0 0 15px;
  padding: 20px 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_4};
`

const SSidebarList = styled.ul`
  height: auto;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: fixed;
  letter-spacing: 1px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  list-style-type: disc;
  list-style-position: inside;
`

const SListItem = styled.p`
  padding: 0;
  margin: 0;
  display: inline;

  &.hover{
    color: ${({ theme }) => theme.accent.color_1};
  }

  &:hover {
    color: #0de99f;
    background-color: ${({ theme }) => theme.color.color_2_5};
    cursor: pointer;
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.color_4};
  }
`

const SListContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow-y: auto;


`

const SIcon = styled(FontAwesomeIcon)`
  padding: 0 10px;
  &.hover{
    color: ${({ theme }) => theme.accent.color_1};
  }
  
`

const SAccordion = styled(Accordion)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

`



const ActivityMapSidebarV2 = ({ subsetItems, setSelectedItem, entries }: any) => {
  const [uniqueDates, setUniqueDates] = useState<any[]>([])
  const [hoverListItem, setHoverListItem] = useState<string>("")
  useEffect(() => {
    const init = () => {
      const d = distillUniqueDates(entries)
      setUniqueDates(d)
      console.log("ActivityMapSidebarV2::uniqueDates::", d)
    }
    return init()
  }, [])

  const handleSelectItem = (title: any) => {
    setSelectedItem(title)
  }

  const distillUniqueDates = (entries: any) => {
    let uniqueSet = new Set()
    let uniqueArray: any[] = []

    entries.forEach((entry: any) => {
      if (!uniqueSet.has(entry.date)) {
        uniqueSet.add(entry.date)
        uniqueArray.push({ date: entry.date, timestamp: entry.timestamp })
      }
    })

    return uniqueArray
  }

  function convertEpochToDateWithMonthString(epochTimestamp: number) {
    // Create a new Date object from the epoch timestamp.
    const date = new Date(epochTimestamp * 1000)

    // Get the month number from the date object.
    const monthNumber = date.getMonth()

    // Get the month name from the month number.
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][monthNumber]

    // Return the date string with the month name.
    return `${monthName} ${date.getDate()}, ${date.getFullYear()}`
  }

  const handleMouseOverListItem = (id: string) => {
    setHoverListItem(id)
  }

  const handleMouseOutListItem = () => {
    setHoverListItem("")
  }

  const handleLoadActivityMap = (id: string, title: string) => {

  }

  const theme = useTheme()

  return (
    <SSidebar>
      <SHeading>{"Sessions"}</SHeading>
      <SListContainer>
        <Accordion
          variant="contained"
          styles={{
            root: {
              backgroundColor: theme.color.color_1,
              color: theme.color.color_6,
              width: "100%",
           
              
              
            },
            item: {
              backgroundColor: theme.color.color_1,
              color: theme.color.color_6,
              border: "1px solid #636363"
              
              

            },

            control: {
              backgroundColor: theme.color.color_1,
              color: theme.color.color_6,
        
           

            },

            panel: {
              backgroundColor: theme.color.color_1,
              color: theme.color.color_6,
              fontSize: "0.75rem",
              
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottom: "1px solid #3b3b3b",
              padding: "10px 0 0 0"
            
            
            },
          }}
        >
          {uniqueDates.map((date: any, index: number) => {
            return (
              <Accordion.Item key={index} value={date.date}>
                <Accordion.Control icon={<SIcon icon={faCalendar} />}>
                  {convertEpochToDateWithMonthString(date.timestamp)}
                </Accordion.Control>
                {
                  entries.map((entry: any, index: number) => {
                    if(entry.date === date.date){
                      return (
                        <Accordion.Panel key={index}>
                          <SIcon 
                          icon={faVideo} 
                          className={hoverListItem === entry.id ? "hover" : ""}
                          />
                        <SListItem 
                          onMouseOver={() => handleMouseOverListItem(entry.id)}
                          onMouseOut={handleMouseOutListItem}

                          onClick={() => handleSelectItem(entry.title)}
                          className={hoverListItem === entry.id ? "hover" : ""}
                        >{entry.title}</SListItem></Accordion.Panel>
                      )
                    }
                    
                  })
                }
              </Accordion.Item>
            )
          })}
        </Accordion>
      </SListContainer>
    </SSidebar>
  )
}

export default ActivityMapSidebarV2
