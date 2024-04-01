import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRowWrap } from "../../common/containers/FlexContainers"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setRepoId } from "../../../actions"

const SContainer = styled(SFlexCol)`
  align-items: flex-start;
  width: 100%;
  min-height: 160px;
  border: 1px solid ${({ theme }) => theme.color.color_3};
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};
  overflow: hidden;
  box-shadow: 2px 2px 10px ${({ theme }) => theme.color.shadow.dark};
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  
  

`

const SCardTop = styled(SFlexCol)`
  background-color: ${({ theme }) => theme.color.color_0};
  width: 100%;
  height: 1fr;
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;
`
const SCardBottom = styled(SFlexCol)`
  background-color: ${({ theme }) => theme.color.color_2_5};
  width: 100%;
  height: 4fr;
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;

  
`

const SRepoName = styled.p`
  color: #2c91b2;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;

  &:hover{
    color: #00bfff;
    cursor: pointer;
  }

`

const SLastUpdated = styled.p`
  padding: 0;
  margin: 0;
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

const RepoCard = ({ repo }: any) => {
  //const { id, name, description } = data
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSelectRepo = () => {

    dispatch(setRepoId(repo.repo_id))
    navigate(`/repository/${repo.repo_id}`)

  }

  return (
    <SContainer>
      <SCardTop>
        <SRepoName onClick={handleSelectRepo}>{repo.name}</SRepoName>
        <SLastUpdated>{"2 months ago"}</SLastUpdated>
      </SCardTop>
      <SCardBottom>

        <SDescription>{repo.description}</SDescription>
        <STagContainer>
     
          {/* {tags &&
            tags.map((tag: any, index: number) => {
              return <STag key={index}>{tag}</STag>
            })} */}
        </STagContainer>
      </SCardBottom>
    </SContainer>
  )
}

export default RepoCard
