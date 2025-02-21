import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { DatasetAPI } from "../../../../../api/DatasetAPI"
import DatasetFileAdd from "./DatasetFileAdd"
import DisplayUploadFiles from "./DisplayUploadFiles"

const SContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 0 0 10px 0;

  grid-template-rows: 2fr 6fr;
  grid-template-areas:
    "top"
    "bottom";

  box-shadow: 3px 3px 5px ${({ theme }) => theme.color.color_1};
`

const SCardTop = styled.div`
  grid-area: top;
  width: 100%;
  height: 100%;
  padding: 15px 25px 15px;
  margin: 0;
  align-items: baseline;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.color_1};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
`

const SCardBottom = styled.div`
  grid-area: bottom;
  width: 100%;
  height: 100%;
  margin: 0;
  align-items: baseline;
  padding: 15px 25px 15px;
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
`
const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
  padding: 0;
`

const SPara = styled.ul`
  font-size: 1rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
  text-align: justify;
  padding: 20px;
`
const SSubheading = styled.h2`
  font-size: 1rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`

const EmptyDatasetContainer = ({ selectedItem }: any) => {
  const [uploadFiles, setUploadFiles] = useState<any[]>([])
  const [filesMetadata, setFilesMetadata] = useState<any>({})
  const [progress, setProgress] = useState<number>(0)

  const userId = useSelector((state: any) => state.user.storeUserId)

  const handleSubmit = async () => {
    const data = new FormData()
    uploadFiles.forEach((file: any) => {
      data.append("file", file)
    })

    Object.entries(filesMetadata).forEach(([key, value]) => {
      data.append(key, JSON.stringify(filesMetadata[key]))
    })

    data.append("datastore_id", selectedItem.datastore_id)
    data.append("dataset_id", selectedItem.dataset_id)
    data.append("metadata", "")
    data.append("user_id", userId)
    const upload = await DatasetAPI.uploadFiles(data, (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    })

    console.log("Upload Response:", upload)
  }

  const inputFiles = useRef(null) as any

  const handleReset = () => {
    if (inputFiles.current) {
      inputFiles.current.value = ""
      inputFiles.current.type = "text"
      inputFiles.current.type = "file"
    }
  }

  const handleSetUploadFiles = (files: any) => {
    setUploadFiles(Array.from(files))
  }

  return (
    <SContainer>
      <SCardTop>
        <SHeading>Empty Dataset</SHeading>
        <SPara>
          <li>Add datastore files to this dataset.</li>
          <li>Upload files to this dataset.</li>
        </SPara>
      </SCardTop>
      <SCardBottom>
        {/*      <SSubheading>
          Datastore ID: {selectedItem && selectedItem.datastore_id}
        </SSubheading>
        <SSubheading>
          Dataset ID: {selectedItem && selectedItem.dataset_id}
        </SSubheading> */}

        {!uploadFiles || uploadFiles.length === 0 ? (
          <DatasetFileAdd
          /* setUploadFiles={handleSetUploadFiles}
            handleReset={handleReset}
            inputFiles={inputFiles} */
          />
        ) : (
          <DisplayUploadFiles
            files={uploadFiles}
            filesMetadata={filesMetadata}
            setFilesMetadata={setFilesMetadata}
            handleUpload={handleSubmit}
            handleReset={handleReset}
            setUploadFiles={setUploadFiles}
          />
        )}
      </SCardBottom>
    </SContainer>
  )
}

export default EmptyDatasetContainer
