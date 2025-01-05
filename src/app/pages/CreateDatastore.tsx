import React, { useState } from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../components/common/containers/FlexContainers'
import { useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom'
import Message from '../components/common/Message'
import Heading from '../components/common/Heading'
import UserDropdown from '../components/common/UserDropdown'

import TextArea from '../components/common/inputs/text/TextArea'
import TextInput from '../components/common/inputs/text/TextInput'
import { SButton } from '../components/common/styled'
import LoadingSpinner from '../components/common/loading/LoadingSpinner'
import { DatastoreAPI } from '../api/DatastoreAPI'
import Routes from '../../constants/routes'

const SContainer = styled(SFlexCol)`
  width: 800px;

  align-items: baseline;
  padding: 80px 10px;
  margin: auto;
  grid-area: header / content;

  color: ${({ theme }) => theme.color.color_8};
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


const CreateDatastore = () => {

    const nav = useNavigate()

    const { userId } = useLoaderData() as {
        userId: string
    }
    
    // use state for name, description
    const [datastoreName, setDatastoreName] = useState<string>("")
    const [datastoreDescription, setDatastoreDescription] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [nameError, setNameError] = useState<string>("")

    const handleCreate = async (e: any) => {
        if (datastoreName === "") {
          setNameError("** Datastore Name is required")
        } else {
          setLoading(true)
          setNameError("")
          setDatastoreName("")
          setDatastoreDescription("")
          setTimeout(createDatastore, 1000)
        }
      }



    const createDatastore = async () => {
        const dataStore = {
            user_id: userId,
            name: datastoreName,
            description: datastoreDescription,
        }

        console.log("Datastore Payload: ", dataStore)

        DatastoreAPI.createDatastore(dataStore)
        .then((res: any) => {
            localStorage.setItem("datastore_id", res.datastore_id)
            nav(Routes.PROFILE_DATASTORES)
        })
        .catch((err: any) => console.error("CreateDatastore::createDatastore()::Error: ", err))
    }



    const handleCancel = () => {
        nav(-1)
      }
    

  return (
    <SContainer className={isLoading ? "loading" : ""}>
      {!isLoading ? (
        <>
          <Heading heading={"Create Project"} size={"md"} />
          <SForm>
            <TextInput
              setName={setDatastoreName}
              name={datastoreName}
              label={"Give your Project a Name"}
              size={"lg"}
            />
            {nameError && <Message text={nameError} color={"error"} />}



            <TextArea
              description={datastoreDescription}
              setDescription={setDatastoreDescription}
            />
            {/* <FileUpload handleFileChange={handleFileChange} /> */}

            <SButtonContainer>
              <SButton
                type="submit"
                handleClick={handleCreate}
                innerHtml={"Create Datastore"}
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
        <LoadingSpinner message={"Initializing Datastore"} />
      )}
    </SContainer>
  )
}

export default CreateDatastore

export const loader = () => {
    const userId = localStorage.getItem("userId")
  
    return {
      userId,
    }
  }