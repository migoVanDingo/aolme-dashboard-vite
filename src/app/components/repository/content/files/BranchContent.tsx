import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"
import { SFlexRow } from "../../../common/containers/FlexContainers"

const SRow = styled(SFlexRow)`
  align-items: center;
  width: 100%;

  background-color: ${({ theme }) => theme.color.color_1};
  border-bottom: 1px solid ${({ theme }) => theme.button.branch.border};
  font-size: 0.8rem;
  padding: 5px 15px;
  box-sizing: border-box;

  &.last{
    border-bottom: none;
  }

  &.first{
    border-top: 1px solid ${({ theme }) => theme.button.branch.border};
  }
`

const SContentLink = styled(SFlexRow)`
  width: 150px;
  
  cursor: pointer;

  &:hover{
    color: ${({ theme }) => theme.accent.color_2};
  }
`

const SIcon = styled(FontAwesomeIcon)`
  margin: 0 10px 0 0;
`

const SLine = styled.p`
  margin: 0;
  padding: 0;
`

const SCommit = styled.p`
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  width: 90px;
  text-align: center;
  font-size: 0.8rem;
  margin: 0 0 0 40px;
  padding: 5px 12px;
  color: ${({ theme }) => theme.button.text.neutral};
  background-color: ${({theme}) => theme.color.color_3};
`

const SCommitMsg = styled.p`
  font-size: 0.8rem;
  margin: 0 0 0 20px;
  padding: 5px 0;
`

const SLastUpdate = styled.p`
  font-size: 0.8rem;
  margin: 0;
  margin-left: auto;
  padding: 5px 0;
`

const files = [
  {
    filename: "file_1.js",
    extension: ".js",
    commit: "dk9385juem3",
    commit_message: "new commit",
    last_updated: "1 year ago",
  },
  {
    filename: "file_2.js",
    extension: ".js",
    commit: "dk9385juem3",
    commit_message: "new commit",
    last_updated: "1 year ago",
  },
  {
    filename: "file_3.js",
    extension: ".js",
    commit: "dk9385juem3",
    commit_message: "new commit",
    last_updated: "1 year ago",
  },
]

const folders = [
  {
    name: "folder_1",
    commit: "dk9385juem3",
    commit_message: "new commit",
    last_updated: "1 year ago",
  },
  {
    name: "folder_2",
    commit: "jky928ski4kks3",
    commit_message: "old commit",
    last_updated: "3 year ago",
  },
  {
    name: "folder_3",
    commit: "dk9385juem3",
    commit_message: "new commit",
    last_updated: "1 year ago",
  },
]

const BranchContent = () => {
  const handleContentClick = (e: any) => {
    console.log(e.target["data-name"])
  }

  return (
    <>
      {folders &&
        folders.map((folder: any, index: number) => {
          return (
            <SRow
              key={index}
              className={index === folders.length - 1 ? "last" : ""}
            >
              <SContentLink onClick={handleContentClick}>
                <SIcon data-name={folder.name} icon={faFolder} />
                <SLine data-name={folder.name}>{folder.name}</SLine>
              </SContentLink>

              <SCommit>{folder.commit}</SCommit>
              <SCommitMsg>{folder.commit_message}</SCommitMsg>
              <SLastUpdate>{folder.last_updated}</SLastUpdate>
            </SRow>
          )
        })}
      {files &&
        files.map((file: any, index: number) => {
          return (
            <SRow
              key={index}
              className={index === folders.length - 1 ? "last" : index === 0 ? "first" : ""}
            >
              <SContentLink onClick={handleContentClick}>
                <SIcon  icon={faFile} />
                <SLine >{file.filename}</SLine>
              </SContentLink>

              <SCommit>{file.commit}</SCommit>
              <SCommitMsg>{file.commit_message}</SCommitMsg>
              <SLastUpdate>{file.last_updated}</SLastUpdate>
            </SRow>
          )
        })}
    </>
  )
}

export default BranchContent
