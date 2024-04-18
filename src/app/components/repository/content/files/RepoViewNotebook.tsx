import React from "react"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import styled from "styled-components"
import { SUserRow } from "../../../styled/SOrganization"
import FileRow from "../../../common/FileRow"

const SParent = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: 200px;
  box-sizing: border-box;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.color_2_5};
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  overflow: hidden;
  align-items: flex-start;
  box-shadow: 2px 4px 4px ${({ theme }) => theme.color.shadow.dark};
`

const SDescription = styled.p`
  padding: 10px 0;
  margin: 0;
  font-size: 0.95rem;
  line-height: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.color_6};
`

const SHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0;
  color: ${({ theme }) => theme.accent.color_3};
`

const SCardHeader = styled(SFlexRow)`
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
`

const SLastUpdated = styled.p`
  padding: 0;
  margin: 5px 0 0 0;
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_5};
`

const SFilesContainer = styled(SFlexCol)`
  border: 1px solid ${({ theme }) => theme.color.color_3};
  width: 100%;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.color_3};
  box-shadow: 2px 2px 4px ${({ theme }) => theme.color.shadow.dark};
`

const SFlexColContainer = styled(SFlexCol)`
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 5px;
`

const SFilesHeading = styled.h3`
  font-size: 1rem;
  font-weight: 200;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.color.color_6};
`
const SFieldValue = styled(SFlexRow)`
  width: 300px;
  padding: 10px;
  box-sizing: border-box;

  transition: all 0.3s ease;
  color: ${({ theme }) => theme.color.color_5};
  font-size: 0.9rem;
  font-weight: 300;
`

const SLabelerButton = styled.button`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.color.color_2};
  border: 1px solid ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_6};
  font-size: 0.9rem;
  font-weight: 300;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_2_5};
    border-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
  }
`

const SButtonContainer = styled(SFlexRow)`
  gap: 20px;
  padding: 0;
  margin: 0 0 0 auto;
`

const RepoViewNotebook = ({ notebooks, showSelectView, launchNotebook }: any) => {
  return (
    <SParent>
      <SContainer>
        <SCardHeader>
          <SHeading>Notebooks</SHeading>
          <SButtonContainer>
            <SLabelerButton onClick={launchNotebook}>
              {"Launch Jupyter Notebook"}
            </SLabelerButton>

            <SLabelerButton onClick={showSelectView}>
              {"Select Notebook"}
            </SLabelerButton>
          </SButtonContainer>
        </SCardHeader>

        <SDescription>{"These are the Jupyter Notebooks currently in this repository.  Launch Jupyter Notebook, or upload new .py or .ipynb files to add additional files."}</SDescription>

        <SFlexColContainer>
          <SFilesContainer>
            <SFilesHeading>{"Notebooks heading"}</SFilesHeading>

            <SUserRow className="th subset-table-header">
              <SFieldValue>Name</SFieldValue>
              {/* <SFieldValue>Last Updated</SFieldValue> */}
              <SFieldValue>Notebook ID</SFieldValue>
            </SUserRow>
            {notebooks &&
              notebooks.length > 0 &&
              notebooks.map((file: any, index: number) => {
           
                  return <FileRow key={index} item={file} />
                
              })}
          </SFilesContainer>
        </SFlexColContainer>
      </SContainer>
    </SParent>
  )
}

export default RepoViewNotebook
