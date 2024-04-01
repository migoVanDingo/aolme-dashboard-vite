import React, { useEffect, useState } from "react"
import { SContent, SUserCol, SUserRow } from "../../styled/SOrganization"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import styled from "styled-components"
import ListCard from "../../common/cards/ListCard"
import AddRepo from "./AddRepo"
import RepoCard from "../../profile/repo/RepoCard"

const SContainer = styled(SFlexCol)`
  width: 100%;
  height: calc(calc(100% - 50px) - - ${({ theme }) => theme.header.height});
  gap: 10px;
  grid-area: content;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_2};
  overflow: hidden;
  overflow-y: scroll;
  padding: 30px 50px;
`

const SCreateNew = styled(SFlexRow)`
  width: 100%;

  color: ${({ theme }) => theme.color.color_6};

  font-weight: 200;

  align-items: center;
  box-sizing: border-box;

  &.sm {
    height: 35px;
    font-size: 0.8rem;
    padding: 10px;
  }

  &.lg {
    height: 100px;
    font-size: 1.3rem;
    padding: 20px;
  }
`

const SDashedBox = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  min-height: 70px;
  border: 2px dashed ${({ theme }) => theme.color.color_6};
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};

  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`

const OrgRepos = ({ repoList, trigger, edit, setEdit }: any) => {
  const [repos, setRepos] = useState<any>([])
  const [hover, setHover] = useState<boolean>(false)

  const [createNew, setCreateNew] = useState<boolean>(false)

  useEffect(() => {
    const init = () => {
      if (repoList && repoList.length > 0) {
        setRepos(repoList)
      }
    }
    return init()
  }, [repoList])

  const showHover = () => setHover(true)
  const hideHover = () => setHover(false)

  const showCreateNew = () => setCreateNew(true)
  const hideCreateNew = () => setCreateNew(false)

  const showEdit = () => setEdit(true)
  const hideEdit = () => setEdit(false)

  return (
    <SContainer>
      {createNew === true ? (
        <AddRepo trigger={trigger} hideCreateNew={hideCreateNew} />
      ) : (
        repos.length > 0 &&
        repos.map((repo: any, index: number) => {
          return <RepoCard key={repo.repo_id} repo={repo} />
        })
      )}

      {
        createNew === false && (<SCreateNew
          className={"lg"}
          onMouseOver={showHover}
          onMouseOut={hideHover}
          onClick={showCreateNew}
        >
          <SDashedBox className={hover ? "hover" : ""}>
            + Create Org Repository
          </SDashedBox>{" "}
        </SCreateNew>)
      }

      
    </SContainer>
  )
}

export default OrgRepos
