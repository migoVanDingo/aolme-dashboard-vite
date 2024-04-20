import {
  faBookBookmark,
  faBullseye,
  faCubes,
  faFile,
  faHardDrive,
  faListCheck,
  faPencil,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { FilesAPI } from "../../../../api/FileAPI"
import FileUploadService from "../../../../services/FileUploadService"
import IModule from "../../../../utility/interface/module"
import { SFlexCol } from "../../../common/containers/FlexContainers"
import BranchContent from "./BranchContent"
import FilesMenu from "./FilesMenu"
import FilesUpdate from "./FilesUpdate"
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
  

  /* {
    title: "Modules",
    url: "link",
    type: "MODULE",
    icon: faCubes,
    callback: () => {
      console.log("not implemented")
    },
  }, */
  {
    title: "Notebooks",
    url: "link",
    type: "NOTEBOOK",
    icon: faBookBookmark,
    callback: () => {
      console.log("not implemented")
    },
  } /* ,
  {
    title: "Annotations",
    url: "link",
    type: "ANNOTATIONS",
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
  }, */,
]

const RepoFiles = ({ repoId /* , repoFiles */ }: any) => {
  const [folderPath, setFolderPath] = useState<string[]>([])
  const [trigger, triggerRender] = useState<boolean>(false)
  const [folderItemsSwitch, setFolderItemsSwitch] = useState<boolean>(false)
  const [menuOption, setMenuOption] = useState<string>("ALL")
  const [selectedFiles, setSelectedFiles] = useState<any[]>([])
  const [progress, setProgress] = useState(0)
  const [description, setDescription] = useState<string>("")
  const [isPublic, setIsPublic] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<string>("ALL")
  const [files, setFiles] = useState<any[]>([])
  const [show, setShow] = useState<boolean>(false)

  const { repoEntity, userId } = useSelector((state: any) => state)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(!show)
    console.log("menuOption: ", menuOption)
  }

  useEffect(() => {
    const init = () => {
      //getProjectFiles(menuOption)
    }

    return init()
  }, [menuOption])

  const getProjectFiles = (option: any) => {
    console.log("folderPath: ", folderPath)

    if (menuOption !== "ALL") {
      FilesAPI.getDirectoryItems(repoEntity, option, repoEntity, repoId)
        .then((result: any) => {
          console.log("RepoFiles::result: ", result.data)
          setFiles(result.data)
        })
        .catch((err: any) => console.error(err))
    } else {
      FilesAPI.getRepoFiles(repoId, repoEntity)
        .then((result: any) => {
          console.log("Root::result: ", result.data)

          setFiles(result.data)
        })
        .catch((err: any) => console.error(err))
    }
  }

  const inputFile = useRef(null)

  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = ""
      inputFile.current.type = "text"
      inputFile.current.type = "file"
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
  }

  const addFiles = async (e: any, payload: IModule) => {
    console.log("repoId: ", repoId)
    console.log("payload: ", payload)
    FileUploadService.fileUpload(
      selectedFiles,
      payload,
      (e: any) => {
        setProgress(Math.round((100 * e.loaded) / e.total))
      },
      repoId,
    )
      .then((res: any) => {
        console.log("FILE_UPLOAD_RESPONSE", res.data)
        //getProjectFiles()
        handleReset()
        handleTriggerRender()
      })
      .catch((err: any) => {
        console.log("error: ", err)
      })
  }

  const handleTriggerRender = () => {
    triggerRender(!trigger)
  }

  return (
    <SContainer>
      <FilesUpdate />
      <FilesMenu
        folderPath={folderPath}
        setFolderPath={setFolderPath}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        setFolderItemsSwitch={setFolderItemsSwitch}
        handleSelectFileMenuOption={handleSelectFileMenuOption} 
      />
      

      <BranchContent
        show={show}
        menuOption={menuOption}
      />
    </SContainer>
  )
}

export default RepoFiles
