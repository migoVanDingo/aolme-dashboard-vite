import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { ProjectAPI } from "../api/ProjectAPI"
import Heading from "../components/common/Heading"
import Message from "../components/common/Message"
import UserDropdown from "../components/common/UserDropdown"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import FileUpload from "../components/common/inputs/file-upload/FileUpload"
import TextArea from "../components/common/inputs/text/TextArea"
import TextInput from "../components/common/inputs/text/TextInput"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"
import { SButton } from "../components/common/styled"
import UploadService from "../services/FileUploadService"

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

const users = ["Miguel", "Wenjing", "Venkatesh", "Sebastian"]

const CreateRepository = ({ userId }: any) => {
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

  useEffect(() => {

      console.log("uid: ", userId)
  

  },[userId])

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files)
  }

  const uploadFiles = (res: any) => {
    /* return UploadService.handleFileUpload(
      selectedFiles,
      res.data,
      res.data["project_id"],
      (e: any) => {
        setProgress(Math.round((100 * e.loaded) / e.total))
      },
    ) */
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
              setName={setProjectName}
              name={projectName}
              label={"Give your Repo a Name"}
            />
            <TextArea
              description={projectDescription}
              setDescription={setProjectDescription}
            />
            <FileUpload handleFileChange={handleFileChange} />

            <SButton type="submit" innerHtml={"Create Repository"} />
          </form>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </SContainer>
  )
}

const mapStoreStateToProps = (state: any) => {
  return {
    ...state
  }
}

export default connect(mapStoreStateToProps)(CreateRepository)
