import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../common/containers/FlexContainers'
import DashboardHeader from '../dataset/header/DashboardHeader'
import { DatastoreAPI } from '../../../api/DatastoreAPI'
import DatastoreList from './DatastoreList'
import { useLoaderData } from 'react-router-dom'

const SContainer = styled(SFlexCol)`
    width: 100%;
    min-height: 100vh;
    padding: 50px;
    overflow-y: auto;
    grid-area: content;
    align-items: baseline;

    `

const SHeader = styled.h1`
    font-size: 1.5rem;
    font-weight: 200;
    color: ${({ theme }) => theme.color.color_6};
    margin-bottom: 20px;
    
`

const SPara = styled.p`
    font-size: 1rem;
    font-weight: 200;
    color: ${({ theme }) => theme.color.color_6};
    margin-bottom: 20px;

    padding: 0;
    text-align: justify;
`

const DatastoreDashboard = () => {

    const { orgDatastoreList } = useLoaderData() as { orgDatastoreList: any[] }

    const [orgList, setOrgList] = useState<any[]>(orgDatastoreList)


    const [hover, setHover] = useState(false)
    const mouseOver = () => setHover(true)
    const mouseOut = () => setHover(false)

    const handleShowCreateView = () => {}
  return (
    <SContainer>
       {/*  DATASTORE HEADER -- heading, create button, search bar*/}
       <DashboardHeader
          handleCreateNew={handleShowCreateView}
          hover={hover}
          mouseOver={mouseOver}
          mouseOut={mouseOut}
          heading={"Datastore Dashboard"}
          type={"Datastore"}
        />
        <SPara>Access your Datastores from this dashboard.  A datastore contains all of the vidoe, ground truth, annotation and other files that make up your larger dataset. The AOLME Video Datastore is one example. Within this datastore, you can launch the Labeler and generate ground-truth and ROI annotations.  The datastore will track these files and will give you the option to generate the trims needed to train the 3D Dyadic CNN. The datastore will house these files and make them available to your algorithms within the pipeline.  Select a Datastore, or create a new one.</SPara>


        <DatastoreList orgDatastoreList={orgList} />

       {/*  DATASTORE LIST */}
    </SContainer>
  )
}

export default DatastoreDashboard

export const loader = async () => {
    const orgId = sessionStorage.getItem("orgId") as string
    const orgDatastoreList = await DatastoreAPI.getOrgDatastoreList(orgId)
    
    return {
        orgDatastoreList
    }
}