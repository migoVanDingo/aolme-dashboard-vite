import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../common/containers/FlexContainers"
import Heading from "../../common/Heading"
import DiscussionThread from "../../common/DiscussionThread"
import CreateButton from "../../common/buttons/CreateButton"


const SContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 300px;
  overflow: hidden;
  grid-area: discussion;

  box-shadow: 0px 3px 8px ${({ theme }) => theme.color.color_0};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.color.color_3};
`

const SCardTop = styled(SFlexRow)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  padding: 1rem;
  gap: 5px;
`
const SCardBottom = styled.div`
  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.md};
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.md};
  overflow: hidden;

`
const sampleComments = [
  { username: "Alice", text: "This is an interesting topic!", timestamp: Date.now() - 50000 },
  { username: "Bob", text: "I totally agree with Alice!", timestamp: Date.now() - 30000 },
  { username: "Charlie", text: "Great discussion happening here.", timestamp: Date.now() - 10000 }
];
const DiscussionModule = () => {
  return <SContainer>
    <SCardTop>
      <Heading heading={"Discussion"} size={"md"} /><CreateButton className={"view push-right"} innerHtml={"View Thread"} />
    </SCardTop>
    <SCardBottom>
      <DiscussionThread comments={sampleComments} />
    </SCardBottom>
  </SContainer>
}

export default DiscussionModule
