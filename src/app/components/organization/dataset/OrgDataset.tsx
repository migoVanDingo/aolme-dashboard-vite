import React, { useState } from "react"
import FileUpload from "../../common/inputs/file-upload/FileUpload"
import UploadService from "../../../services/FileUploadService"
import { useSelector } from "react-redux"
import { ISyncImportStorage } from "../../../utility/interface/project"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../common/buttons/Button"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import DatasetDashboard from "./DatasetDashboard"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.color.color_2};
  grid-area: content;
  overflow-y: scroll;
`
const SInnerContainer = styled(SFlexRow)`
  background-color: ${({ theme }) => theme.color.color_2};
  font-size: 1rem;
  width: 500px;
  height: 40px;
  align-items: center;
  padding: 0;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
  }
`
const SButtonContainer = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  padding: 0 0 0 10px;
  margin: 0;
  align-items: center;
`

const SIcon = styled(FontAwesomeIcon)`
  border: none;
`

const SInput = styled.input`
  font-size: ${({ theme }) => theme.color.color_2};
  cursor: pointer;
  width: 300px;

  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &::file-selector-button {
    border: none;
    color: ${({ theme }) => theme.color.color_6};
    background-color: transparent;
    border-right: 2px solid ${({ theme }) => theme.color.color_1};
    height: 100%;
    cursor: pointer;
  }
`

const SButton = styled.button`
  width: 100px;
  height: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_3};
  color: white;
  margin: 0 0 0 auto;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.color_6};
  }
`

const OrgDataset = () => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([])
  const [progress, setProgress] = useState(0)

  const { orgId, userId } = useSelector((state: any) => state)

  const fileSetId = 20170330
  const repoId = "RPSH648N5EK18KBPAN3NDGXA7"

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files)
  }

  const uploadFiles = () => {
    const data: ISyncImportStorage = {
      title: "Kelly",
      description: "Typing",
      repoId: repoId,
      use_blob_urls: true,
      entity_id: orgId ? orgId : userId,
    }
    console.log("uploadFiles", data)
    const upload = UploadService.handleFileUpload(
      selectedFiles,
      data,
      fileSetId,
      (e: any) => {
        setProgress(Math.round((100 * e.loaded) / e.total))
      },
    )
      .then((res) => {
        console.log("DID IT OWRK: ", res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <SContainer>
      {/* <SInnerContainer>
        <SButtonContainer>
          <SIcon icon={faUpload} />
          <SInput
            name="files"
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </SButtonContainer>
        <SButton onClick={uploadFiles}>Upload</SButton>
      </SInnerContainer> */}

      <DatasetDashboard />
    </SContainer>
  )
}

export default OrgDataset
