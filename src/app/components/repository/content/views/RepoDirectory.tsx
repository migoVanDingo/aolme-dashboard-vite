import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../../../common/containers/FlexContainers'
import { SButton } from '../../../common/styled'
import { useSelector } from 'react-redux'
import { RepoAPI } from '../../../../api/RepoAPI'
import TextInput from '../../../common/inputs/text/TextInput'
import LoadingSpinner from '../../../common/loading/LoadingSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'

const SContainer = styled(SFlexCol)`
   
    width: 100%;
    height: 400px;
    background-color: ${({theme}) => theme.color.color_2_5};
    padding: 10px;
    box-sizing: border-box;
    
    &.empty-repo {
      padding-top: 100px;
    }

    &.not-empty {
      padding: 0;
    }

`

const SIcon = styled(FontAwesomeIcon)`
  margin: 0 10px 0 0;
  color: ${({ theme }) => theme.color.color_8};
`
const SItemRow = styled(SFlexRow)`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_5};
  font-size: 0.8rem;
  padding: 5px 15px;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;

`

const RepoDirectory = () => {
  const userId = useSelector((state: any) => state.userId)
  const repoId = useSelector((state: any) => state.repoId)
  const [githubUrl, setGithubUrl] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)

  const [repoContent, setRepoContent] = useState<any>({})

  useEffect(() => {

    const init = () => {
      getRepoConent(repoId)
    }

    return init()
  }, [repoId]);

  const getRepoConent = (repoId: string) => {
    setLoading(true)
    RepoAPI.getDirectoryContents(repoId)
    .then((res: any) => {
      console.log("Repo Content: ", res.data)
      setRepoContent(res.data)

      setLoading(false)
    })
    .catch((err: any) => console)
  }
  

  const handleCloneRepo = () => {
    console.log("Cloning Repo")
    const payload = {
      user_id: userId,
      entity_id: userId,
      github_url: githubUrl,
      repo_id: repoId
    }
    console.log("Cloning Repo")

    setLoading(true)
    RepoAPI.cloneGithubRepo(payload)
    .then((res: any) => {
      console.log("Clone Response: ", res)
      setLoading(false)
    })
    .catch((err: any) => console.error(err))
  }

  if(isLoading){
    return (
      <SContainer>
        <LoadingSpinner  message={"Loading Repo Content"}/>
      </SContainer>
    )
  } else {

    if(repoContent && repoContent["contents"] && repoContent["contents"].length > 0){
      return (
        <SContainer className={"not-empty"}>
          {repoContent["contents"].map((item: any, index: number) => {
             if(item["is_dir"]){
              return (
                <SItemRow key={index}>
                  <SIcon icon={faFolder} />
                  {item["item"]}
                </SItemRow>
              )
             }
            
          })}
          {repoContent["contents"].map((item: any, index: number) => {
            if(!item["is_dir"]){
            return (
              <SItemRow key={index}>
                <SIcon icon={faFile} />
                {item["item"]}
              </SItemRow>
            )}
          })}
        </SContainer>
        )
      } else {
      return (
        <SContainer className={"empty-repo"}>
           <TextInput
            setName={setGithubUrl}
            name={githubUrl}
            label={"Clone Github Repository URL"}
            size={"lg"}
          />
          <SButton handleClick={handleCloneRepo} innerHtml={"Clone"} />
        
        </SContainer>
      )
    } 
    
  }
  
}

export default RepoDirectory