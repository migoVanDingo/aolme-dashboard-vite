import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons"

const SContainer = styled(SFlexRow)`
  align-items: center;
  gap: 3px;
  margin-left: 10px;
`

const SPara = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.7rem;
  font-weight: 600;
`

const SIcon = styled(FontAwesomeIcon)`
    height: 10px;
    width: 10px;
`

const BranchMetrics = ({ branchCount }: any) => {
    branchCount = 2
  return (
    <SContainer>
      <SIcon icon={faCodeBranch} />
      <SPara>{ branchCount && branchCount}</SPara>
      <SPara >{ branchCount === 1 ? "Branch" : "Branches"}</SPara>
    </SContainer>
  )
}

export default BranchMetrics
