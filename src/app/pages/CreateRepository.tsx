import React, { useRef, useState } from "react"
import styled from "styled-components"
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
import { setCurrentProjectId, setCurrentProjectOwner, setCurrentProjectCreatedAt, setCurrentProjectCreatedBy, setCurrentProjectDescription, setCurrentProjectLastUpdatedAt, setCurrentProjectLastUpdatedBy, setCurrentProjectName } from "../actions"
import { store } from "../store"

const SContainer = styled(SFlexCol)`
  width: 650px;
  height: calc(100vh - ${({ theme }) => theme.header.height});
  align-items: baseline;
  padding: 40px 10px;
`
const SButton = styled(Button)`
  width: 150px;
  height: 30px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.contrast.color_1};
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.color_6};
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
  const [projectName, setProjectName] = useState<string>('')
  const [projectDescription, setProjectDescription] = useState<string>('')

 
  const navigate = useNavigate()

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files)
  }

  const uploadFiles = (res: any) => {
    
    return UploadService.handleFileUpload(selectedFiles, res.data, res.data['project_id'], (e: any) => {setProgress(Math.round((100 * e.loaded) / e.total))})
  }

  const handleFormSubmit = async (e: any) => {

    e.preventDefault()
    setLoading(true)

    const response = ProjectAPI.createProject(projectName, projectDescription, projectOwner)
    .then((res: any) => {

      if(selectedFiles.length !== 0){

        uploadFiles(res).then((res: any) => {
          console.log("response: ", res)
          if(res.status === 200 ){
            navigate('/project/'+res.data['project_id'])
          }
        })
      }
        
    })
    .catch((err: any) => console.error("foc: ", err))
    // const fulResponse = UploadService.handleFileUpload(selectedFiles, null ,response.id, (e: any) => {
    //   setProgress(Math.round((100 * e.loaded) / e.total))
    // })
   

    
    
    /* UploadService.handleFileUpload(selectedFiles, project,  (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    }) */

    setLoading(false)
    
  }

  return (
    <SContainer>
      <Heading heading={"Create Repository"} size={"md"} />
      <Message
        text={"Required fields are marked with an asterisk (*)."}
        size={"sm"}
        italic={"italic"}
      />
      <UserDropdown setProjectOwner={setProjectOwner} projectOwner={projectOwner} 
      users={users}/>
      <form
        encType="multipart/form-data"
        id="ful-form"
        onSubmit={handleFormSubmit}
      >
        <TextInput setProjectName={setProjectName} projectName={projectName}/>
        <TextArea projectDescription={projectDescription} setProjectDescription={setProjectDescription}/>
        <FileUpload handleFileChange={handleFileChange} />
      
      <SButton type="submit" innerHtml={"Create Repository"} />
      </form>
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