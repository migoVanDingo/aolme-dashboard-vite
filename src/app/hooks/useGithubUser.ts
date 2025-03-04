import { useEffect, useState } from "react"
import { UserAPI } from "../api/UserAPI"

export const useGithubUser = () => {

    const [githubRepos, setGithubRepos] = useState([])

    useEffect(() => {
        const init = () => {
            fetchGithubRepos()
        }
        return init()
    }, []);


    const fetchGithubRepos = async () => {
        UserAPI.getGithubUserRepos()
        .then((response) => {
            console.log("useGithubUser.tsx --- REPOS: ", response)
            setGithubRepos(response)
        })
        .catch((error) => console.error("useGithubUser.tsx --- fetchGithubRepos(): ", error))
        
    }

    return {
        githubRepos
    }
}