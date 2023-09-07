import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import { connect } from "react-redux"
import { FilesAPI } from "../../../../api/FileAPI"

const SRow = styled(SFlexRow)`
  align-items: center;
  width: 100%;
  height: 40px;

  background-color: ${({ theme }) => theme.color.color_1};
  border-bottom: 1px solid ${({ theme }) => theme.button.branch.border};
  font-size: 0.8rem;
  padding: 5px 15px;
  box-sizing: border-box;

  &.last {
    border-bottom: none;
  }

  &.first {
    border-top: 1px solid ${({ theme }) => theme.button.branch.border};
  }
`

const SContentLink = styled(SFlexRow)`
  width: 300px;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.accent.color_2};
  }
`

const SIcon = styled(FontAwesomeIcon)`
  margin: 0 10px 0 0;
`

const SLine = styled.p`
  margin: 0;
  padding: 0;
  width: 100%;

`

const SCommit = styled.p`
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  width: 90px;
  text-align: center;
  font-size: 0.8rem;
  margin: 0 0 0 40px;
  padding: 5px 12px;
  color: ${({ theme }) => theme.button.text.neutral};
  background-color: ${({ theme }) => theme.color.color_3};
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


const BranchContent = ({ projectId }: any) => {

  const [files, setFiles] = useState<any[]>([])
  const [stopSwitch, setStopSwitch] = useState<boolean>(false)

  useEffect(() => {
    const getProjectFiles = (projectId: number) => {
      console.log(projectId)
      if (projectId !== undefined && stopSwitch === false) {
        setStopSwitch(true)
        const response = FilesAPI.getProjectFiles(projectId)
          .then((res: any) => {
            console.log("files : ", res.data)
            setFiles(res.data)
            
          })
          .catch((err: any) => console.error(err))
      }
    }

    return getProjectFiles(parseInt(projectId))
  }, [])

  const handleContentClick = (e: any) => {
    console.log(e.target["data-name"])
  }

  return (
    <>
      {/* {folders &&
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
        })} */}
      {files &&
        files.map((file: any, index: number) => {
          return (
            <SRow
              key={index}
              className=''
            >
              <SContentLink onClick={handleContentClick}>
                <SIcon icon={faFile} />
                <SLine>{file.name + "." +file.extension}</SLine>
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

const mapStoreStateToProps = (state: any) => {
  return {
    ...state,
  }
}

export default connect(mapStoreStateToProps)(BranchContent)
