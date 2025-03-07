import React from 'react'
import styled from 'styled-components'
import DynamicDescriptionCard from '../../common/cards/DynamicDescriptionCard'
import FilesModule from './FilesModuleEmptyState'
import ProjToolbar from './ProjToolbar'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FilesModuleEmptyState from './FilesModuleEmptyState'
import FilesModuleView from './FilesModuleView'
import FilesModuleUpload from './FilesModuleUpload'
import FilesModuleClone from './FilesModuleClone'

const SContainer = styled.div`
    width: 100%;
    min-height: calc(calc(100vh - ${({theme}) => theme.header.height}) - 125px);
    grid-area: files;
    padding: 2rem;


    display: grid;
    grid-template-columns: 2fr 4fr 2fr;
    grid-template-rows: 1fr;
    grid-template-areas:
    "description files toolbar";
    gap: 1.5rem;
` 

const heading = "Description"
const text = "Deserunt non ullamco cupidatat reprehenderit elit tempor. Culpa ad aliquip duis cupidatat pariatur dolor elit do irure. Sint irure aliquip qui amet irure sint enim pariatur elit exercitation nisi. Aliquip labore irure amet id exercitation tempor magna dolor. Magna nostrud anim eu et laborum commodo commodo. Esse enim velit elit mollit qui. Aliqua eiusmod elit pariatur sint."


const ProjFilesLayout = () => {

  const { projectFiles, github_token, loaderFilesModule } = useLoaderData() as { projectFiles: any[], github_token: string, loaderFilesModule: string }
  const [descriptionHeading, setDescriptionHeading] = React.useState<string>(heading)
  const [descriptionText, setDescriptionText] = React.useState<string>(text)
  const [filesModule, setFilesModule] = React.useState<any>(loaderFilesModule)

  const handleSetFilesModule = (module: string) => {
    setFilesModule(module)
  }


  return (
    <SContainer>
        <DynamicDescriptionCard gridArea={"description"} containerStyles={"p-1 b-weight-100 b-rad-md"} headingStyles={"f-weight-200 f-lg"} textStyles={"f-md f-weight-200"} heading={descriptionHeading} text={descriptionText}/>

        { filesModule === "EMPTY" && <FilesModuleEmptyState setFilesModule={handleSetFilesModule}/> }
        { filesModule === "VIEW" && <FilesModuleView/> }
        { filesModule === "UPLOAD" && <FilesModuleUpload/> }
        { filesModule === "CLONE" && <FilesModuleClone token={github_token}/> }
        <ProjToolbar gridArea={"toolbar"}/>
    </SContainer>
  )
}

export default ProjFilesLayout

export const loader = () => {

  const github_token = localStorage.getItem("github_token") || ""

  const projectFiles: any = []
  const loaderFilesModule = projectFiles.length === 0 ? "EMPTY" : "VIEW"

  console.log('loaderFilesModule:', loaderFilesModule)
  return {
    projectFiles: projectFiles,
    github_token,
    loaderFilesModule
  }
}