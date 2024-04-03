import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/containers/FlexContainers"
import { DatasetAPI } from "../../../api/DatasetAPI"

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
  border: 1px solid blue;
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
    const uniqueArr = subsetFiles.filter((file: any, index: number) => {
      return subsetFiles.indexOf(file) === index
    })
    setHeadingArr(uniqueArr)
    setLoopLength(uniqueArr.length)
  }, [subsetFiles])

  return (
    <SContainer>
      <SHeading>Title: {subset.name}</SHeading>
      {subset.updated_at !== null ? (
        <SLastUpdated>Last Updated: {subset.updated_at}</SLastUpdated>
      ) : (
        <SLastUpdated>Created: {subset.created_at}</SLastUpdated>
      )}
      <SDescription>{subset.description}</SDescription>

      {
        headingArr.length > 0 && headingArr.map((heading: string) => {
            return (
                
            )
        })
      }
    </SContainer>
  )
}

export default SubsetCard
