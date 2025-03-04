import React from 'react'
import { SFlexCol } from '../../common/containers/FlexContainers'
import styled from 'styled-components'
import DataTable from '../../common/DataTable'
import GithubReposDataTable from './GithubReposDataTable'

const SContainer = styled(SFlexCol)`    
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.color.color_1};
    padding: 0;
    border-bottom-left-radius: ${({theme}) => theme.container.borderRadius.md};
    border-bottom-right-radius: ${({theme}) => theme.container.borderRadius.md};
`

const columns = [{label: "Name", key: "name", size:"lg"},{label: "Language", key: "language", size: "sm"},{label: "Last Updated", key: "updated_at", size: "md"}]


const GithubReposList = ({ repos }: any) => {


    const [selectedRepo, setSelectedRepo] = React.useState<number>(0)

    const handleSelectRepo = (repo: any) => {
        console.log('Selected repo:', repo.id)
        setSelectedRepo(repo.id)
    }

  return (
    <SContainer>
        <GithubReposDataTable
            columns={columns}
            data={repos}
            actionLabel={"Clone"}
            action={(repo: any) => console.log(repo)}
            handleClick={handleSelectRepo}
        />
    </SContainer>
  )
}

export default GithubReposList