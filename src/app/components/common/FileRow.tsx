import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import styled from "styled-components"


import { s } from "vitest/dist/types-e3c9754d.js"
import { SUserRow } from "../styled/SOrganization"
import { SFlexRow } from "./containers/FlexContainers"

const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.color_6};
  font-size: 1.1rem;
  &:hover {
    color: #33adff;
    cursor: pointer;
  }

  &:active {
    color: #00ffbb;
  }
`

const SUserRowChild = styled(SUserRow)`
  width: 100%;
  background: rgb(24, 24, 24);
  background: linear-gradient(
    0deg,
    rgba(24, 24, 24, 1) 0%,
    rgba(32, 32, 32, 1) 100%
  );

  &.new-guy {
    background-color: ${({ theme }) => theme.color.color_2};
    padding: 4px;
    border: 2px solid red;
  }
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

const FileRow = ({ item, last = false }: any) => {

    const [fileId, setFileId] = useState<string>("")

    useEffect(() => {
        const init = () => {
            if(item){
                determineFileId()
            }
        }

        //return init()
    }, [item]);

    const determineFileId = () => {
        switch(item.file_type){
            case "NOTEBOOK":
                setFileId(item.notebook_id)
                break;
            
            case "MODULE":
                setFileId(item.module_id)
                break;

            case "CONFIG":
                setFileId(item.config_id)
                break;

            case "DATASET":
                setFileId(item.dataset_id)
                break;
            
            default:
                break;
        }
    }

  return (
    <SUserRowChild className={last ? "subset-table-bottom" : ""}>
      <SFieldValue>{item && item.name}</SFieldValue>
      {/* <SFieldValue>{item.updated_at ? item.updated_at : item.created_at}</SFieldValue> */}
      <SFieldValue>{fileId}</SFieldValue>
    </SUserRowChild>
  )
}

export default FileRow
