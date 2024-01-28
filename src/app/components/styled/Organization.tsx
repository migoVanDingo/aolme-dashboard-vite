import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../common/containers/FlexContainers"

export const SUserRow = styled(SFlexRow)`
  width: 100%;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
  gap: 25px;
  background-color: ${({ theme }) => theme.color.color_2};

  &.th {
    background-color: ${({ theme }) => theme.color.color_2_5};
    border-top: 1px solid ${({ theme }) => theme.color.color_2};
    font-weight: 500;
  }
`

export const SUserCol = styled(SFlexCol)`
  width: 200px;
  align-items: baseline;
`

export const SContent = styled.div`
  height: 100%;
  width: 100%;
  grid-area: content;
  background-color: ${({ theme }) => theme.color.color_3};
`