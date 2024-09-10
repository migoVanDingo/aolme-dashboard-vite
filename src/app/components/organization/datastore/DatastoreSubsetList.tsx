import React from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../../common/containers/FlexContainers'
import { SUserRow } from '../../styled/SOrganization'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const SContainer = styled(SFlexCol)`
    width: 100%;
    overflow-y: auto;
    align-items: center;
    
    gap: 20px;
    padding-top: 5px;
    `
const SIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: ${({ theme }) => theme.color.color_5};
    margin-right: 5px;
    
    &.ready{
        color: green;
    }
    
    &.not-ready{
        color: red;
    }
`

const SFieldValue = styled(SFlexRow)`
  min-width: 110px;
  padding: 10px;
  box-sizing: border-box;

  transition: all 0.3s ease;
  color: ${({ theme }) => theme.color.color_5};
  font-size: 0.9rem;
  font-weight: 300;

    &.long {
        min-width: 280px;

    }

    &.short {
        min-width: 100px;

    }
`
const SListContainer = styled(SFlexCol)`
border: 1px solid ${({ theme }) => theme.color.color_3};
width: 100%;
border-radius: ${({ theme }) => theme.container.borderRadius.sm};
align-items: baseline;
padding: 5px;
box-sizing: border-box;
background-color: ${({ theme }) => theme.color.color_3};
box-shadow: 2px 2px 4px ${({ theme }) => theme.color.shadow.dark};
`

const SLink = styled.a`
    color: ${({ theme }) => theme.color.color_6};
    font-size: 0.9rem;
    font-weight: 300;
    text-decoration: none;
    &:hover {
        color: ${({ theme }) => theme.accent.color_1};
        cursor: pointer;
    }
`

const DatastoreSubsetList = ({subsetList}: any) => {
    const handleViewSubsetDetails = (subsetId: any) => {
        console.log(`Viewing subset details for ${subsetId}`)
    }
  return (
    <SListContainer>
        <SUserRow className={"th subset-table-header"}>
            <SFieldValue className="long">Subset ID</SFieldValue>
            <SFieldValue className="short">Cohort</SFieldValue>
            <SFieldValue className="short">Level</SFieldValue>
            <SFieldValue className="">School</SFieldValue>
            <SFieldValue className="short">Date</SFieldValue>
            <SFieldValue className="short">Group</SFieldValue>
            <SFieldValue className="">Facilitator</SFieldValue>
            <SFieldValue className="">Type</SFieldValue>
            <SFieldValue className="short">Ready</SFieldValue>
            <SFieldValue className="">View</SFieldValue>
        </SUserRow>

        {
            subsetList.map((subset: any) => (
                <SUserRow key={subset.id}>
                    <SFieldValue className="long">{subset.subsetId}</SFieldValue>
                    <SFieldValue className="short">{subset.cohort}</SFieldValue>
                    <SFieldValue className="short">{subset.level}</SFieldValue>
                    <SFieldValue className="">{subset.school}</SFieldValue>
                    <SFieldValue className="short">{subset.date}</SFieldValue>
                    <SFieldValue className="short">{subset.group}</SFieldValue>
                    <SFieldValue className="">{subset.facilitator}</SFieldValue>
                    <SFieldValue className="">{subset.type}</SFieldValue>

                    <SFieldValue className="short"><SIcon className={"not-ready"} icon={faX}/></SFieldValue>
                    <SFieldValue className=""><SLink onClick={() => handleViewSubsetDetails(subset.subsetId)}>View Details</SLink></SFieldValue>
                </SUserRow>
            ))
        }
    </SListContainer>
  )
}

export default DatastoreSubsetList