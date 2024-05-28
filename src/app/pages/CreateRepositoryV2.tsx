import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { RepoAPI } from "../api/RepoAPI"
import Heading from "../components/common/Heading"
import Message from "../components/common/Message"
import UserDropdown from "../components/common/UserDropdown"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import TextArea from "../components/common/inputs/text/TextArea"
import TextInput from "../components/common/inputs/text/TextInput"
import CheckboxInput from "../components/common/inputs/toggle/CheckboxInput"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"
import { SButton } from "../components/common/styled"
import { ICreateRepository } from "../utility/interface/repository"


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
    
  const userId = useSelector((state: any) => state.userId)
  const username = useSelector((state: any) => state.username)

  const [isLoading, setLoading] = useState<boolean>(false)
  const [repoOwner, setRepoOwner] = useState<string>(username)
  const [repoName, setRepoName] = useState<string>("")
  const [repoDescription, setRepoDescription] = useState<string>("")
  const [repoId, setRepoId] = useState<string>("")

  const [isPublic, setIsPublic] = useState<boolean>(false)

  const navigate = useNavigate()


  useEffect(() => {

      console.log("uid: ", userId)

  },[userId])

  useEffect(() => {
    const init = () => {
      if(repoId && repoId !== ""){
        navigate(`/repository/${repoId}`)
        setLoading(false)
      }
    }

    return init()
  }, [repoId]);


  const createRepository = () => {

    const project: ICreateRepository = {
        owner: userId,
        entity_type:"USER",
        entity_id: userId,
        name: repoName,
        description: repoDescription,
        is_public: isPublic,
        created_by: userId,
    }

    RepoAPI.createRepo(project)
    .then((res: any) => {
        console.log("RESPONSE: " , res)
        setRepoId(res.repo_id)
        
    })
    .catch((err: any) => console.error(err))

    

  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(createRepository, 1000)
        
    
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
        <LoadingSpinner message={"Initializing Repository"}/>
      )}
    </SContainer>
  )
}


export default CreateRepositoryV2
