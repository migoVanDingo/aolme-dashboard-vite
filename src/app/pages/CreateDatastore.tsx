import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../components/common/containers/FlexContainers'
import Heading from '../components/common/Heading'
import Message from '../components/common/Message'

import Routes from '../../constants/routes'
import { DatastoreAPI } from '../api/DatastoreAPI'
import TextArea from '../components/common/inputs/text/TextArea'
import TextInputComponent from '../components/common/inputs/text/TextInputComponent'
import LoadingSpinner from '../components/common/loading/LoadingSpinner'
import { SButton } from '../components/common/styled'

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
            sessionStorage.setItem("datastore_id", res.datastore_id)
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
          <Heading heading={"Create Datastore"} size={"md"} />
          <SForm>
            <TextInputComponent
              setInputValue={setDatastoreName}
              inputValue={datastoreName}
              label={"Give your Datastore a Name"}
           
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
    const userId = sessionStorage.getItem("userId")
  
    return {
      userId,
    }
  }