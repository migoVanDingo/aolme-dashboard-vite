import React from 'react'
import styled from 'styled-components'
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SFlexRow } from '../../../common/containers/FlexContainers'

const SRow = styled(SFlexRow)`
  align-items: center;
  width: 100%;
  height: 40px;

  background-color: ${({ theme }) => theme.color.color_0};
  border-bottom: 1px solid ${({ theme }) => theme.color.color_5};
  font-size: 0.8rem;
  padding: 5px 15px;
  box-sizing: border-box;

  &.last {
    border-bottom: none;
  }

  &.first {
    border-top: 1px solid ${({ theme }) => theme.color.color_5};
  }
`

const SContentLink = styled(SFlexRow)`
  width: 300px;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.accent.color_2};
  }
`

const SIcon = styled(FontAwesomeIcon)`
  margin: 0 10px 0 0;
  color: ${({ theme }) => theme.color.color_8};
`

const SLine = styled.p`
  margin: 0;
  padding: 0;
  width: 100%;
  color: ${({ theme }) => theme.color.color_8};
  &:hover {
    color: ${({ theme }) => theme.accent.color_2};
  }
`

const SCommit = styled.p`
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  width: 90px;
  text-align: center;
  font-size: 0.8rem;
  margin: 0 0 0 40px;
  padding: 5px 12px;
  color: ${({ theme }) => theme.color.color_5};
  background-color: ${({ theme }) => theme.color.color_1};
`

const SCommitMsg = styled.p`
  font-size: 0.8rem;
  margin: 0 0 0 20px;
  padding: 5px 0;
`

const SLastUpdate = styled.p`
  font-size: 0.8rem;
  margin: 0;
  margin-left: auto;
  padding: 5px 0;
`

const ViewFiles = ({ files }: any) => {
  return (
    <>{files &&
        files.map((file: any, index: number) => {
          return (
            <SRow
              key={index}
              className={
                index === files.length - 1 && index === 0
                  ? "first last"
                  : index === files.length - 1
                  ? "last"
                  : index === 0
                  ? "first"
                  : ""
              }
            >
              <SContentLink onClick={() => {}}>
                <SIcon icon={faFile} />
                <SLine>{file.name}</SLine>
              </SContentLink>

              {file.commit && <SCommit>{file.commit}</SCommit>}
              {file.commit_message && (
                <SCommitMsg>{file.commit_message}</SCommitMsg>
              )}
              {file.last_updated && (
                <SLastUpdate>{file.last_updated}</SLastUpdate>
              )}
            </SRow>
          )
        })}</>
  )
}

export default ViewFiles