import React from 'react'
import styled from 'styled-components'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.color.color_5};
    border-radius: ${({ theme }) => theme.container.borderRadius.md};
    grid-area: project-info;
    padding: 1rem;
    box-sizing: border-box;

    

`


const ProjectInfoModule = ({ project }: any) => {
  return (
    <SContainer>
        <Heading heading={"Description"} size={"md"}/>
        <Paragraph text={project.projectDescription}  />
    </SContainer>
  )
}

export default ProjectInfoModule