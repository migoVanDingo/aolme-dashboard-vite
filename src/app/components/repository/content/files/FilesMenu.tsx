import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import MenuTabs from "./MenuTabs"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

const SContainer = styled(SFlexRow)`
  width: 100%;
  padding: 0px 0px;
  box-sizing: border-box;
  gap: 4px;

  border-bottom: 1px solid ${({ theme }) => theme.color.color_5};
`

const SCrumb = styled.p`
  color: ${({ theme }) => theme.color.color_8};
  font-size: 0.8rem;
  font-weight: 300;
  &.highlight {
    &:hover {
      color: aqua;
      cursor: pointer;
      font-weight: 500;
    }
  }
`

const FilesMenu = ({
  folderPath,
  setFolderPath,
  setFolderItemsSwitch,
  handleSelectFileMenuOption,
  tabs,
  activeTab,
  setActiveTab
}: any) => {
  
  const [breadCrumbDirectory, setBreadCrumbDirectory] = useState<string[]>([])

  const navigate = useNavigate()

  const createBreadCrumb = () => {
    if (folderPath !== null && folderPath !== undefined) {
      const breadCrumbs = folderPath.map((dir: any, index: number) => {
        return (
          <SCrumb
            key={index}
            className={index + 1 === folderPath.length ? "" : "highlight"}
            id={index.toString()}
            onClick={handleClickAncestor}
          >
            {" / " + dir}
          </SCrumb>
        )
      })

      setBreadCrumbDirectory(breadCrumbs)
    }
  }
  useEffect(() => {
    return createBreadCrumb()
  }, [folderPath])


  const handleClickAncestor = (e: any) => {
    const index = parseInt(e.target.id) + 1
    console.log("i: ", index)
    console.log("FolderPath: ", folderPath)
    const newPath = folderPath.splice(index, folderPath.length)
    console.log("NewPath: ", folderPath)
 
    
    setFolderItemsSwitch(true)
    setFolderPath(folderPath)
    
   
  }


    return (
      <SContainer>
        <MenuTabs tabs={tabs} handleSelectFileMenuOption={handleSelectFileMenuOption}  setActiveTab={setActiveTab} setFolderPath={setFolderPath} activeTab={activeTab} />
      </SContainer>
    )

}


export default FilesMenu
