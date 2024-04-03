import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
import { SUserCol, SUserRow } from "../../styled/SOrganization"
import { SFlexRow } from "../../common/containers/FlexContainers"

const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.color_6};
  font-size: 1.1rem;
  &:hover {
    color: #33adff;
    cursor: pointer;
  }

  &:active {
    color: #00ffbb;
  }
`

const SUserRowChild = styled(SUserRow)`
  width: 100%;
  background: rgb(24, 24, 24);
  background: linear-gradient(
    0deg,
    rgba(24, 24, 24, 1) 0%,
    rgba(32, 32, 32, 1) 100%
  );

  &.new-guy {
    background-color: ${({ theme }) => theme.color.color_2};
    padding: 4px;
    border: 2px solid red;
  }
`

const SFieldValue = styled(SFlexRow)`
    width: 300px;
    padding: 10px;
    box-sizing: border-box;

    transition: all 0.3s ease;
    color: ${({ theme }) => theme.color.color_5};
    font-size: 0.9rem;
    font-weight: 300;
    `


const SubsetItemRow = ({ item }: any) => {
  return (
    <SUserRowChild>
        
      <SFieldValue>{item.name}</SFieldValue> 
      <SFieldValue>{item.subset_item_id}</SFieldValue> 

    </SUserRowChild>
  )
}

export default SubsetItemRow
