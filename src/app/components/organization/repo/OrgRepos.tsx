import { useEffect, useState } from "react"
import { useRouteLoaderData } from "react-router-dom"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import RepoCard from "../../profile/repo/RepoCard"
import DashboardHeader from "../dataset/header/DashboardHeader"
import AddRepo from "./AddRepo"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: calc(100vh - 100px);
  gap: 10px;
  grid-area: content;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_2};
  overflow: hidden;
  overflow-y: scroll;
  padding: 30px 350px 30px 50px;
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

  const { loaderOrgRepos } = useRouteLoaderData("org") as any

  const [repos, setRepos] = useState<any>(loaderOrgRepos)
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

  const showCreateNew = () => {
    hideHover()
    setCreateNew(true)}
  const hideCreateNew = () => setCreateNew(false)

  const showEdit = () => setEdit(true)
  const hideEdit = () => setEdit(false)

  return (
    <SContainer>
      {createNew === true ? (
        <AddRepo trigger={trigger} hideCreateNew={hideCreateNew} />
      ) : (
        <>
          <DashboardHeader
            handleCreateNew={showCreateNew}
            hover={hover}
            mouseOver={showHover}
            mouseOut={hideHover}
            heading={"Repository Dashboard"}
            type={"Repository"}
          />
          {repos.length > 0 &&
            repos.map((repo: any, index: number) => {
              return <RepoCard key={repo.repo_id} repo={repo} />
            })}
        </>
      )}

      {createNew === false && (
        <SCreateNew
          className={"lg"}
          onMouseOver={showHover}
          onMouseOut={hideHover}
          onClick={showCreateNew}
        >
          <SDashedBox className={hover ? "hover" : ""}>
            + Create Org Repository
          </SDashedBox>{" "}
        </SCreateNew>
      )}
    </SContainer>
  )
}

export default OrgRepos
