import React, { useEffect, useState } from "react"
import styled from "styled-components"
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
  padding: 50px 20px;
  margin: 130px 0;
  align-items: flex-start;
  box-sizing: border-box;
`
const SHeading = styled.h2`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.color_6};
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_2_5};
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

const entries = [
  
  {
    timestamp: 1490904812,
    title: "G-C1L1P-Mar30-C-Kelly_q2_03-06",
    date: "20170330",
    id:"a18rjkI92b"
  },
  {
    timestamp: 1490904812,
    title: "G-C1L1P-Mar30-C-Kelly_q2_04-06",
    date: "20170330",
    id:"a18rjkI92c"
  },
  {
    timestamp: 1490904812,
    title: "G-C1L1P-Mar30-C-Kelly_q2_05-06",
    date: "20170330",
    id:"a18rjkI92d"
  },
  {
    timestamp: 1490904812,
    title: "G-C1L1P-Mar30-C-Kelly_q2_06-06",
    date: "20170330",
    id:"a18rjkI92e"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-E-Irma_q2_01-08",
    date: "20170302",
    id:"a18rjkI92f"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-E-Irma_q2_02-08",
    date: "20170302",
    id:"a18rjkI92g"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-E-Irma_q2_03-08",
    date: "20170302",
    id:"a18rjkI92h"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-E-Irma_q2_04-08",
    date: "20170302",
    id:"a18rjkI92i"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-E-Irma_q2_05-08",
    date: "20170302",
    id:"a18rjkI92j"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-E-Irma_q2_06-08",
    date: "20170302",
    id:"a18rjkI92k"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-B-Scott_q2_01-09_30fps",
    date: "20170302",
    id:"a18rjkI92n"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-B-Scott_q2_02-09_30fps",
    date: "20170302",
    id:"a18rjkI92o"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-B-Scott_q2_03-09_30fps",
    date: "20170302",
    id:"a18rjkI92p"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-B-Scott_q2_04-09_30fps",
    date: "20170302",
    id:"a18rjkI9q2"
  },
  {
    timestamp: 1488485612,
    title: "G-C1L1P-Mar02-B-Scott_q2_05-09_30fps",
    date: "20170302",
    id:"a18rjkI92r"
  },
  
]

const ActivityMapSidebarV2 = ({ subsetItems, setSelectedItem }: any) => {
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

  const handleSelectItem = (item: any) => {
    setSelectedItem(item)
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

  return (
    <SSidebar>
      <SHeading>{}</SHeading>
      <SListContainer>
        <Accordion
          variant="contained"
          styles={{
            root: {
              backgroundColor: "#1c1c1c",
              color: "#b0b0b0",
              width: "100%",
           
              
              
            },
            item: {
              backgroundColor: "#1c1c1c",
              color: "#b0b0b0",
              border: "1px solid #636363"
              
              

            },

            control: {
              backgroundColor: "#242424",
              color: "#b0b0b0",
        
           

            },

            panel: {
              backgroundColor: "#1c1c1c",
              color: "#b0b0b0",
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
