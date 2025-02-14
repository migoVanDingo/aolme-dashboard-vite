import styled from 'styled-components'

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
    grid-area: datastore-upload;
`
const SHeading = styled.h1`
    font-size: 1.3rem;
    font-weight: 200;
    margin: 0;
    font-family: "Helvetica", sans-serif;
    color: ${({ theme }) => theme.color.color_5};
    padding: 0;
    width: 100%;
    padding: 10px;
    `

const SPara = styled.p`
    font-size: 1.0rem;
    font-weight: 200;
    margin: 0;
    font-family: "Helvetica", sans-serif;
    color: ${({ theme }) => theme.color.color_5};
    text-align: justify;
    `

const DatastoreFileUpload = () => {
  return (
    <SContainer>
        <SHeading>Upload Files</SHeading>
        <SPara>This is where you upload files that will be shared by all datasets created within this datastore. You can upload video, audio, image files. Anything that you're going to</SPara>
    </SContainer>
  )
}

export default DatastoreFileUpload