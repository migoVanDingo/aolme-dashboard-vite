import React, { useEffect, useRef, useState } from "react"
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
  faPencil,
  faBullseye,
  faBookBookmark,
  faListCheck
} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import QuickUpload from "./QuickUpload"
import AddFileModal from "../../../modal/AddFileModal"
import { DatasetAPI } from "../../../../api/DatasetAPI"
import { RepoAPI } from "../../../../api/RepoAPI"
import RepoItems from "./RepoItems"

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
    icon: faListCheck,
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
  {
    title: "Notebooks",
    url: "link",
    type: "NOTEBOOK",
    icon: faBookBookmark,
    callback: () => {
      console.log("not implemented")
    },
  },
  {
    title: "Annotations",
    url: "link",
    type: "ANNOTATION",
    icon: faPencil,
    callback: () => {
      console.log("not implemented")
    },
  },
  {
    title: "Ground Truth",
    url: "link",
    type: "GROUND_TRUTH",
    icon: faBullseye,
    callback: () => {
      console.log("not implemented")
    },
  },
]

const RepoFiles = ({repoId}: any) => {
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

  const [repoFiles, setRepoFiles] = useState<any[]>([])

  const [tabFiles, setTabFiles] = useState<any[]>([])

  const [show, setShow] = useState<boolean>(false);
  const [triggerGetFiles, setTriggerGetFiles] = useState<boolean>(false)

  const { repoEntity, userId } = useSelector((state: any) => state)

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(!show)};

  

  useEffect(() => {
    const init = () => {
      getProjectFiles()
    }

    return init()
  }, [repoId])

  useEffect(() => {
    console.table("repofiles: ", repoFiles)
    if(menuOption === "ALL") setTabFiles(repoFiles)
    else {
      const files = repoFiles.filter((file: any) => file.type === menuOption)
      setTabFiles(files)
    }
  }, [repoFiles, menuOption])

  const getProjectFiles = () => {
    //Get Datasets
    RepoAPI.getRepoItems(repoId)
    .then((res: any) => {
      //console.log("res files: ", res.data)
      setRepoFiles(res.data)
      
    })
    .catch((err: any) => console.error(err))
    //Get Modules
    //Get Configs
  }

  const inputFile = useRef(null);

  const handleReset = () => {
    if (inputFile.current) {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
    }
}


  const handleSelectFileMenuOption = (type: string) => {
    setMenuOption(type)
    setShow(false)
  }

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
    let payload: IModule = {
      entity_id: repoEntity,
      description: description,
      owner: userId,
      type: type,
      is_public: isPublic,
    }
    return payload
    /* switch (type) {
      /* case "DATASET":
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
          entity_id: repoEntity,
          description: description,
          owner: userId,
          type: type,
          is_public: isPublic,
        }
        break
    } */

    
  }

  const addFiles = async (e: any, payload: IModule) => {
    console.log("repoId: ", repoId)
    FileUploadService.fileUpload(selectedFiles, payload, (e: any) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    }, repoId)
      .then((res: any) => {
        console.log("FILE_UPLOAD_RESPONSE", res.data)
        getProjectFiles()
        handleReset()
        
      })
      .catch((err: any) => {
        console.log("error: ", err)
      })
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
      <QuickUpload inputFile={inputFile} handleShow={handleShow} menuOption={menuOption} show={show} handleChange={handleFileChange} handleFormSubmit={handleFormSubmit}/>
      {/* <AddFileModal  show={show} handleClose={handleClose} handleShow={handleShow} /> */}

      <RepoItems tabFiles={tabFiles} />
      
      {/* <BranchContent
        folderItemsSwitch={folderItemsSwitch}
        setFolderItemsSwitch={setFolderItemsSwitch}
        stopSwitchFolders={stopSwitchFolders}
        setStopSwitchFolders={setStopSwitchFolders}
        folderPath={folderPath}
        setFolderPath={setFolderPath}
        trigger={trigger}
      /> */}
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
