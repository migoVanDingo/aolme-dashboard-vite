import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import { DatasetAPI } from "../../../api/DatasetAPI"
import SubsetItemRow from "./SubsetItemRow"
import { SUserCol, SUserRow } from "../../styled/SOrganization"

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

const SubsetCard = ({ subset, dataset }: any) => {
  const [subsetFiles, setSubsetFiles] = useState<any[]>([])
  const [loopLength, setLoopLength] = useState<number>(0)
  const [headingArr, setHeadingArr] = useState<any[]>([])

  useEffect(() => {
    DatasetAPI.getSubsetItemList(subset.subset_id)
      .then((res: any) => {
        console.log("SubsetCard::DatasetAPI.getSubsetItemList::res::", res)

        setSubsetFiles(res.data)
      })
      .catch((err: any) =>
        console.error("SubsetCard::DatasetAPI.getSubsetItemList::error::", err),
      )
  }, [subset])

  useEffect(() => {
    let uniqueArr: string[] = []
    const files = subsetFiles.map((file: any, index: number) => {
      if (!uniqueArr.includes(file.type)) {
        uniqueArr.push(file.type)
      }
      return
    })

    console.log("SubsetCard::uniqueArr::", uniqueArr)

    setHeadingArr(uniqueArr)
    setLoopLength(uniqueArr.length)
  }, [subsetFiles])

  return (
    <SContainer>
      <SHeading>Title: {subset.name}</SHeading>
      <SLastUpdated>ID: {subset.subset_id}</SLastUpdated>
      {subset.updated_at !== null ? (
        <SLastUpdated>Last Updated: {subset.updated_at}</SLastUpdated>
      ) : (
        <SLastUpdated>Created: {subset.created_at}</SLastUpdated>
      )}
      
      <SDescription>{subset.description}</SDescription>

      <SFlexColContainer>
        {headingArr.length > 0 &&
          headingArr.map((heading: any, index: number) => {
            return (
              <SFilesContainer>
                <SFilesHeading key={index}>{heading}</SFilesHeading>


                <SUserRow className="th">
                  <SFieldValue>Name</SFieldValue>
                  <SFieldValue>Item ID</SFieldValue>
                </SUserRow>
                {subsetFiles && subsetFiles.length > 0 &&
                  subsetFiles.map((file: any, index: number) => {
                    if (file.type === heading) {
                      return <SubsetItemRow key={file.subset_item_id} item={file} />
                    }
                  })}
              </SFilesContainer>
            )
          })}
      </SFlexColContainer>
    </SContainer>
  )
}

export default SubsetCard
