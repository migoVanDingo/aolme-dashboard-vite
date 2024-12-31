import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../common/containers/FlexContainers"
import { faUsersBetweenLines, faVectorSquare, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SContainer = styled(SFlexRow)`
  height: 50px;
  width: 1400px;
  border-top: 1px solid ${({ theme }) => theme.color.color_3};
  margin-top: auto;
  margin-bottom: 0;
  align-items: center;
`

const SItem = styled(SFlexRow)`
  width: 90px;
  align-items: center;
`

const SIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.color_5};
  margin-right: 5px;
  ;
`

const SText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.color_6};
`

const DatastoreCardInfoBar = () => {
  return (
    <SContainer>
      <SItem>
        <SIcon icon={faVideo} />
        <SText>: {812}</SText>
      </SItem>

      <SItem>
        <SIcon icon={faVectorSquare} />
        <SText>: {"56%"}</SText>
      </SItem>

      <SItem>
        <SIcon icon={faUsersBetweenLines} />
        <SText>: {"10%"}</SText>
      </SItem>
    </SContainer>
  )
}

export default DatastoreCardInfoBar
