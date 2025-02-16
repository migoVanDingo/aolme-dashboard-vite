import { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import TextArea from "../../../common/inputs/text/TextArea"
import TextInput from "../../../common/inputs/text/TextInput"
import QuickUploadV2 from "../files/QuickUploadV2"
// import SelectOrgContentView from "./SelectOrgContentView"
import UploadDatasetFilesRepo from "../../upload/UploadDatasetFilesRepo"

const SContainer = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
  background-color: ${({ theme }) => theme.color.color_2_5};
  padding: 50px;
`

const SHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.color.color_6};
`
const SPara = styled.p`
  padding: 10px 0;
  margin: 0;
  font-size: 0.95rem;
  line-height: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.color_6};
`
const SColContainer = styled(SFlexCol)`
  height: 100%;
  width: 500px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`

const SButton = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 200;
  width: 300px;
  color: ${({ theme }) => theme.color.color_6};
  background-color: ${({ theme }) => theme.color.color_2};
  border: 1px solid ${({ theme }) => theme.color.color_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
    background-color: ${({ theme }) => theme.color.color_1};
  }

  &.small {
    width: 140px;
    font-size: 0.8rem;
  }
  &.right {
    margin-left: auto;
  }
`

const EmptyContentMenu = ({
  menuOption,
  triggerReload,
  hideSelectDatasetView,
  launchNotebook,
  setUploadFiles,
  handleFormSubmit,
  name,
  setName,
  description,
  setDescription,
}: any) => {
  const [heading, setHeading] = useState<string>("")
  const [createFileMethod, setCreateFileMethod] = useState<string>("")

  const goBackToEmptyMenu = () => setCreateFileMethod("")

  const reload = () => {
    goBackToEmptyMenu()
    triggerReload()
    hideSelectDatasetView()
  }

  useEffect(() => {
    const createHeading = () => {
      const lowercase = menuOption.toLowerCase()
      const firstLetter = lowercase.charAt(0).toUpperCase()
      const rest = lowercase.slice(1)

      setHeading(firstLetter + rest)
    }

    return menuOption && createHeading()
  }, [menuOption])

/*   if (createFileMethod === "ORG") {
    //Select from org files menu
    return (
      <SelectOrgContentView
        menuOption={menuOption}
        goEmptyContentMenu={goBackToEmptyMenu}
        hideSelectView={hideSelectDatasetView}
        triggerReload={reload}
      />
    )
  } else  */if (createFileMethod === "UPLOAD") {
    //Upload file
    return (
      <UploadDatasetFilesRepo
      menuOption={menuOption}
      name={name}
      description={description}
      setName={setName}
      setDescription={setDescription}
      goEmptyContentMenu={goBackToEmptyMenu}
      trigger={reload}
      setUploadFiles={setUploadFiles}
      handleFormSubmit={handleFormSubmit}
      />
      
    )
  } else if (createFileMethod === "URL") {
    //Add url to download file
    return (
      <div>NOT IMPLEMENTED</div>
    )
  } else {
    //Main Menu
    return (
      <SContainer>
        <SHeading>{heading && heading}</SHeading>
        <SPara>
          No {menuOption.toLowerCase()}s linked to this repository. You can
          select an option to: Use an organizational {menuOption.toLowerCase()},
          upload a {menuOption.toLowerCase()} file, or add a link to download a{" "}
          {" " + menuOption.toLowerCase()} from somewhere else. Select an option
          below to continue.
        </SPara>
        {menuOption !== "NOTEBOOK" && (
          <SButton onClick={() => setCreateFileMethod("ORG")}>
            Use Organization {heading && heading}
          </SButton>
        )}
        <SButton onClick={() => setCreateFileMethod("UPLOAD")}>
          Upload {heading && heading} Files
        </SButton>
        {menuOption === "DATASET" && (
          <SButton onClick={() => setCreateFileMethod("URL")}>
            Add URL to Download {heading && heading}
          </SButton>
        )}

        {menuOption === "NOTEBOOK" && (
          <SButton onClick={launchNotebook}>Launch Jupyter Notebook</SButton>
        )}
      </SContainer>
    )
  }
}

export default EmptyContentMenu
