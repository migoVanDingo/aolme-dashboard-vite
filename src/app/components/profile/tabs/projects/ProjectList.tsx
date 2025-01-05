import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import Card2 from "../../../common/cards/Card2"
import ProjectApi from "../../../../api/ProjectAPI"
import { useLoaderData, useOutletContext } from "react-router-dom"

const SContainer = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  gap: 20px;
  margin: 0;
  padding: 20px 0 0;
  position: relative;
  grid-area: content;
  overflow-y: auto;

  box-sizing: border-box;

  align-items: baseline;
`

const SEmptyHeading = styled.h1`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.color_5};
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  margin: 0;
`

const ProjectList = ({}: any) => {
  const { loaderProjectList } = useLoaderData() as {
    loaderProjectList: any[]
  }

  const [projectList, setProjectList] = React.useState<any[]>(loaderProjectList)
  return (
    <SContainer>
      {projectList && projectList.length > 0 ? (
        projectList.map((project: any, index: number) => {
          return <Card2 key={index} project={project} />
        })
      ) : (
        <SEmptyHeading>
          You have no projects. Click Create New to get started.
        </SEmptyHeading>
      )}
    </SContainer>
  )
}

export default ProjectList

export const loader = async () => {
  const userId = localStorage.getItem("userId") as string
  // Use ProjectAPI to get projects by user
  const projectList = await ProjectApi.getProjectList({ entity_id: userId })

  console.log('projectList', projectList)
  return {
    loaderProjectList: projectList,
  }
}
