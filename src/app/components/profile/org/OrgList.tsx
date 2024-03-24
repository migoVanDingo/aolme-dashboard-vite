import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { SFlexCol } from '../../common/containers/FlexContainers'
import ListCard from '../../common/cards/ListCard'

const SContainer = styled(SFlexCol)`
    width: 100%;
    gap: 10px;
`

const OrgList = ({ organizations }: any) => {
    const [orgs, setOrgs] = useState<any>([])

    useEffect(() => {
        const init = () => {
            //console.log("ORGANIZATIONS: ", organizations)
            setOrgs(organizations)
        }


        return init()
    }, [organizations])

  return (
    <SContainer>
        {
            orgs ? orgs.map((org: any) => {
                return (
                    <ListCard key={org.organization_id} data={org}/>
                )
            }) : ""
        }
    </SContainer>
  )
}

export default OrgList