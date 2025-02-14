import { useRef } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import FileUpload from "../../../common/inputs/file-upload/FileUpload"


const SColContainer = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`
const SHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.color.color_6};
`

const SContainer = styled(SFlexRow)`
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  padding: 5px;

  gap: 5px;
`

const SButton = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 200;
  width: 300px;
  color: ${({ theme }) => theme.color.color_6};
  background-color: ${({ theme }) => theme.color.color_2_5};
  border: 1px solid ${({ theme }) => theme.color.color_3};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
  }

  &.small {
    width: 140px;
    font-size: 0.8rem;
  }
`
const SButtonContainer = styled(SFlexRow)`
  gap: 20px;
  padding: 0;
  margin: 0 0 0 auto;
`

const QuickUploadV2 = ({
  setUploadFiles,
  handleFormSubmit,
  reset,
  inputRef

}: any) => {


  const inputFile = useRef(null) as any

  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = ""
      inputFile.current.type = "text"
      inputFile.current.type = "file"
    }
  }

  const handleChange = (e: any) => {

    setUploadFiles(e.target.files)
  }

  const handleCancel = () => {
    reset ? reset() : handleReset()
    
  }
  

  return (
    <SColContainer>
      <SContainer>
        <FileUpload
          id="ful-form"
          inputFile={inputRef ? inputRef : inputFile}
          handleFileChange={handleChange}
        />
      </SContainer>
      {/* <SButtonContainer>
        <SButton className="small right" onClick={handleCancel}>
          Cancel
        </SButton>
        <SButton className="small right" onClick={handleFormSubmit}>
          Upload
        </SButton>
      </SButtonContainer> */}
    </SColContainer>
  )
}

export default QuickUploadV2
