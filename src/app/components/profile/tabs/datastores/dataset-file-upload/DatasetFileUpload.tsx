import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../../common/containers/FlexContainers"
import QuickUploadV2 from "../../../../repository/content/files/QuickUploadV2"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: 150px;
  margin: 10px 0;
`

const SHeading = styled.h1`
  font-size: 1.3rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
  padding: 0;
  width: 100%;
  padding: 10px;
`

const SUploadContainer = styled(SFlexRow)`
  width: 100%;
  height: 80px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`

const DatasetFileUpload = ({ setUploadFiles, handleReset, inputFiles }: any) => {
  
  return (
    <SContainer>
      <SHeading>Upload Files</SHeading>
        <SUploadContainer>
          <QuickUploadV2
            setUploadFiles={setUploadFiles}
            reset={handleReset} 
            inputRef={inputFiles}  
            handleSubmit={() => console.log('FILE_UPLOAD_METHOD:NOT_IMPLEMENTED')}
          />
        </SUploadContainer>
    </SContainer>
  )
}

export default DatasetFileUpload
