import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import SubsetCard from "../../../dataset/subset/SubsetCard"
import UploadDatasetFilesRepo from "../../upload/UploadDatasetFilesRepo"
import LoadingSpinner from "../../../common/loading/LoadingSpinner"
import { LabelStudioAPI } from "../../../../api/labeler/LabelStudioAPI"
import Dataset from "../../../../pages/Dataset"
import { DatasetAPI } from "../../../../deprecated/DatasetAPI__OLD"
import QuickUploadV2 from "./QuickUploadV2"

const SContainer = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;

  &.upload {
    padding: 50px;
    background-color: ${({ theme }) => theme.color.color_2_5};
  }
`


const SQuickUploadContainer = styled(SFlexCol)`
  height: 100%;
  width: 500px;

  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
  background-color: ${({ theme }) => theme.color.color_2_5};

`

const RepoViewDataset = ({
  subsets,
  dataset,
  showSelectDatasetView,
  triggerReload,
}: any) => {
  const [showUploadFilesView, setShowUploadFilesView] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [uploadFiles, setUploadFiles] = useState<any[]>([])
  const [signalReload, setSignalReload] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const [lsSubset, setLsSubset] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const trigger = () => {
    setSignalReload(!signalReload)
  }

  const handleShowUploadFilesView = (datasetId: string, subsetId: string) => {
    console.log(
      "RepoViewDataset::handleShowUploadFilesView::",
      datasetId,
      subsetId,
    )
    setLsSubset(subsetId)
    setShowUploadFilesView(true)
  }
  const handleHideUploadFilesView = () => {
    setShowUploadFilesView(false)
  }

  const handleFormSubmit = () => {
    console.log(
      "RepoViewDataset::handleFormSubmit::",
      name,
      description,
      uploadFiles,
    )
    setIsLoading(true)
    pushFilesToSubset(
      subsets.find((subset: any) => subset.subset_id === lsSubset),
    )
    //handleHideUploadFilesView()
  }

  /* const checkExistingProject = () => {
    DatasetAPI.getLabelStudioProject(lsSubset)
    .then((res: any) => {
      console.log("Ls Project",res.data)
      const subset = subsets.find((subset: any) => subset.subset_id === lsSubset)
      let pushToSubsetPayload = {
        ls_import_id: res.data[0]["ls_import_id"],
        ls_project_id: res.data[0]["ls_project_id"],
        path: subset["path"],
        subset_id: lsSubset,
      }
      pushFilesToSubset(pushToSubsetPayload)
    })
    .catch((err: any) => console.error("RepoViewDataset::checkExistingProject",err))
  } */

  const pushFilesToSubset = (payload: any) => {
    DatasetAPI.pushFilesToSubset(payload, uploadFiles, (e: any) =>
      setProgress(Math.round((100 * e.loaded) / e.total)),
    )
      .then((res: any) => {
        console.log("RepoViewDataset::pushFilesToSubset", res.data)
        setIsLoading(false)
        setShowUploadFilesView(false)
        triggerReload()
      })
      .then((err: any) =>
        console.error("RepoViewDataset::pushFilesToSubset", err),
      )
  }

  if (isLoading) {
    ;<LoadingSpinner message={"Creating Dataset"} />
  } else if (showUploadFilesView) {
    return (
      <SContainer className={"upload"}> 
      <SQuickUploadContainer>
        <QuickUploadV2
          menuOption={"Subset"}
          goEmptyContentMenu={handleHideUploadFilesView}
          setUploadFiles={setUploadFiles}
          handleFormSubmit={handleFormSubmit}
        />
      </SQuickUploadContainer>
      </SContainer>
    )
  } else {
    return (
      <SContainer>
        {subsets.length > 0 &&
          subsets.map((subset: any) => {
            return (
              <SubsetCard
                key={subset.subset_id}
                subset={subset}
                dataset={dataset}
                inRepo={true}
                selectDatasetView={showSelectDatasetView}
                handleShowUploadFilesView={handleShowUploadFilesView}
              />
            )
          })}
      </SContainer>
    )
  }
}

export default RepoViewDataset
