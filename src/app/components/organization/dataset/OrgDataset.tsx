import React, { useState } from 'react'
import FileUpload from '../../common/inputs/file-upload/FileUpload'
import UploadService from "../../../services/FileUploadService"
import { useSelector } from 'react-redux'
import { ISyncImportStorage } from '../../../utility/interface/project'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../../common/containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../common/buttons/Button'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const SContainer = styled(SFlexCol)`
  align-items: baseline;
`
const SInnerContainer = styled(SFlexRow)`
  background-color: ${({ theme }) => theme.color.color_2};
  font-size: 1rem;
  width: 500px;
  height: 25px;
  align-items: center;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_3};
  }
`
const SButtonContainer = styled(SFlexRow)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`

const SIcon = styled(FontAwesomeIcon)`
  border: none;
`

const SInput = styled.input`
  font-size: ${({ theme }) => theme.color.color_2};
  cursor: pointer;
  width: 3fr;

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
    width: 150px;
    height: 30px;
    border: none;
    border-radius: ${({ theme }) => theme.container.borderRadius.sm};

    background-color:${({ theme }) => theme.color.color_3};
    color: white;
    margin-top: 10px;
    cursor: pointer;
    &:hover{
        background-color:${({ theme }) => theme.color.color_6};
    }
`


const OrgDataset = () => {
    const [selectedFiles, setSelectedFiles] = useState<any[]>([])
    const [progress, setProgress] = useState(0)
    const fileSetId = "20180223"
    //const { repoId, repoName, repoDescription } = useSelector((state: any) => state)

    const handleFileChange = (e: any) => {
        setSelectedFiles(e.target.files)
      }

    const uploadFiles = () => {
        const data: ISyncImportStorage = {
            title: "OrgRepo2",
            description: "New Test Org Repository",
            project_id: 365,
            repoId: "RPSRX342696AGOCBH9773KOY9",
            path: 'a',
            use_blob_urls: true
        }
        console.log('uploadFiles', data)
        const upload = UploadService.handleFileUpload(
          selectedFiles,
          data,
          "365",
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
    <div> <SContainer>
    <SInnerContainer>
      
        <SButtonContainer>
          <SIcon icon={faUpload} />
          <SInput name="files" type="file" onChange={handleFileChange} multiple/>
          <SButton onClick={uploadFiles}>Upload</SButton>
        </SButtonContainer>
        

    </SInnerContainer>
  </SContainer></div>
  )
}

export default OrgDataset