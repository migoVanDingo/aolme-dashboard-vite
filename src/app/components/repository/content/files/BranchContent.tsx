import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import RepoSelectDataset from "./RepoSelectDataset"
import ViewDataset from "../../../dataset/ViewDataset"
import Subset from "../../../dataset/subset/Subset"
import { DatasetAPI } from "../../../../api/DatasetAPI"
import SubsetCard from "../../../dataset/subset/SubsetCard"

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
  padding: 10px 60px 60px;
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
  setFolderItemsSwitch,
  files,
  handleTriggerRender,
  show,
  menuOption,
}: any) => {
  const [folders, setFolders] = useState<any[]>([])
  const [stopSwitchFiles, setStopSwitchFiles] = useState<boolean>(false)
  const [selectedDataset, setSelectedDataset] = useState<any>(null)
  const [subsets, setSubsets] = useState<any[]>([])

  const { repoEntity } = useSelector((state: any) => state)

  useEffect(() => {
    if(selectedDataset) {
      getSubsets(selectedDataset)
    }
  }, [selectedDataset]);

  const getSubsets = (dataset: any) => {
    DatasetAPI.getSubsetListByDatasetId(dataset.dataset_id)
    .then((response) => {
      console.log("subsets: ", response)
      setSubsets(response.data)
    })
    .catch((error) => console.error("BranchContent::getSubsets()::error: ", error))
  }

  let fp = []
  const handleSelectFolder = (e: any) => {
    console.log("dname: ", e.target.id)
    const fp = folderPath ? [...folderPath, e.target.id] : [e.target.id]
    console.log("fp: ", fp)
    setFolderItemsSwitch(true)
    setFolderPath(fp)
  }

  return (
    <>
      {folders.length === 0 &&
      files.length === 0 &&
      !show &&
      menuOption !== "DATASET" ? (
        <SEmptyRepo>
          Empty Repo. Upload files or create modules to get started.
        </SEmptyRepo>
      ) : repoEntity && selectedDataset === null ? (
        <RepoSelectDataset repoEntity={repoEntity} selectedDataset={selectedDataset} setSelectedDataset={setSelectedDataset}/>
      ) : subsets.length > 0 ? (
          subsets.map((subset: any) => {
            return (
              <SubsetCard
                key={subset.subset_id}
                subset={subset}
                dataset={selectedDataset}
              />
            )
          })
      ) : <></>
    }

      {files &&
        files.map((file: any, index: number) => {
          return (
            <SRow
              key={index}
              className={
                index === files.length - 1 && index === 0
                  ? "first last"
                  : index === files.length - 1
                  ? "last"
                  : index === 0
                  ? "first"
                  : ""
              }
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

export default BranchContent
