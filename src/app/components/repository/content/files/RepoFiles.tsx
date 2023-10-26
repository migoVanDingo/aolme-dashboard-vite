import React, { useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../common/containers/FlexContainers'
import FilesUpdate from './FilesUpdate'
import FilesMenu from './FilesMenu'
import BranchContent from './BranchContent'

const SContainer = styled(SFlexCol)`
    grid-area: files;
    border: 1px solid ${({theme}) => theme.color.color_5};
    border-radius: ${({theme}) => theme.container.borderRadius.md};
    margin: 10px 0;
    overflow: hidden;
    
`



const RepoFiles = () => {
  const [folderPath, setFolderPath] = useState<string[]>([])
  const [trigger, triggerRender] = useState<boolean>(false)
  const [stopSwitchFolders, setStopSwitchFolders] = useState<boolean>(false)
  const [folderItemsSwitch, setFolderItemsSwitch] = useState<boolean>(false)
  return (
    <SContainer>
        <FilesUpdate />
        <FilesMenu folderItemsSwitch={folderItemsSwitch} setFolderItemsSwitch={setFolderItemsSwitch} stopSwitchFolders={stopSwitchFolders} setStopSwitchFolders={setStopSwitchFolders}  folderPath={folderPath} setFolderPath={setFolderPath} trigger={trigger} triggerRender={triggerRender}/>
        <BranchContent  folderItemsSwitch={folderItemsSwitch} setFolderItemsSwitch={setFolderItemsSwitch}  stopSwitchFolders={stopSwitchFolders} setStopSwitchFolders={setStopSwitchFolders}  folderPath={folderPath} setFolderPath={setFolderPath} trigger={trigger} />
    </SContainer>
  )
}

export default RepoFiles