import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRowWrap } from "../../common/containers/FlexContainers"
import EmptySubsets from "./EmptySubsets"
import CreateSubset from "./CreateSubset"
import SubsetCard from "./SubsetCard"

const SContainer = styled(SFlexCol)`
  padding: 0;
`
const SAddSubset = styled(SFlexCol)``

const Subset = ({ subsets, dataset, isNewSubsetActive, createViewActive, createViewInactive, triggerRender }: any) => {
  const [isHoverNew, setHoverNew] = useState<boolean>(false)
  const hoverOn = () => setHoverNew(true)
  const hoverOff = () => setHoverNew(false)

  

  if (isNewSubsetActive) {
    return (
      <SContainer>
        <CreateSubset
          dataset={dataset}
          createViewInactive={createViewInactive}
          triggerRender={triggerRender}
        />
      </SContainer>
    )
  } else {
    return (
      <SContainer>
        {subsets.length > 0 ? (
          subsets.map((subset: any) => {
            return(
              <SubsetCard
                key={subset.subset_id}
                subset={subset}
                dataset={dataset}
              />
            )
          })
        ) : (
          <EmptySubsets
            hover={isHoverNew}
            hoverOn={hoverOn}
            hoverOff={hoverOff}
            handleCreateNew={createViewActive}
          />
        )}
      </SContainer>
    )
  }
}

export default Subset
