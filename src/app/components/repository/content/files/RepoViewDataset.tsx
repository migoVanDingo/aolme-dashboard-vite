import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import SubsetCard from "../../../dataset/subset/SubsetCard"

const SContainer = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`




const RepoViewDataset = ({ subsets, dataset, showSelectDatasetView }: any) => {
  return (
    <SContainer>
      {subsets.length > 0 &&
        subsets.map((subset: any) => {
          return (
            <SubsetCard
              key={subset.subset_id}
              subset={subset}
              dataset={dataset}
              inRepo={true}
              selectDatasetView={showSelectDatasetView}

            />
          )
        })}
    </SContainer>
  )
}

export default RepoViewDataset
