import React, { useRef, useState } from "react"
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
  setCurrentProjectId,
  setCurrentProjectOwner,
  setCurrentProjectCreatedAt,
  setCurrentProjectCreatedBy,
  setCurrentProjectDescription,
  setCurrentProjectLastUpdatedAt,
  setCurrentProjectLastUpdatedBy,
  setCurrentProjectName,
} from "../actions"
import { store } from "../store"

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
const SButton = styled(Button)`
  width: 150px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 2px 2px 8px ${({ theme }) => theme.color.shadow.dark};
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.color_4};
    color: ${({ theme }) => theme.color.color_8};
  }
`

const SLoadingContainer = styled(SFlexCol)`
  
  width: 500px;
  height: 350px;
  border-radius:${({ theme }) => theme.container.borderRadius.lg};
  background-color: ${({ theme }) => theme.color.color_2};
  box-shadow: ${({ theme }) => theme.color.shadow.dark};
  
  padding-top: 50px;
  box-sizing: border-box;
`

const SLoadingHeading = styled.p`
  font-size: 2rem;
  font-family: "Raleway", sans-serif;
  color: ${({ theme }) => theme.accent.color_1};
  font-weight: 700;
  text-shadow: 2px 2px 4px black;
`
const myAnimation = keyframes`
  
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`
const SSpinner = styled.div`
  &.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  &.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({ theme }) => theme.accent.color_1};
    border-radius: 50%;
    animation: ${myAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.accent.color_1} transparent transparent transparent;
  }
  &.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  &.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  &.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
`



const users = ["Miguel", "Wenjing", "Venkatesh", "Sebastian"]

const CreateRepository = () => {
  const [fileName, setFileName] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)
  const [uploadLocalFiles, setUploadLocalFiles] = useState<any[]>([])
  const [selectedFiles, setSelectedFiles] = useState<any[]>([])
  const [currentFile, setCurrentFile] = useState<any>(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")
  const [fileInfos, setFileInfos] = useState([])

  const [projectOwner, setProjectOwner] = useState<string>(users[0])
  const [projectName, setProjectName] = useState<string>("")
  const [projectDescription, setProjectDescription] = useState<string>("")

  const navigate = useNavigate()

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files)
  }

  const uploadFiles = (res: any) => {
    return UploadService.handleFileUpload(
      selectedFiles,
      res.data,
      res.data["project_id"],
      (e: any) => {
        setProgress(Math.round((100 * e.loaded) / e.total))
      },
    )
  }

  const createProject = async (e: any) => {
    const response = await ProjectAPI.createProject(
      projectName,
      projectDescription,
      projectOwner,
    )
      .then((res: any) => {
        console.log("res: ", res)
        if (selectedFiles.length !== 0) {
          console.log("int: ", res.data["project_id"])
          uploadFiles(res).then((r: any) => {
            console.log("response: ", r)
            if (r.status === 200) {
              navigate("/project/" + res.data["project_id"])
            }
          })
        } else {
          navigate("/project/" + res.data["project_id"])
        }
      })
      .catch((err: any) => console.error("foc: ", err))
    // const fulResponse = UploadService.handleFileUpload(selectedFiles, null ,response.id, (e: any) => {
    //   setProgress(Math.round((100 * e.loaded) / e.total))
    // })

    /* UploadService.handleFileUpload(selectedFiles, project,  (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    }) */

  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log("loading...")
    await createProject(e)
    //setLoading(false)
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
            setProjectOwner={setProjectOwner}
            projectOwner={projectOwner}
            users={users}
          />
          <form
            encType="multipart/form-data"
            id="ful-form"
            onSubmit={handleFormSubmit}
          >
            <TextInput
              setProjectName={setProjectName}
              projectName={projectName}
            />
            <TextArea
              projectDescription={projectDescription}
              setProjectDescription={setProjectDescription}
            />
            <FileUpload handleFileChange={handleFileChange} />

            <SButton type="submit" innerHtml={"Create Repository"} />
          </form>
        </>
      ) : (
        <SLoadingContainer>
          <SLoadingHeading>Initializing Project</SLoadingHeading>
          <SSpinner className="lds-ring"><div></div><div></div><div></div><div></div></SSpinner>
        </SLoadingContainer>
      )}
    </SContainer>
  )
}

export default CreateRepository

/* const upload = (fileName: string) => {
  let uploadFile = selectedFiles[0]

  const renamedFile = new File([uploadFile], fileName, {
    type: uploadFile.type,
    lastModified: uploadFile.lastModified,
  })

  setProgress(0)
  setCurrentFile(renamedFile)

  UploadService.upload(renamedFile, (event: any) => {
    setProgress(Math.round((100 * event.loaded) / event.total))
  })
    .then((response) => {
      setMessage(response.data.message)
      console.log(response.data.message)
      console.log("right here")
      return JSON.stringify(response)
    })
     .then((files) => {
      setFileInfos(files.data)
    }) 
    .catch((err) => {
      setProgress(0)
      console.error(err)
      console.log("Could not upload file")
      setMessage("Could not upload the file!")
      setCurrentFile(undefined)
    })

  setSelectedFiles([])
} */
