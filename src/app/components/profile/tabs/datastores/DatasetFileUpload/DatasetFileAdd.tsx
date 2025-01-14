import React, { useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../../../../common/containers/FlexContainers'
import DatasetFileUpload from './DatasetFileUpload'
import DatasetFileGroupSelect from './DatasetFileGroupSelect'
import { DatastoreAPI } from '../../../../../api/DatastoreAPI'
import DatasetFileGroupList from './DatasetFileGroupList'

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: 150px;
  border-radius: ${({ theme }) => theme.container.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.color.color_3};
  margin: 10px 0;
  padding: 20px;

  &.no-padding {
    padding: 0;
    border: 1px solid ${({ theme }) => theme.color.color_2};
  }
`

const DISPLAY_SETS = 'DISPLAY-SETS'
const EMPTY_SETS = 'EMPTY-SETS'



const DatasetFileAdd = ({ handleSetUploadFiles, handleReset, inputFiles }: any) => {

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

      //Get unique set_name of files
      const setArr = files.map((file: any) => {
        const metadata = JSON.parse(file.metadata)
        const setName = metadata.set_name
        const setId = metadata.set_id
        
        let numFiles = metadata.total_in_set
        //remove leading 0 in numFiles
        if(numFiles[0] === '0'){
          numFiles = numFiles.slice(1)
        }

        return JSON.stringify({setId, setName, numFiles})

      })

      const sets = Array.from(new Set(setArr.map((set: any) => set))).map((str: any) => JSON.parse(str))

      setFileSets(sets)
      setToggle(true)


  }

  return (
    <SContainer className={toggle ? 'no-padding' : ''}>
        {/* <DatasetFileUpload
            setUploadFiles={handleSetUploadFiles}
            handleReset={handleReset}
            inputFiles={inputFiles}
          /> */}
          {
            toggle && fileSets.length > 0 ? (
            <DatasetFileGroupList 
              sets={fileSets}
              handleToggle={handleToggle}
              />
          )
            : (
              <DatasetFileGroupSelect
                handleSubmit={handleSubmit}
              />
            ) 
          }
          
      

    </SContainer>
  )
}

export default DatasetFileAdd