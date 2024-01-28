import React, { useEffect, useRef, useState } from "react"
import styled, { keyframes } from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import Heading from "../components/common/Heading"
import Message from "../components/common/Message"
import UserDropdown from "../components/common/UserDropdown"
import TextInput from "../components/common/inputs/text/TextInput"
import TextArea from "../components/common/inputs/text/TextArea"
import FileUpload from "../components/common/inputs/file-upload/FileUpload"
import Button from "../components/common/buttons/Button"
import UploadService from "../services/FileUploadService"
import axios from "axios"
import { JSONTest } from "../services/http-common"
import { ICreateProject } from "../utility/interface/project"
import { ProjectAPI } from "../api/ProjectAPI"
import { useNavigate } from "react-router-dom"
import {
  setProjectId,
  setProjectOwner,
  setProjectCreatedAt,
  setProjectCreatedBy,
  setProjectDescription,
  setProjectLastUpdatedAt,
  setProjectLastUpdatedBy,
  setProjectName,
} from "../actions"
import { store } from "../store"
import { connect, useDispatch, useSelector } from "react-redux"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"
import { SButton } from "../components/common/styled"
import CheckboxInput from "../components/common/inputs/toggle/CheckboxInput"
import { ICreateRepository } from "../utility/interface/repository"
import { RepoAPI } from "../api/RepoAPI"

const SContainer = styled(SFlexCol)`
  width: 650px;
  height: calc(100vh - ${({ theme }) => theme.header.height});
  align-items: baseline;
  padding: 40px 10px;
  

  &.loading {
    align-items: center;
    justify-content: center;
  }
`


const CreateRepositoryV2 = ({ }: any) => {
    
  const { userId, username } = useSelector((state: any) => state)

  const [isLoading, setLoading] = useState<boolean>(false)
  const [repoOwner, setRepoOwner] = useState<string>(username)
  const [repoName, setRepoName] = useState<string>("")
  const [repoDescription, setRepoDescription] = useState<string>("")

  const [isPublic, setIsPublic] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {

      console.log("uid: ", userId)

  },[userId])


  const createRepository = () => {

    const project: ICreateRepository = {
        owner: userId,
        entity_id: userId,
        name: repoName,
        description: repoDescription,
        is_public: isPublic,
        created_by: userId,
    }

    RepoAPI.createRepo(project)
    .then((res: any) => {
        console.log("RESPONSE: " , res.data)
    })
    .catch((err: any) => console.error(err))

    console.log("project: ", project)

  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log("loading...")
    createRepository()
    
  }

  return (
    <SContainer className={isLoading ? "loading" : ""}>
      {!isLoading ? (
        <>
          <Heading heading={"Create Repository"} size={"md"} />
          <Message
            text={"Required fields are marked with an asterisk (*)."}
            size={"sm"}
            italic={"italic"}
          />
          <UserDropdown
            setProjectOwner={setRepoOwner}
            projectOwner={repoOwner}
            users={[repoOwner]}
          />
          <form
            encType="multipart/form-data"
            id="ful-form"
            onSubmit={handleFormSubmit}
          >
            <TextInput
              setName={setRepoName}
              name={repoName}
              label={"Give your Repo a Name"}
            />

            <CheckboxInput checked={isPublic} setChecked={setIsPublic} label={"Make this repo Public"} />
            
            <TextArea
              description={repoDescription}
              setDescription={setRepoDescription}
            />
            {/* <FileUpload handleFileChange={handleFileChange} /> */}

            <SButton type="submit" innerHtml={"Create Repository"} />
          </form>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </SContainer>
  )
}


export default CreateRepositoryV2
