import React from 'react'
import styled from 'styled-components'

const SContainer = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    padding: 0 0 10px 0;
    
    grid-template-rows: 1fr 4fr;
    grid-template-areas:
      "top"
      "bottom";

    box-shadow: 3px 3px 5px ${({ theme }) => theme.color.color_1};
`

const SCardTop = styled.div`
    grid-area: top;
    width: 100%;
    height: 100%;
    padding: 15px 25px 15px;
    margin: 0;
    align-items: baseline;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.color.color_1};
    border-top-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
    border-top-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
`

const SCardBottom = styled.div`
    grid-area: bottom;
    width: 100%;
    height: 100%;
    margin: 0;
    align-items: baseline;
    padding: 15px 25px 15px;
    background-color: ${({ theme }) => theme.color.color_2_5};
    border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
    border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
`
const SHeading = styled.h1`
    font-size: 1.5rem;
    font-weight: 200;
    margin: 0;
    font-family: "Helvetica", sans-serif;
    color: ${({ theme }) => theme.color.color_5};
    padding: 0;
    `

const SPara = styled.p`
    font-size: 1.2rem;
    font-weight: 200;
    margin: 0;
    font-family: "Helvetica", sans-serif;
    color: ${({ theme }) => theme.color.color_5};
    `
const SSubheading = styled.h2`
    font-size: 1.0rem;
    font-weight: 200;
    margin: 0;
    font-family: "Helvetica", sans-serif;
    color: ${({ theme }) => theme.color.color_5};
    `

const FileUploadComp = ({selectedItem}: any) => {
  return (
    <SContainer>
        <SCardTop>
            <SHeading>Empty Dataset</SHeading>
            <SPara>The selected dataset is currently empty. Use the form below to add metadata and upload files</SPara>
        </SCardTop>
        <SCardBottom>
            <SSubheading>Datastore ID: {selectedItem && selectedItem.datastore_id}</SSubheading>
            <SSubheading>Dataset ID: {selectedItem && selectedItem.dataset_id}</SSubheading>
            
        </SCardBottom>
    </SContainer>
  )
}

export default FileUploadComp