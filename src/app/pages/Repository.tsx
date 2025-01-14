import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import RepoContent from "../components/repository/content/RepoContent"
import RepoReadMe from "../components/repository/content/readme/RepoReadMe"
import { RepoHeader } from "../components/repository/header/RepoHeader"
import { useRepo } from "../hooks/useRepo"
import { RepoAPI } from "../api/RepoAPI"
import { DatasetAPI } from "../deprecated/DatasetAPI__OLD"

const SContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_8};
  padding-bottom: 100px;
`

const Repository = ({}: any) => {
  const { loaderRepo, loaderUsername, loaderUserId, loaderRepoContent, loaderDataset } =
    useLoaderData() as {
      loaderRepo: any
      loaderUsername: string
      loaderUserId: string
      loaderRepoContent: any
      loaderDataset: any
    }

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { repoName, repoEntityName } = useRepo(
    JSON.parse(loaderRepo),
    loaderRepoContent,
    loaderDataset
  )

  return (
    <SContainer>
      {repoEntityName && loaderUsername && (
        <>
          <RepoHeader
            owner={loaderUsername}
            projectName={repoName}
            entityName={repoEntityName}
          />
          <RepoContent />
        </>
      )}

      <RepoReadMe />
    </SContainer>
  )
}

export default Repository

export const loader = async () => {
  const loaderRepo = localStorage.getItem("currentRepo") as string
  const loaderUsername = localStorage.getItem("username") as string
  const loaderUserId = localStorage.getItem("userId") as string

  const getRepoDataset = async () => {
    const repoItems = await RepoAPI.getRepoItems(JSON.parse(loaderRepo).repo_id)
    console.log('repoItems', repoItems)
    if(repoItems && repoItems.length > 0){
      const datasetId = repoItems.find(
        (item: any) => item.type === "DATASET",
      ).file_id
  
      return await DatasetAPI.getDatasetById(datasetId)
    } else {
      return {}
    }
    
  }

  const loaderDataset = await getRepoDataset()

  const loaderRepoContent = await RepoAPI.getDirectoryContents(
    JSON.parse(loaderRepo).repo_id,
  )

  return {
    loaderRepo,
    loaderUsername,
    loaderUserId,
    loaderRepoContent,
    loaderDataset
  }
}
