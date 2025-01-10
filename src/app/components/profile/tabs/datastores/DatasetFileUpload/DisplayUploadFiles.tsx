import { useEffect } from "react"
import styled from "styled-components"
import {
    SFlexCol,
    SFlexRow,
} from "../../../../common/containers/FlexContainers"
import TextInput from "../../../../common/inputs/text/TextInput"
import SelectInput from "../../../../common/inputs/select/SelectInput"
import SelectInputBasic from "../../../../common/inputs/select/SelectInputBasic"

const SContainer = styled.div`
  width: 100%;
  max-height: calc(100% - 60px);
  border: 1px solid ${({ theme }) => theme.color.color_3};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  overflow-y: scroll;
  margin-top: 10px;
  box-sizing: border-box;
  padding: 20px;
  color: ${({ theme }) => theme.color.color_5};
`

const STableContainer = styled(SFlexCol)`
  width: 100%;
  max-height: 100%;
`

const SItemRow = styled(SFlexRow)`
  width: 100%;
  min-height: 50px;
  box-sizing: border-box;

  margin: 0;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.color.color_3};
  gap: 10px;
  padding: 5px 10px;
`

const SRowCell = styled.p`
  font-size: 0.8rem;
  margin: 0;
  padding: 5px;
  color: ${({ theme }) => theme.color.color_5};

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &.sm {
    width: 140px;
  }

  &.md {
    width: 200px;
  }

  &.lg {
    width: 300px;
  }
`

const SListContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`

const SUploadButton = styled.button`
  margin: 20px 10px 0 0px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color.color_3};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_4};
  }
`

const DisplayUploadFiles = ({
    files,
    filesMetadata,
    setFilesMetadata,
    handleUpload,
    handleReset,
    setUploadFiles,
  }: any) => {
    const dataTypeOptions = [
      "audio",
      "video",
      "image",
      "annotation",
      "ground-truth",
      "other",
    ]
  
    useEffect(() => {
      if (files && files.length > 0) {
        // Initialize metadata when files change
        const metadata = files.reduce((acc: any, file: any) => {
          acc[file.name] = { tags: "", size: file.size, type: file.type, file_type: "" }
          return acc
        }, {})
        setFilesMetadata(metadata)
      }
    }, [files])
  
    const handleMetadataChange = (fileName: string, key: string, value: string) => {
      setFilesMetadata((prevMetadata: any) => ({
        ...prevMetadata,
        [fileName]: {
          ...prevMetadata[fileName],
          [key]: value,
        },
      }))
    }
  
    const handleSubmit = () => {
      console.log("Metadata on upload:", filesMetadata)
      handleUpload()
    }
  
    const handleCancel = () => {
      setUploadFiles([])
      setFilesMetadata({})
      handleReset()
    }
  
    return (
      <SContainer>
        <STableContainer>
          <SItemRow>
            <SRowCell>Name</SRowCell>
            <SRowCell className={"md"}>Data Type</SRowCell>
            <SRowCell className={"md"}>Tags</SRowCell>
            <SRowCell className={"sm"}>Size</SRowCell>
            <SRowCell className={"sm"}>File Type</SRowCell>
          </SItemRow>
          <SListContainer>
            {files &&
              files.length > 0 &&
              files.map((file: any) => (
                <SItemRow key={file.name}>
                  <SRowCell>{file.name}</SRowCell>
                  <SRowCell className={"md"}>
                    <SelectInputBasic
                      name={`file_type-${file.name}`}
                      value={filesMetadata[file.name]?.file_type || ""}
                      handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleMetadataChange(file.name, "file_type", e.target.value)
                      }
                      defaultValue={"Select Data Type"}
                      options={dataTypeOptions}
                    />
                  </SRowCell>
                  <SRowCell className={"md"}>
                    <TextInput
                      value={filesMetadata[file.name]?.tags || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleMetadataChange(file.name, "tags", e.target.value)
                      }
                    />
                  </SRowCell>
                  <SRowCell className={"sm"}>
                    {Math.round(file.size / (1024 * 1024))} MB
                  </SRowCell>
                  <SRowCell className={"sm"}>{file.type}</SRowCell>
                </SItemRow>
              ))}
          </SListContainer>
        </STableContainer>
        <SUploadButton onClick={handleCancel}>Cancel</SUploadButton>
        <SUploadButton onClick={handleSubmit}>Upload</SUploadButton>
      </SContainer>
    )
  }
  
  export default DisplayUploadFiles
  
