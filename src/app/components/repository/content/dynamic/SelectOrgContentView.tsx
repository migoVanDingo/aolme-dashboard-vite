import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol, SFlexRow } from '../../../common/containers/FlexContainers'
import { DatasetAPI } from '../../../../api/DatasetAPI'
import { useSelector } from 'react-redux'
import { ModulesAPI } from '../../../../api/ModulesAPI'
import { NotebookAPI } from '../../../../api/NotebookAPI'
import { RepoAPI } from '../../../../api/RepoAPI'

const SContainer = styled(SFlexCol)`
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  align-items: flex-start;
  margin: auto;
`

const SHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 200;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.color.color_6};
`
const SPara = styled.p`
  padding: 10px 0;
  margin: 0;
  font-size: 0.95rem;
  line-height: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.color_6};
`

const SButton = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  font-size: 1rem;
  font-weight: 200;
  width: 300px;
  color: ${({ theme }) => theme.color.color_6};
  background-color: ${({ theme }) => theme.color.color_2};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.accent.color_1};
  }

  &.small {
    width: 140px;
    font-size: 0.8rem;
  }
`

const SButtonContainer = styled(SFlexRow)`
  gap: 20px;
  padding: 0;
  margin: 0 0 0 auto;

`

const SSelect = styled.select`
  width: 500px;
  height: 35px;
  background-color: ${({ theme }) => theme.color.color_2};
  color: ${({ theme }) => theme.color.color_6};
  border: none;
  padding: 10px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
`
const SelectOrgContentView = ({ 
    menuOption,
    goEmptyContentMenu,
    hideSelectView,
    triggerReload
}: any) => {

    const { repoEntity, repoId, userId } = useSelector((state: any) => state)
    const [heading, setHeading] = useState<string>("")
    const [contentList, setContentList] = useState<any[]>([])
    const [selectedContent, setSelectedContent] = useState<any>(null)
    const [selectedId, setSelectedId] = useState<string>("")



    useEffect(() => {
      const init = () => {
        
        createHeading()
        getContentByEntity()
      }

        return init()
    }, [menuOption])

    function getContentByEntity() {
      switch (menuOption) {
        case "DATASET":
          return DatasetAPI.getDatasetListByEntity(repoEntity)
          .then((res: any) => {
            console.log("SelectOrgContentView::getContentByEntity::res::", res.data)
            setContentList(res.data)
          })
          .catch((err: any) => console.error("SelectOrgContentView::getContentByEntity::error::", err))

        case "MODULE":
          return ModulesAPI.getModuleListByEntity(repoEntity)
          .then((res: any) => {
            console.log("SelectOrgContentView::getContentByEntity::res::", res.data)
            setContentList(res.data)
          })
          .catch((err: any) => console.error("SelectOrgContentView::getContentByEntity::error::", err))
     
        case "CONFIG":
          return ModulesAPI.getModuleListByEntity(repoEntity)
          .then((res: any) => {
            console.log("SelectOrgContentView::getContentByEntity::res::", res.data)
            setContentList(res.data)
          })
          .catch((err: any) => console.error("SelectOrgContentView::getContentByEntity::error::", err))

        case "NOTEBOOK":
          return NotebookAPI.getNotebookListByEntity(repoEntity)
          .then((res: any) => {
            console.log("SelectOrgContentView::getContentByEntity::res::", res.data)
            setContentList(res.data)
          })
          .catch((err: any) => console.error("SelectOrgContentView::getContentByEntity::error::", err))
        default:
          console.log("SelectOrgContentView::getContentByEntity::default::")
          return ""
      }
    }

    const createHeading = () => {
      const lowercase = menuOption.toLowerCase()
      const firstLetter = lowercase.charAt(0).toUpperCase()
      const rest = lowercase.slice(1)

      setHeading(firstLetter + rest)
    }

    const handleChange = (e: any) => {
      console.log("SelectOrgContentView::handleChange::e.target.value::", e.target.value)
      setSelectedId(e.target.value)
      setSelectedContent(contentList.find((item: any) => item.dataset_id === selectedId))
    }
    const handleSelectContent = () => {
      console.log("SelectOrgContentView::handleSelectContent::selectedId::", selectedId)
      RepoAPI.checkAddUpdateRepoItem(repoId, {
        file_id: selectedId,
        file_type: menuOption,
        user_id: userId,
      })
      .then((res: any) => {
        console.log("SelectOrgContentView::handleSelectContent::res::", res)
        triggerReload()
      })
      .catch((err: any) => console.error("SelectOrgContentView::handleSelectContent::error::", err))
    }

  return (
    <SContainer>

          <SHeading>Select Organization {heading}</SHeading>
          <SSelect
            onChange={(e: any) => handleChange(e)}
            defaultValue={selectedContent && selectedContent}
            value={selectedId && selectedId}
          >
            <option value="DEFAULT">Select a {menuOption && menuOption.toLowerCase()}</option>
            {contentList && contentList.length > 0 ? contentList.map((option: any, index: number) => {
              return (
                <option key={index} value={option.dataset_id}>
                  {option.name}
                </option>
              )
            }) : <option value="NO_DATA">No organization {menuOption.toLowerCase()}s exist.</option>
          }
          </SSelect>
          <SButtonContainer>
            <SButton onClick={goEmptyContentMenu} className="small">
              Cancel
            </SButton>
            <SButton onClick={handleSelectContent} className="small">
              Select
            </SButton>
          </SButtonContainer>

    </SContainer>
  )
}

export default SelectOrgContentView