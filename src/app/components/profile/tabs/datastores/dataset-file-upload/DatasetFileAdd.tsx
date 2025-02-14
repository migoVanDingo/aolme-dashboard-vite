import { useState } from "react"
import styled from "styled-components"
import { DatastoreAPI } from "../../../../../api/DatastoreAPI"
import { SFlexCol } from "../../../../common/containers/FlexContainers"
import DatasetFileGroupList from "./DatasetFileGroupList"
import DatasetFileGroupSelect from "./DatasetFileGroupSelect"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: 150px;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};

  margin: 0px 0;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.color_2_5};

  &.no-padding {
    padding: 0;
    border: 1px solid ${({ theme }) => theme.color.color_2};
  }
`

const DISPLAY_SETS = "DISPLAY-SETS"
const EMPTY_SETS = "EMPTY-SETS"

const DatasetFileAdd = ({}: any) => {
  const [fileSets, setFileSets] = useState<any[]>([])
  const [toggle, setToggle] = useState<boolean>(false)

  const handleToggle = (toggle: string) => {
    setToggle(!toggle)
  }

  const handleSubmit = async (props: any) => {
    // Get files from datastore based on form input in component DatasetFileGroupSelect
    let files = await DatastoreAPI.searchDatastoreFiles(props)

    // Only want datastore files, so filter out those with dataset_id
    files = files.filter((file: any) => file.dataset_id === null)

    files = files.sort((a: any, b: any) => {
      return (
        new Date(JSON.parse(a.metadata).date).getTime() -
        new Date(JSON.parse(b.metadata).date).getTime()
      )
    })

    //Get unique set_name of files
    const setArr = files.map((file: any) => {
      const metadata = JSON.parse(file.metadata)
      const setName = metadata.set_name
      const setId = metadata.set_id
      const type = file.file_type

      let num_files = metadata.total_in_set
      //remove leading 0 in num_files
      if (num_files[0] === "0") {
        num_files = num_files.slice(1)
      }
      num_files = parseInt(num_files)

      return JSON.stringify({ setId, setName, num_files, type })
    })

    //Sets consist of unique set_name, for each set there are multiple files so this cuts down on the result list presented to the user. Each of these are unique, objects so comparing them by JSON string is necessary, hence this complicated line of code.
    const sets = Array.from(new Set(setArr.map((set: any) => set))).map(
      (str: any) => JSON.parse(str),
    )

    setFileSets(sets)
    setToggle(true)
  }

  return (
    <SContainer className={toggle ? "no-padding" : ""}>
      {/* <DatasetFileUpload
            setUploadFiles={handleSetUploadFiles}
            handleReset={handleReset}
            inputFiles={inputFiles}
          /> */}
      {toggle && fileSets.length > 0 ? (
        <DatasetFileGroupList sets={fileSets} handleToggle={handleToggle} />
      ) : (
        <DatasetFileGroupSelect handleSubmit={handleSubmit} />
      )}
    </SContainer>
  )
}

export default DatasetFileAdd
