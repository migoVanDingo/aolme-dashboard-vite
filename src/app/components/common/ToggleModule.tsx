import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from './containers/FlexContainers'
import ToggleValue from './ToggleValue'

const SContainer = styled(SFlexCol)`
    border: 1px solid ${({ theme }) => theme.color.color_5};
    width: 200px;
    height: 100%;
    border-radius: ${({ theme }) => theme.container.borderRadius.md};
    align-items: flex-start;
    background-color: ${({ theme }) => theme.color.color_2_5};


`
const SHeading = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin-left: 10px;
`



const ToggleModule = ({ heading, list, handleUpdateList }: any) => {

  const [objectList, setObjectList] = useState<any[]>(list);

  useEffect(() => {
    
    const init = () => {
      updateList(objectList)
    }

    return init()
  }, [objectList]);

  const handleToggle = (title: string, toggle: boolean) => {
    // console.log("ToggleModule::handleToggle::", title, toggle)
    // console.log("PO:", objectList)
    let updatedObjectList
    if(title === "Typing" || title === "Writing" || title === "Talking"){
      updatedObjectList = objectList.filter((participant: any) => participant.action !== title)
      updatedObjectList.push({ action: title, toggle })
    } else {
      updatedObjectList = objectList.filter((participant: any) => participant.title !== title)
      updatedObjectList.push({ title, toggle })
    }
    
    setObjectList(updatedObjectList)
  }

  const updateList = (objectList: any[]) => {
    handleUpdateList(objectList)
    //console.log("ToggleModule::updateParticipantsList::", objectList)
  }

  return (
    <SContainer>
      {heading && <SHeading>{heading}</SHeading>}
      {list.map((item: any, index: number) => {
        return (
          <ToggleValue key={index} item={item.title ? item : {title: item.action, toggle: item.toggle, color: item.color}} handleToggle={handleToggle} />
        )
      })}
    </SContainer>
  )
}

export default ToggleModule