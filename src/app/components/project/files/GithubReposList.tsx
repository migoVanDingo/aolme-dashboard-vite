import React, { useEffect } from "react"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import styled, { useTheme } from "styled-components"
import DataTable from "../../common/DataTable"
import GithubReposDataTable from "./GithubReposDataTable"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import DynamicHeading from "../../common/DynamicHeading"
import LoadingSpinner from "../../common/loading/LoadingSpinner"
import { useSelector } from "react-redux"
import { PayloadCloneRepoProject } from "../../../api/payload/PayloadCloneRepoProject"
import { JobAPI } from "../../../api/job/JobAPI"
import ProjectApi from "../../../api/ProjectAPI"

const SContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.color_1};
  padding: 0;
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-top: 1px solid ${({ theme }) => theme.color.color_3};
`

const SModalContainer = styled(Modal)`
  .mantine-Modal-body {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.color_2_5};
    border: 2px solid ${({ theme }) => theme.accent.color_1_dim};
    border-top: none;
    color: ${({ theme }) => theme.color.color_7};
  }

  .mantine-Modal-header {
    background-color: ${({ theme }) => theme.color.color_2_5};
    padding: 16px;
    border: 2px solid ${({ theme }) => theme.accent.color_1_dim};
    border-bottom: none;
    color: ${({ theme }) => theme.color.color_7};
  }
`

const SModalMod = styled(SFlexCol)`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.color_2_5};
`

const SButtonContainer = styled(SFlexRow)`
  justify-content: space-between;
  padding-bottom: 1rem;
  width: 80%;
  margin: auto;
  gap: 5px;
`

const SButton = styled.button`
  flex: 1;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;

  &.confirm {
    background-color: ${({ theme }) => theme.accent.color_1_dim};
    color: ${({ theme }) => theme.color.color_8};
    border: 1px solid ${({ theme }) => theme.color.color_5};
    &:hover{
        background-color: ${({ theme }) => theme.accent.color_1};
        border: 1px solid ${({ theme }) => theme.color.color_8};
    }
  }

  &.cancel {
    background-color: ${({ theme }) => theme.color.color_2_5};
    color: ${({ theme }) => theme.color.color_8};
    border: 2px solid ${({ theme }) => theme.color.color_4};

    &:hover{
        background-color: ${({ theme }) => theme.color.color_1};
        border: 2px solid ${({ theme }) => theme.color.color_5};
    }
  }
`

const columns = [
  { label: "Name", key: "name", size: "lg" },
  { label: "Language", key: "language", size: "sm" },
  { label: "Last Updated", key: "updated_at", size: "md" },
]

const GithubReposList = ({ repos }: any) => {
  const [selectedRepo, setSelectedRepo] = React.useState<number>(0)
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = React.useState(false)
  const [loadingMessage, setLoadingMessage] = React.useState("Cloning Github Repo")

  const [repoName, setRepoName] = React.useState("")
  const theme = useTheme()

  const projectId = useSelector((state: any) => state.project.projectId)
  const userId = useSelector((state: any) => state.user.storeUserId)
    

  const handleSelectRepo = (repo: any) => {
    console.log("Selected repo:", repo.id)
    open()
    setSelectedRepo(repo.id)
  }

  const handleConfirm = () => {
    console.log("Cloning repo:", selectedRepo)
    setLoading(true)
    const repo = repos.find((repo: any) => repo.id === selectedRepo)
    const payload = PayloadCloneRepoProject({
        projectId,
        userId,
        cloneUrl: repo.clone_url,
        id: repo.id,
    })
    console.log("PayloadCloneRepoProject:", payload)

    // Call API to create Job
    ProjectApi.cloneRepoProject(payload)
    .then((response: any) => {
        setLoadingMessage("Cloning successful, finishing up")
        setTimeout(() => {
            console.log("Clone Response: ", response)
            setLoading(false)
            close()
            //nav()
        }
        , 2000)
    })
    .catch((error: any) => {})

  }

  useEffect(() => {
    const init = () => {
        if (selectedRepo !== 0 && repos.length > 0){
            const repo = repos.find((repo: any) => repo.id === selectedRepo)
            setRepoName(repo.full_name)
        }
    }

    return init()
  }, [repos, selectedRepo]);


  return (
    <SContainer>
      <SModalContainer opened={opened} onClose={close}>
        {
          !loading ? (
            <SModalMod>
            <DynamicHeading
              heading={"Are you sure you want to clone this repo?"}
              styles={"f-sm f-weight-200"}
            />
            <DynamicHeading
              heading={repoName}
              styles={"f-xs f-weight-500 p-2"}
            />

        <SButtonContainer>
          <SButton className={"cancel"} onClick={close}>
            Cancel
          </SButton>
          <SButton onClick={handleConfirm} className={"confirm"}>Clone</SButton>
        </SButtonContainer>
          </SModalMod>
          ) : (
            <><LoadingSpinner styles={"fit color_2_5"} message={loadingMessage}/></>
          )
        }

      </SModalContainer>

      <GithubReposDataTable
        columns={columns}
        data={repos}
        actionLabel={"Clone"}
        action={(repo: any) => console.log(repo)}
        handleClick={handleSelectRepo}
      />
    </SContainer>
  )
}

export default GithubReposList
