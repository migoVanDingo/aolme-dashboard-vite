import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import DatasetDashboard from "./DatasetDashboard"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  width: 100%;
  background-color: ${({ theme }) => theme.color.color_2};
  grid-area: content;
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

  const orgId = useSelector((state: any) => state.org.storeOrgId)
  const userId = useSelector((state: any) => state.user.storeUserId)

  const fileSetId = 20170330
  const repoId = "RPSH648N5EK18KBPAN3NDGXA7"

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files)
  }

  const uploadFiles = () => {
/*     
    DEPRECATED
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
      }) */
  }
  return (
    <SContainer>
      <DatasetDashboard />
    </SContainer>
  )
}

export default OrgDataset
