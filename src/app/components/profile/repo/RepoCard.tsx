import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRowWrap } from "../../common/containers/FlexContainers"

const SContainer = styled(SFlexCol)`
  align-items: flex-start;
  height: 150px;
  width: 340px;
  border: 1px solid ${({ theme }) => theme.color.color_4};
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};
  overflow: hidden;
  box-shadow: 2px 2px 6px ${({ theme }) => theme.color.color_4};
`

const SCardTop = styled(SFlexCol)`
  background-color: ${({ theme }) => theme.color.color_3};
  width: 100%;
  height: 100%;
  align-items: baseline;
  padding: 20px;
`
const SCardBottom = styled(SFlexCol)`
  background-color: ${({ theme }) => theme.color.color_2};
  width: 100%;
  height: 100%;
  align-items: baseline;
  padding: 20px;
`

const SRepoName = styled.p`
  color: #35beec;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`

const SLastUpdated = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 200;
`

const SDescription = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 200;
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
  background-color: ${({ theme }) => theme.color.color_4};
  font-size: 0.7rem;
  font-weight: 100;
  justify-content: center;

`

const RepoCard = ({ data }: any) => {
  const { name, lastUpdated, description, tags } = data

  return (
    <SContainer>
      <SCardTop>
        <SRepoName>{name}</SRepoName>
        <SLastUpdated>{lastUpdated}</SLastUpdated>
      </SCardTop>
      <SCardBottom>

        <SDescription>{description}</SDescription>
        <STagContainer>
     
          {tags &&
            tags.map((tag: any) => {
              return <STag>{tag}</STag>
            })}
        </STagContainer>
      </SCardBottom>
    </SContainer>
  )
}

export default RepoCard
