import { useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import styled from "styled-components"
import ProjectApi from "../api/ProjectAPI"
import Heading from "../components/common/Heading"
import Message from "../components/common/Message"
import UserDropdown from "../components/common/UserDropdown"
import {
  SFlexCol,
  SFlexRow,
} from "../components/common/containers/FlexContainers"
import TextArea from "../components/common/inputs/text/TextArea"
import TextInput from "../components/common/inputs/text/TextInput"
import CheckboxInput from "../components/common/inputs/toggle/CheckboxInput"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"
import { SButton } from "../components/common/styled"
import { ICreateProject } from "../utility/interface/repository"

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

const CreateProject = ({}: any) => {
  const { userId, username } = useLoaderData() as {
    userId: string
    username: string
  }

  const [isLoading, setLoading] = useState<boolean>(false)
  const [projectOwner, setProjectOwner] = useState<string>(username)
  const [projectName, setProjectName] = useState<string>("")
  const [projectDescription, setProjectDescription] = useState<string>("")
  const [projectId, setProjectId] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")

  const [isPublic, setIsPublic] = useState<boolean>(false)

  const nav = useNavigate()

  useEffect(() => {
    const init = () => {
      if (projectId && projectId !== "") {
        //nav(`/project/${projectId}`)
        setLoading(false)
      }
    }

    return init()
  }, [projectId])

  const createProject = () => {
    const project: ICreateProject = {
      user_id: userId,
      entity_type: "USER",
      entity_id: userId,
      name: projectName.trim(),
      description: projectDescription.trim(),
      is_public: isPublic,
    }

    ProjectApi.createProject(project)
      .then((res: any) => {
        sessionStorage.setItem("project_id", res.project_id)
        nav(`/project/${res.name}`)
      })
      .catch((err: any) => console.error(err))
  }

  const handleCreateProject = async (e: any) => {
    if (projectName === "") {
      setNameError("** Project Name is required")
    } else {
      setLoading(true)
      setNameError("")
      setProjectName("")
      setProjectDescription("")
      setTimeout(createProject, 1000)
    }
  }

  const handleCancel = () => {
    nav(-1)
  }

  return (
    <SContainer className={isLoading ? "loading" : ""}>
      {!isLoading ? (
        <>
          <Heading heading={"Create Project"} size={"md"} />
          <UserDropdown
            setProjectOwner={setProjectOwner}
            projectOwner={projectOwner}
            users={[projectOwner]}
          />
          <SForm>
            <TextInput
              setName={setProjectName}
              name={projectName}
              label={"Give your Project a Name"}
              size={"lg"}
            />
            {nameError && <Message text={nameError} color={"error"} />}

            <CheckboxInput
              checked={isPublic}
              setChecked={setIsPublic}
              label={"Make this project Public"}
            />

            <TextArea
              description={projectDescription}
              setDescription={setProjectDescription}
            />
            {/* <FileUpload handleFileChange={handleFileChange} /> */}

            <SButtonContainer>
              <SButton
                type="submit"
                handleClick={handleCreateProject}
                innerHtml={"Create Project"}
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
        <LoadingSpinner message={"Initializing Project"} />
      )}
    </SContainer>
  )
}

export default CreateProject

export const loader = () => {
  const userId = sessionStorage.getItem("userId")
  const username = sessionStorage.getItem("username")

  return {
    userId,
    username,
  }
}

