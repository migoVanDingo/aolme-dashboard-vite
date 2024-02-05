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

  background-color: ${({ theme }) => theme.color.color_0};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_5};
  font-size: 0.8rem;
  padding: 5px 15px;
  box-sizing: border-box;

  &.last {
    border-bottom: none;
  }

  &.first {
    border-top: 1px solid ${({ theme }) => theme.color.color_5};
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
  color: ${({ theme }) => theme.color.color_8};
`

const SLine = styled.p`
  margin: 0;
  padding: 0;
  width: 100%;
  color: ${({ theme }) => theme.color.color_8};
  &:hover {
    color: ${({ theme }) => theme.accent.color_2};
  }
`

const SCommit = styled.p`
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  width: 90px;
  text-align: center;
  font-size: 0.8rem;
  margin: 0 0 0 40px;
  padding: 5px 12px;
  color: ${({ theme }) => theme.color.color_5};
  background-color: ${({ theme }) => theme.color.color_1};
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

const SEmptyRepo = styled(SFlexRow)`
  padding: 60px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.color_3};
`


const BranchContent = ({
  folderPath,
  setFolderPath,
  trigger,
  projectId,
  stopSwitchFolders,
  setStopSwitchFolders,
  folderItemsSwitch, 
  setFolderItemsSwitch
}: any) => {
  const [files, setFiles] = useState<any[]>([])
  const [folders, setFolders] = useState<any[]>([])
  const [stopSwitchFiles, setStopSwitchFiles] = useState<boolean>(false)

  

  let fp = []
  /* useEffect(() => {
    const getProjectFiles = (projectId: number) => {
      if (projectId !== undefined && stopSwitchFiles === false) {
        setStopSwitchFiles(true)

        const response = FilesAPI.getProjectFiles(projectId)
          .then((res: any) => {
            setFiles(res.data)
          })
          .catch((err: any) => console.error(err))
      }
    }

    const getProjectFolders = () => {
      if (projectId !== undefined && stopSwitchFolders === false) {
        setStopSwitchFolders(true)

        const response = FilesAPI.getProjectFolders(projectId)
          .then((res: any) => {
            console.log("resdata: ", res.data)
            const folderList = res.data.map((folder: any) => folder.name)
            const f = folderList.sort()
            setFolders(f)
          })
          .catch((err: any) => console.error(err))
      }
    }

    return () => {
      setFolderPath([])

      setFiles([])

      getProjectFolders()
      
    }
  }, [projectId, trigger]) */

  /* useEffect(() => {
    if (folderItemsSwitch === true) {
      console.log("folderPath: ", folderPath)
      FilesAPI.getFolderItems(projectId, folderPath)
        .then((result: any) => {
          const files = result.data.filter((item: any) => item.type === "file")
          let folders = result.data.filter(
            (item: any) => item.type === "folder",
          )

          folders = folders.map((folder: any) => folder.name)



          console.log("files: ", files)
          console.log("folders: ", folders)
          setFolderItemsSwitch(false)
          setFiles(files)
          setFolders(folders)
        })
        .catch((err: any) =>
          console.error("BranchContent -- handleSelectFolder(): ", err),
        )
    }
  }, [folderPath, folderItemsSwitch]) */

  const handleContentClicks = () => {}

  const handleSelectFolder = (e: any) => {
    console.log("dname: ", e.target.id)
    const fp = folderPath ? [...folderPath, e.target.id] : [e.target.id]
    console.log("fp: ", fp)
    setFolderItemsSwitch(true)
    setFolderPath(fp)
  }

  return (
    <>
    {
      folders.length === 0 && files.length === 0 && (<SEmptyRepo>Empty Repo. Upload files or create modules to get started.</SEmptyRepo>)
    }
      {folders &&
        folders.map((folder: any, index: number) => {
          console.log('folder'+ index+ ": ", folder)
          return (
            <SRow
              key={index}
              className={index === folders.length - 1 ? "last" : ""}
            >
              <SContentLink onClick={handleSelectFolder}>
                <SIcon id={folder} icon={faFolder} />
                <SLine id={folder}>{folder}</SLine>
              </SContentLink>

              {folder.commit && <SCommit>{folder.commit}</SCommit>}
              {folder.commit_message && (
                <SCommitMsg>{folder.commit_message}</SCommitMsg>
              )}
              {folder.last_updated && (
                <SLastUpdate>{folder.last_updated}</SLastUpdate>
              )}
            </SRow>
          )
        })}
      {files &&
        files.map((file: any, index: number) => {
          return (
            <SRow
              key={index}
              className={index === files.length - 1 && index === 0 ? "first last" : index === files.length - 1 ? "last" : index === 0 ? "first" : ""}
            >
              <SContentLink onClick={() => {}}>
                <SIcon icon={faFile} />
                <SLine>{file.name}</SLine>
              </SContentLink>

              {file.commit && <SCommit>{file.commit}</SCommit>}
              {file.commit_message && (
                <SCommitMsg>{file.commit_message}</SCommitMsg>
              )}
              {file.last_updated && (
                <SLastUpdate>{file.last_updated}</SLastUpdate>
              )}
            </SRow>
          )
        })}
    </>
  )
}

const mapStoreStateToProps = (state: any) => {
  return {
    projectId: state.projectId,
  }
}

export default connect(mapStoreStateToProps)(BranchContent)
