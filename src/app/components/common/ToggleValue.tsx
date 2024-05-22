import React, { useState } from 'react'
import styled from 'styled-components'
import { SFlexRow } from './containers/FlexContainers'
import { Switch } from '@mantine/core';

const SContainer = styled(SFlexRow)`
    width: 100%;
    padding: 5px 20px;
    box-sizing: border-box;
    border-top: 1px solid ${({ theme }) => theme.color.color_5};
    height: 50px;
    align-items: center;
    
`

const STitle = styled.p`
    font-size: 1rem;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.color.color_5};
    
`

const ToggleValue = ({ item, handleToggle }: any) => {

    const [toggle, setToggle] = useState<boolean>(item.toggle)

    const handleToggleValue = (title: string, toggle: boolean) => {
        setToggle(toggle)
        handleToggle(title, toggle)
    }
    

  return (
    <SContainer>
        <STitle>{item.title}</STitle>
        <Switch style={{ marginLeft: "auto"}} checked={toggle} color="teal" size='md' onChange={(event: any) => handleToggleValue(item.title, event.currentTarget.checked)} />
        
    </SContainer>
  )
}

export default ToggleValue