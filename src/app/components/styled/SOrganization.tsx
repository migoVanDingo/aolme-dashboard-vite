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
    border-bottom: 1px solid ${({ theme }) => theme.color.color_1};
  }

  &.subset-table-header {
    border-top-left-radius:${({ theme }) => theme.container.borderRadius.sm};
    border-top-right-radius:${({ theme }) => theme.container.borderRadius.sm};
  }

  &.subset-table-bottom {
    border-bottom-left-radius:${({ theme }) => theme.container.borderRadius.sm};
    border-bottom-right-radius:${({ theme }) => theme.container.borderRadius.sm};
  }


`

export const SUserCol = styled(SFlexCol)`
  width: 200px;
  align-items: baseline;
  padding: 0 10px;
  font-size: 0.9rem;
  &.long{
    width: 300px;
  }
`

export const SContent = styled.div`
  height: 100%;
  width: 100%;
  grid-area: content;
  background-color: ${({ theme }) => theme.color.color_2};
`