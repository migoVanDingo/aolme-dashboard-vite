import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { SFlexRow } from "../common/containers/FlexContainers"

const SContainer = styled(SFlexRow)`
  border: 1px solid ${({ theme }) => theme.header.buttonColor};
  height: 20px;
  padding: 3px 5px;
  border-radius: 4px;
  align-items: center;

  &:hover {
    border: 1px solid ${({ theme }) => theme.header.buttonColorHover};
    cursor: pointer;
  }

`

const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.header.buttonColor};

  &.hover {
    color: ${({ theme }) => theme.header.buttonColorHover};
  }
`

const Notifications = () => {
  const [hover, setHover] = useState<boolean>(false)

  const handleHover = () => {
    setHover(true)
  }
  const cancelHover = () => {
    setHover(false)
  }

  return (
    <SContainer onMouseOver={handleHover} onMouseOut={cancelHover}>
      <SIcon className={hover ? "hover" : ""} icon={faMessage} />
    </SContainer>
  )
}

export default Notifications
