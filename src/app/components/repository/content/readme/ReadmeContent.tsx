import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'

const SContainer = styled(SFlexCol)`
    width: 100%;
    padding: 20px 0;
    margin-bottom: 0px;
    height: 100%;
    background-color: ${({ theme }) => theme.color.color_2_5};

  
`

const SRepoName = styled.p`
    width: 90%;
    font-size: 2rem;
    margin: 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.color_5};
    color: ${({ theme }) => theme.color.color_5};
    
`

const SDescription = styled.p`
    margin:0;
    padding: 20px 0 0 0;
    width: 90%;
    height: 100%;
    line-height: 25px;
    color: ${({ theme }) => theme.color.color_5};


`

const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus sem metus, et pretium neque commodo finibus. Suspendisse mollis odio quis eleifend gravida. Nunc fringilla metus vestibulum enim pellentesque euismod. Etiam non mi eu nisl scelerisque ullamcorper nec convallis purus. Nunc a nunc augue. Aliquam consectetur nisl sit amet lorem tincidunt, sed facilisis justo tristique. Mauris vitae luctus est. Phasellus ac hendrerit ligula, in dictum sapien. Cras convallis, orci id vehicula varius, dui magna venenatis metus, ac bibendum quam nulla in est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet urna sit amet ante sagittis luctus quis eu magna. Maecenas egestas dui ut urna faucibus fringilla."

const repoName = "Hello-World"

const ReadmeContent = () => {
  return (
    <SContainer>
        <SRepoName>{repoName}</SRepoName>
        <SDescription>{desc}</SDescription>
    </SContainer>
  )
}

export default ReadmeContent