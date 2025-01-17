import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import DatasetFileAdd from "./dataset-file-upload/DatasetFileAdd"

const SContainer = styled.div`
  grid-template-rows: 80px auto;

  grid-template-areas:
    "top"
    "bottom";
`

const SHeader = styled(SFlexRow)`
  grid-area: top;
  width: 100%;
  padding: 20px 25px;
  margin: 0;
  align-items: baseline;
  gap: 20px;
  background-color: ${({ theme }) => theme.color.color_2};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
  background-color: ${({ theme }) => theme.color.color_1};
`
const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`
const SButton = styled.button`
  width: 130px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  background-color: ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  cursor: pointer;
  font-size: 0.8rem;

  &.sm {
    height: 30px;
    font-size: 0.8rem;
  }

  &.open {
    background-color: ${({ theme }) => theme.color.color_3};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.color_4};
    color: ${({ theme }) => theme.color.color_8};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.color_6};
    color: ${({ theme }) => theme.color.color_8};
  }

  &.push-right {
    margin-left: auto;
  }

  &.submit {
    background-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.color.color_8};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  }

  &.remove {
    background-color: #b10000;
    color: ${({ theme }) => theme.color.color_8};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  }
`

const SFileList = styled(SFlexCol)`
  grid-area: bottom;
  width: 100%;
  height: 100%;
  margin: 0;
  align-items: baseline;
  padding: 15px 0px 0px;
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
`

const SFileRow = styled(SFlexRow)`
  width: 100%;
  gap: 20px;
  padding: 0 25px;
  margin: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
  align-items: center;

    &:last-child {
        border-bottom: none;
    }
`

const SFileCell = styled.p`
  color: ${({ theme }) => theme.color.color_5};

  width: 200px;

  &.sm {
    width: 50px;
  }

  &.md {
    width: 150px;
  }
  &.lg {
    width: 350px;
  }

  &.right {
    padding: 0 0 0 20px;

    margin-left: auto;
  }
`

function formatDate(date: any) {
  const options = { day: "2-digit", month: "short", year: "numeric" }
  return date.toLocaleDateString("en-US", options).replace(",", "")
}

const DatasetFileSetList = ({ list, sets, handleViewProjects }: any) => {
  const [toggleFileForm, setToggleFileForm] = useState<boolean>(false)

  const toggleSelect = () => {
    setToggleFileForm(true)
  }
  const toggleView = () => {
    setToggleFileForm(false)
  }

  

  return (
    <SContainer>
      <SHeader>
        <SHeading>{!toggleFileForm ? "File Sets" : "Add Files"}</SHeading>
        <SButton
          className={`push-right ${!toggleFileForm ? "submit" : "remove"}`}
          onClick={!toggleFileForm ? toggleSelect : toggleView}
        >
          {!toggleFileForm ? "Add Files" : "Back to View"}
        </SButton>
      </SHeader>

      {toggleFileForm ? (
        <DatasetFileAdd />
      ) : (
        <SFileList>
          <SFileRow>
            <SFileCell className={"lg"}>{"File Name"}</SFileCell>
            <SFileCell className={"sm"}>{"# Files"}</SFileCell>
            <SFileCell className={"sm"}>{"Type"}</SFileCell>

            <SFileCell className={"md right"}>{"Labeler"}</SFileCell>
          </SFileRow>
          {sets.map((fileSet: any) => {
            return (
              <SFileRow>
                <SFileCell className={"lg"}>{fileSet.set_name}</SFileCell>
                <SFileCell className={"sm"}>{fileSet.numFiles}</SFileCell>
                <SFileCell className={"sm"}>
                  {
                    list.filter(
                      (item: any) =>
                        JSON.parse(item.metadata).set_name === fileSet.set_name,
                    )[0].file_type
                  }
                </SFileCell>

                <SButton
                  onClick={() => handleViewProjects(fileSet)}
                  className="open md push-right"
                >
                  View Projects
                </SButton>
              </SFileRow>
            )
          })}
        </SFileList>
      )}
    </SContainer>
  )
}

export default DatasetFileSetList
