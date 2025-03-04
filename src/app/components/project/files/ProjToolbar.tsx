import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../common/containers/FlexContainers'
import DynamicDescriptionCard from '../../common/cards/DynamicDescriptionCard'
import RowToolbarButtons from '../../common/toolbar/RowToolbarButtons'
import { faClock, faWalkieTalkie } from '@fortawesome/free-solid-svg-icons'
import TimelineModule from './TimelineModule'
import DiscussionModule from './DiscussionModule'
import NotesModule from './NotesModule'
const SContainer = styled(SFlexCol)<{gridArea: string}>`
    width: 100%;
    grid-area: ${(props: any) => props.gridArea || ''};
    background-color: ${({theme}) => theme.color.color_2_5};
    border-radius: ${({theme}) => theme.container.borderRadius.md};
    box-shadow: 2px 2px 8px ${({ theme }) => theme.color.shadow.dark};
    
    `

const toolbarItems = [
    {
        label: "Timeline",
        icon: faClock,
        onClick: () => console.log("Timeline clicked"),
        id: "timeline"
    },
    {
        label: "Discussions",
        icon: faWalkieTalkie,
        onClick: () => console.log("Discussions clicked"),
        id: "discussions"

    },
    {
        label: "Notes",
        icon: faClock,
        onClick: () => console.log("Notes clicked"),
        id: "notes"
    }
]

const ProjToolbar = ({gridArea}: any) => {

    const [activeItem, setActiveItem] = React.useState<string>(sessionStorage.getItem("projectToolbarActiveItem") || "timeline")

    const handleSetActiveItem = (id: string) => {
        sessionStorage.setItem("projectToolbarActiveItem", id)
        setActiveItem(id)
    }

  return (
    <SContainer gridArea={gridArea}>
        <DynamicDescriptionCard 
            containerStyles={"p-1 b-none"}
            headingStyles={"f-md f-weight-200"} 
            heading={"Project Toolbar"}
            textStyles={"f-md f-weight-200"}
            text={"Use the project toolbar to view project timelines, discussions and notes."} />

        <RowToolbarButtons items={toolbarItems} activeItem={activeItem} setActiveItem={handleSetActiveItem}/>

        {
            activeItem === "timeline" && <TimelineModule />
        }

        {
            activeItem === "discussions" && <DiscussionModule />
        }

        {
            activeItem === "notes" && <NotesModule />
        }

    </SContainer>
  )
}

export default ProjToolbar