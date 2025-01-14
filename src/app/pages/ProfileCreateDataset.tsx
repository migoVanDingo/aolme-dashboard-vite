import React, { useState } from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../components/common/containers/FlexContainers'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { DatasetAPI } from '../api/DatasetAPI'
import Routes from '../../constants/routes'
import Heading from '../components/common/Heading'
import TextInput from '../components/common/inputs/text/TextInput'
import Message from '../components/common/Message'
import TextArea from '../components/common/inputs/text/TextArea'
import { SButton } from '../components/common/styled'
import LoadingSpinner from '../components/common/loading/LoadingSpinner'
import TextInputComponent from '../components/common/inputs/text/TextInputComponent'

const SContainer = styled(SFlexCol)`
  width: 800px;
  height:calc(calc(100vh - ${({theme}) => theme.header.height}) - ${({theme}) => theme.profile.nav.height});
  align-items: baseline;
  padding: 80px 10px;
  margin: auto;
  grid-area: content;

  color: ${({ theme }) => theme.color.color_8};
  background-color: ${({ theme }) => theme.color.color_2};
  &.loading {
    align-items: center;
    justify-content: center;
  }
`

const SForm = styled(SFlexCol)`
  width: 100%;
  align-items: baseline;
  gap: 0;
`

const SButtonContainer = styled(SFlexRow)`
  width: 400px;
  margin-top: 20px;
  margin-left: auto;
  gap: 20px;
`


const ProfileCreateDataset = () => {
    const nav = useNavigate()

    const { userId, datastoreId } = useLoaderData() as {
        userId: string
        datastoreId: string
    }
    
    // use state for name, description
    const [datasetName, setDatasetName] = useState<string>("")
    const [datasetDescription, setDatasetDescription] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [nameError, setNameError] = useState<string>("")

    const handleCreate = async (e: any) => {
        if (datasetName === "") {
          setNameError("** Dataset Name is required")
        } else {
          setLoading(true)
          setNameError("")
          setDatasetName("")
          setDatasetDescription("")
          setTimeout(createDataset, 1000)
        }
      }



    const createDataset = async () => {
        const payload = {
            user_id: userId,
            name: datasetName,
            description: datasetDescription,
            datastore_id: datastoreId
        }

        console.log("dataset Payload: ", payload)

        DatasetAPI.createDataset(payload)
        .then((res: any) => {
            nav(Routes.PROFILE_DATASTORES)
        })
        .catch((err: any) => console.error("CreateDataset::::Error: ", err))
    }



    const handleCancel = () => {
        nav(-1)
      }
    

  return (
    <SContainer className={isLoading ? "loading" : ""}>
      {!isLoading ? (
        <>
          <Heading heading={"Create Dataset"} size={"md"} />
          <SForm>
            <TextInputComponent
              setInputValue={setDatasetName}
              inputValue={datasetName}
              label={"Give your Dataset a Name"}
            />
            {nameError && <Message text={nameError} color={"error"} />}



            <TextArea
              description={datasetDescription}
              setDescription={setDatasetDescription}
            />
            {/* <FileUpload handleFileChange={handleFileChange} /> */}

            <SButtonContainer>
              <SButton
                type="submit"
                handleClick={handleCreate}
                innerHtml={"Create Dataset"}
              />
              <SButton
                type="button"
                handleClick={handleCancel}
                innerHtml={"Cancel"}
              />
            </SButtonContainer>
          </SForm>
        </>
      ) : (
        <LoadingSpinner message={"Initializing Dataset"} />
      )}
    </SContainer>
  )
}

export default ProfileCreateDataset

export const loader = () => {
    const userId = localStorage.getItem("userId")
    const datastoreId = localStorage.getItem("selectedDatastore")

  return {
    userId,
    datastoreId
  }

}