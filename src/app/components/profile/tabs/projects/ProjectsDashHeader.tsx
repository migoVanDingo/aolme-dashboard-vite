import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import Tabs from "../../../common/Tabs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import CreateButton from "../../../common/buttons/CreateButton"

const SContainer = styled(SFlexRow)`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
  grid-area: header;
  padding: 0;
  margin: 0;

`

//Project Dashboard Heading
const SHeading = styled.h1`
  font-size: 1.8rem;

  font-weight: 500;
  color: ${({ theme }) => theme.color.color_5};
  margin: 0;
  padding: 0 0 15px 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`


const SContainerRight = styled(SFlexRow)`
  margin-left: auto;

`

const SIcon = styled(FontAwesomeIcon)`
  position: relative;

  margin-left: auto;
`



const ProjectsDashHeader = () => {

    const nav = useNavigate()

    //Callbacks
    const handleCreateNew = (action: string) => {
        console.log(action)
        nav(action)
    }

    
        const createNewButton = {
          title: "Create New",
          type: "new",
          action: "/profile/projects/create",
          icon: faPlus,
          className: "margin-left-auto create-new",
          callback: handleCreateNew
        }
      

  return (
    <SContainer>
      <SHeading>Projects</SHeading>
      <CreateButton handleClick={() => createNewButton.callback(createNewButton.action)} className={createNewButton.className} innerHtml={createNewButton.title} icon={createNewButton.icon}/>
    </SContainer>
  )
}

export default ProjectsDashHeader
