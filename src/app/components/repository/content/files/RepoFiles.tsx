import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import FilesUpdate from "./FilesUpdate"
import FilesMenu from "./FilesMenu"
import BranchContent from "./BranchContent"
import FileUpload from "../../../common/inputs/file-upload/FileUpload"
import { SButton } from "../../../common/styled"
import FileUploadService from "../../../../services/FileUploadService"
import IDataset from "../../../../utility/interface/dataset"
import IModule from "../../../../utility/interface/module"
import {
  faFile,
  faHardDrive,
  faCubes,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import QuickUpload from "./QuickUpload"

const SContainer = styled(SFlexCol)`
  grid-area: files;
  border: 1px solid ${({ theme }) => theme.color.color_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  margin: 10px 0;
  overflow: hidden;
`

const tabs = [
  {
    title: "All",
    url: "link",
    type: "ALL",
    icon: faFile,
    callback: () => {
      console.log("not implemented")
    },
  },
  {
    title: "Configs",
    url: "link",
    type: "CONFIG",
    icon: faCubes,
    callback: () => {
      console.log("not implemented")
    },
  },
  {
    title: "Dataset",
    url: "link",
    type: "DATASET",
    icon: faHardDrive,
    callback: () => {
      console.log("not implemented")
    },
  },
  {
    title: "Modules",
    url: "link",
    type: "MODULE",
    icon: faCubes,
    callback: () => {
      console.log("not implemented")
    },
  },
]

const RepoFiles = () => {
  const [folderPath, setFolderPath] = useState<string[]>([])
  const [trigger, triggerRender] = useState<boolean>(false)
  const [stopSwitchFolders, setStopSwitchFolders] = useState<boolean>(false)
  const [folderItemsSwitch, setFolderItemsSwitch] = useState<boolean>(false)
  const [menuOption, setMenuOption] = useState<string>("ALL")
  const [selectedFiles, setSelectedFiles] = useState<any[]>([])
  const [progress, setProgress] = useState(0)
  const [description, setDescription] = useState<string>("")
  const [isPublic, setIsPublic] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<string>("ALL")

  const { repoEntity, userId } = useSelector((state: any) => state)

  const handleSelectFileMenuOption = (type: string) => {
    setMenuOption(type)
  }

  useEffect(() => {
    console.log("menuOption: ", menuOption)
  }, [menuOption])

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files)
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    console.log("loading...")
    const payload: IModule = createPayloadType(menuOption)
    addFiles(e, payload)

    //setLoading(false)
  }

  const createPayloadType = (type: string) => {
    let payload: IModule
    switch (type) {
      case "DATASET":
        payload = {
          entity_id: repoEntity,
          description: description,
          owner: userId,
          type: "DATASET",
          is_public: isPublic,
        }
        break

      case "MODULE":
        payload = {
          entity_id: repoEntity,
          description: description,
          owner: userId,
          type: "MODULE",
          is_public: isPublic,
        }
        break

      case "CONFIG":
        payload = {
          entity_id: repoEntity,
          description: description,
          owner: userId,
          type: "CONFIG",
          is_public: isPublic,
        }
        break

      default:
        payload = {
          entity_id: "",
          description: "",
          owner: "",
          type: "",
          is_public: 0,
        }
        break
    }

    return payload
  }

  const addFiles = async (e: any, payload: IModule) => {
    FileUploadService.fileUpload(selectedFiles, payload, (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    })
      .then((res: any) => {
        console.log("FILE_UPLOAD_RESPONSE", res.data)
      })
      .catch((err: any) => {
        console.log("error: ", err)
      })
  }

  const launchFileUploadModal = () => {
    console.log("menuOption: ", menuOption)
  }

  return (
    <SContainer>
      <FilesUpdate />
      <FilesMenu
        handleSelectFileMenuOption={handleSelectFileMenuOption}
        folderItemsSwitch={folderItemsSwitch}
        setFolderItemsSwitch={setFolderItemsSwitch}
        stopSwitchFolders={stopSwitchFolders}
        setStopSwitchFolders={setStopSwitchFolders}
        folderPath={folderPath}
        setFolderPath={setFolderPath}
        trigger={trigger}
        triggerRender={triggerRender}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {menuOption !== "ALL" && <QuickUpload launchModal={launchFileUploadModal} menuOption={menuOption} />}

      <BranchContent
        folderItemsSwitch={folderItemsSwitch}
        setFolderItemsSwitch={setFolderItemsSwitch}
        stopSwitchFolders={stopSwitchFolders}
        setStopSwitchFolders={setStopSwitchFolders}
        folderPath={folderPath}
        setFolderPath={setFolderPath}
        trigger={trigger}
      />
      {/* ) : menuOption === "DATASET" ||
        menuOption === "MODULE" ||
        menuOption === "CONFIG" ? (
        <form
          encType="multipart/form-data"
          id="ful-form"
          onSubmit={() => handleFormSubmit(menuOption)}
        >
          <FileUpload handleFileChange={handleFileChange} />
          <SButton type="submit" innerHtml={"Create Repository"} />
        </form>
      ) : (
        <></>
      )} */}
    </SContainer>
  )
}

export default RepoFiles
