import React from 'react'
import styled from 'styled-components'
import FileUpload from '../../../common/inputs/file-upload/FileUpload'
import EmptyDatasetContainer from './DatasetFileUpload/EmptyDatasetContainer'

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    
`

const DatasetFiles = ({list, selectedItem}: any) => {
    
  return (
    <SContainer>
        {list && list.length > 0 ? list.map((item: any, index: number) => (
          <h1 key={item.file_id}>{item.file_name}</h1>
        )) : <EmptyDatasetContainer selectedItem={selectedItem}/>}
    </SContainer>
  )
}

export default DatasetFiles