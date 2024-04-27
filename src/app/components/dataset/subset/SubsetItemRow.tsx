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
  font-size: 0.8rem;
  font-weight: 300;

  &.filename{
    &:hover {   
      cursor: pointer;
      color: ${({ theme }) => theme.accent.color_2};
    }
  }

`
const SButton = styled.button`
  font-size: 0.7rem;
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_6};
  font-weight: 200;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_2_5};
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
  }
`

const SubsetItemRow = ({ item, last = false, filePath }: any) => {

  const handleLaunchActivityMap = (path: string) => {
    console.log('activity map: ' + path)
  }

  return (
    <SUserRowChild className={last ? "subset-table-bottom" : ""}>
      <SFieldValue className={"filename"} onClick={() => handleLaunchActivityMap(filePath)} >{item.name}</SFieldValue>
      <SFieldValue>{item.subset_item_id}</SFieldValue>

    </SUserRowChild>
  )
}

export default SubsetItemRow
