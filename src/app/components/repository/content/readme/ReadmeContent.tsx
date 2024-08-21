import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'
import { connect, useSelector } from 'react-redux'

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

const desc = "Add README documentation"

const repoName = "Hello-World"

const ReadmeContent = () => {

  const repoName = useSelector((state: any) => state.repo.storeRepoName)
  const repoDescription = useSelector((state: any) => state.repo.storeRepoDescription)

  useEffect(() => {
    console.log('repoName', repoName)
    console.log("repoDescription", repoDescription)
  }, [repoName, repoDescription]);

  return (
    <SContainer>
        <SRepoName>{repoName && repoName}</SRepoName>
        <SDescription>{repoDescription}</SDescription>
    </SContainer>
  )
}


export default ReadmeContent