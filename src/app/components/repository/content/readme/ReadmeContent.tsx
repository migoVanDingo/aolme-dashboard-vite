import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'
import { connect } from 'react-redux'

const SContainer = styled(SFlexCol)`
    width: 100%;
    padding: 20px 0;
    margin-bottom: 0px;
    height: 100%;
    background-color: ${({ theme }) => theme.color.color_0};

  
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

const ReadmeContent = (state: any) => {

  const { name, description } = state
  return (
    <SContainer>
        <SRepoName>{name && name}</SRepoName>
        <SDescription>{description}</SDescription>
    </SContainer>
  )
}

const mapStoreStateToProps = (state: any) => {
  return {
    ...state
  }
}

export default connect(mapStoreStateToProps)(ReadmeContent)