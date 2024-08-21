import { useState } from "react"
import { RepoAPI } from "../api/RepoAPI"

export const useGithubDirectory = () => {

    
    const [githubUrl, setGithubUrl] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)


    const handleCloneRepo = async (repoId: string, userId: string, githubUrl: string) => {
        console.log("Cloning Repo")
        const payload = {
          user_id: userId,
          entity_id: userId,
          github_url: githubUrl,
          repo_id: repoId
        }
        console.log("Cloning Repo")
    
        const response = await RepoAPI.cloneGithubRepo(payload)

        return response
        
      }

      const getStagesList = async (path: string) => {

        const stages = await RepoAPI.getRepoStages(path)
    

        return stages
      }

      return {
        handleCloneRepo,
        getStagesList,
        githubUrl
      }
}