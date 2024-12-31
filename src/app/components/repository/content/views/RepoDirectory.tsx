import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useGithubDirectory } from '../../../../hooks/useGithubDirectory'
import { SFlexCol, SFlexRow } from '../../../common/containers/FlexContainers'
import TextInput from '../../../common/inputs/text/TextInput'
import LoadingSpinner from '../../../common/loading/LoadingSpinner'
import { SButton } from '../../../common/styled'

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
   const userId = useSelector((state: any) => state.user.storeUserId)
  const repoId = useSelector((state: any) => state.repo.storeRepoId)
  const repoContent = useSelector((state: any) => state.repo.storeRepoContent)
  const [githubUrl, setGithubUrl] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)
  

  const { handleCloneRepo } = useGithubDirectory()


  if(isLoading){
    return (
      <SContainer>
        <LoadingSpinner  message={"Loading Repo Content"}/>
      </SContainer>
    )
  } else {

    //If a github repo is cloned, the repoContent will be populated; else there will be a text input to add repo link to clone
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