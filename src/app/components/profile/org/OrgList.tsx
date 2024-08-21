import { useEffect, useState } from 'react'
import styled from "styled-components"
import ListCard from '../../common/cards/ListCard'
import { SFlexCol } from '../../common/containers/FlexContainers'

const SContainer = styled(SFlexCol)`
    width: 100%;
    gap: 10px;
    grid-area: content;
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