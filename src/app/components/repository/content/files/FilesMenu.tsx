import React, { useState } from "react"
import styled from "styled-components"
import { SFlexRow } from "../../../common/containers/FlexContainers"
import MenuTabs from "./MenuTabs"

const SContainer = styled(SFlexRow)`
  width: 100%;
`

const FilesMenu = () => {
  const [activeTab, setActiveTab] = useState<string>("All")
  return (
    <SContainer>
      <MenuTabs setActiveTab={setActiveTab} activeTab={activeTab} />
    </SContainer>
  )
}

export default FilesMenu
