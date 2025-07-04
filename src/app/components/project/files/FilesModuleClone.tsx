import React, { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { SFlexCol } from "../../common/containers/FlexContainers"
import styled from "styled-components"
import DynamicDescriptionCard from "../../common/cards/DynamicDescriptionCard"
import { useGithubUser } from "../../../hooks/useGithubUser"
import { useGithubDirectory } from "../../../hooks/useGithubDirectory"

import { SButton } from "../../common/styled"
import TextInput from "../../common/inputs/text/TextInput"
import TextInputComponent from "../../common/inputs/text/TextInputComponent"
import CreateButton from "../../common/buttons/CreateButton"
import GithubReposList from "./GithubReposList"
import HeaderOptions from "../../common/toolbar/HeaderOptions"
import { faClone, faCloudUpload } from "@fortawesome/free-solid-svg-icons"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"

const SContainer = styled(SFlexCol)`
  width: 100%;
  max-height: 800px;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  box-shadow: 2px 2px 8px ${({ theme }) => theme.color.shadow.dark};
  background-color: ${({ theme }) => theme.color.color_1};
  align-self: flex-start;
`
const STop = styled.div`
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  background-color: ${({ theme }) => theme.color.color_1};
  width: 100%;
  padding: 1rem 2rem;
`

const SBottom = styled(SFlexCol)`
  width: 100%;
  padding: 0;
  overflow-y: scroll;

`

const SCloneInputContainer = styled(SFlexCol)`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.color.color_2_5};
`

const FilesModuleClone = ({ token }: any) => {
  const { github_token } = useLoaderData() as { github_token: string }

  const { githubRepos } = useGithubUser()
  const { handleCloneRepo } = useGithubDirectory()
  const [githubUrl, setGithubUrl] = useState<string>("")



  const options = [
    {
      label: "Paste URL",
      callback: (option: any): void => handleSelectActiveOption(option),
      option: "CLONE",
      icon: faClone,
    },
    {
      label: "Select Repo",
      callback: (option: any): void => handleSelectActiveOption(option),
      option: "SELECT",
      icon: faCloudUpload,
    },
  ]

  const [activeOption, setActiveOption] = React.useState(options[0].option)

  const handleSelectActiveOption = (option: any) => {
    console.log("Selected option:", option)

    setActiveOption(option)
  }

  return (
    
    <SContainer>
         
      <STop>
        <DynamicDescriptionCard
          containerStyles={"b-none"}
          heading={"Clone from github"}
          headingStyles={"f-weight-200 f-md"}
          text={
            "Select one of your repositories from Github to clone. Or paste the URL of a public repository in the input field below."
          }
          textStyles={"f-weight-200 f-md"}
        />
      </STop>

      <HeaderOptions
        options={options}
        gridArea={""}
        activeOption={activeOption}
      />

      {activeOption === "CLONE" && (
        <SBottom>
          <SCloneInputContainer>
            <TextInputComponent
              inputValue={githubUrl}
              setInputValue={setGithubUrl}
              label={"Github Repository URL"}
              labelSize={"lg"}
              inputType={"text"}
              inputStyles={"dark"}
            />
            <CreateButton
              className={"push-right create-new"}
              handleClick={handleCloneRepo}
              innerHtml={"Clone"}
            />
          </SCloneInputContainer>
        </SBottom>
      )}

      {activeOption === "SELECT" && (
        <SBottom>
          <GithubReposList repos={githubRepos} />
        </SBottom>
      )}
    </SContainer>
  )
}

export default FilesModuleClone
