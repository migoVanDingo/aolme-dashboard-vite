import React from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../../common/containers/FlexContainers'

const SContainer = styled(SFlexCol)`

    width: 100%;
    align-items: baseline;
    padding: 30px 30px;
    background-color: ${({ theme }) => theme.color.color_2};
    border-radius: ${({ theme }) => theme.container.borderRadius.md};
    box-sizing: border-box;
    box-shadow: 3px 3px 4px ${({ theme }) => theme.color.shadow.dark};
    

`

const SActivityContainer = styled(SFlexRow)`
    
`

const SUser = styled.p`
    margin: 0;
    padding: 0;
    color: #35beec;
    font-size: 0.8rem;
    font-weight: 400;
`

const SAction = styled.p`
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: 200;
    margin-left: 5px;

`

const SObject = styled.p`
    margin: 0;
    padding: 0;
    color: #35beec;
    font-size: 0.8rem;
    font-weight: 200;
    margin-left: 5px;
`
const SDate = styled.p`
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: 200;
    margin-top: 10px;

` 


const ActivityCard = ({activity}: any) => {

    const { user, action, object, date } = activity
   
  return (
    <SContainer>
        <SActivityContainer>
            <SUser>{user}</SUser>
            <SAction>{action}</SAction>
            <SObject>{object}</SObject>
        </SActivityContainer>
        <SDate>{date}</SDate>
    </SContainer>
  )
}

export default ActivityCard