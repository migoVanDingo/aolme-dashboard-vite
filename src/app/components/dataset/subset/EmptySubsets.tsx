import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRowWrap } from "../../common/containers/FlexContainers"
const SSubsetCard = styled(SFlexCol)`
  align-items: flex-start;
  height: 180px;
  width: 100%;
  border: 4px dotted ${({ theme }) => theme.color.color_3};
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};
  overflow: hidden;

  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  &.hover {
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`

const SCardTop = styled(SFlexCol)`
  width: 100%;
  height: 1fr;
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 2px dotted ${({ theme }) => theme.color.color_3};
  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
  }
`

const SCardBottom = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;
`
const SName = styled.p`
  color: #2c91b2;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;

  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
  }
`

const SLastUpdated = styled.p`
  padding: 0;
  margin: 5px 0 0 0;
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_5};
`

const SDescription = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.95rem;
  line-height: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.color_8};

  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
  }
`

const STagContainer = styled(SFlexRowWrap)`
  padding: 10px;
  gap: 5px;
`
const STag = styled(SFlexCol)`
  width: 40px;
  height: 20px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.color_3};
  font-size: 0.7rem;
  font-weight: 100;
  justify-content: center;
`
const EmptySubsets = ({ hover, hoverOn, hoverOff, handleCreateNew }: any) => {
  return (
    <SSubsetCard
      className={hover ? "hover" : ""}
      onClick={handleCreateNew}
      onMouseOver={hoverOn}
      onMouseLeave={hoverOff}
    >
      <SCardTop className={hover ? "hover" : ""}>Add New Subset</SCardTop>
      <SCardBottom>
        <SDescription className={hover ? "hover" : ""}>
          This dataset is empty. Add ground truth files and existing annotations
          together as sets. Uploading the files together is important as it
          initializes the labeler.
        </SDescription>
      </SCardBottom>
    </SSubsetCard>
  )
}

export default EmptySubsets
