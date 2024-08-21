import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'
import SelectInput from '../../../common/inputs/select/SelectInput'
import { useRouteLoaderData } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGithubDirectory } from '../../../../hooks/useGithubDirectory'
import CustomSelect from '../../../common/inputs/select/CustomSelect'
import AddStage from '../pipeline/AddStage'

const SContainer = styled(SFlexCol)`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.color.color_2_5};
    align-items: flex-start;
    padding: 25px;
`

const SPipelineHeading = styled.h3`

    font-size: 1.2rem;
    font-weight: 200;
    color: ${({ theme }) => theme.color.color_6};
    margin: 0;
    padding: 0px;
    border-bottom: 1px solid ${({ theme }) => theme.color.color_2_5};

`

const RepoPipeline = () => {
  const repoContent = useSelector((state: any) => state.repo.storeRepoContent)
  const { getStagesList } = useGithubDirectory()
  const [stages, setStages] = useState<any>([])
  const [stageOptions, setStageOptions] = useState<any>([])

  useEffect(() => {
    const init = () => {
      if(repoContent !== null) {
        getStages()
      }
    }

    return init()
  }, [repoContent]);

  const getStages = async () => {
    const stages = await getStagesList(repoContent.path)
    setStageOptions(stages)
  }

  


  return (
    <SContainer>
        <SPipelineHeading>Pipeline Stages</SPipelineHeading>
        <AddStage stageOptions={stageOptions}/>
        

    </SContainer>
  )
}

export default RepoPipeline