import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import FileUpload from "../../../common/inputs/file-upload/FileUpload"
import EmptyDatasetContainer from "./dataset-file-upload/EmptyDatasetContainer"
import DatasetFileSetList from "./DatasetFileSetList"
import SetLabelProjectView from "./set-view/SetView"
import SetView from "./set-view/SetView"

const SContainer = styled.div`
  width: 100%;
  height: 100%;
`

const DatasetFiles = ({ list, selectedItem }: any) => {
  const [uniqueSets, setUniqueSets] = React.useState<any>([])
  const [projectSetView, setProjectSetView] = React.useState<any>(null)

  useEffect(() => {
    const init = () => {
      if (list && list.length > 0) {
        parseList(list)
      }
    }
    return init()
  }, [list])

  const parseList = (list: any[]) => {
    // List is populated in the root component for the route. ProDatastoresDash.
    // This function parses that list, extracts the data and generates the file sets from the individual files.
    list = list.sort(
      (a: any, b: any) =>
        new Date(JSON.parse(a.metadata).date).getTime() -
        new Date(JSON.parse(b.metadata).date).getTime(),
    )

    const sets = Array.from(
      new Set(
        list.map((item: any) => {
          return JSON.stringify({
            set_id: JSON.parse(item.metadata).set_id,
            set_name: JSON.parse(item.metadata).set_name,
            numFiles: JSON.parse(item.metadata).total_in_set.replace(/^0+/, ""),
          })
        }),
      ),
    ).map((str: any) => JSON.parse(str))
    //console.log("Unique Sets:", sets)
    setUniqueSets([...sets])
  }

  const handleViewProjects = (fileSet: any) => {
    //console.log("here: ", fileSet)
    setProjectSetView(fileSet)
  }

  const handleViewFileSetList = () => {
    setProjectSetView(null)
  }

  const scrollableRef = useRef<HTMLDivElement>(null) as any

  const scrollTop = () => {
    if (scrollableRef.current) {
      const topPosition = scrollableRef.current.getBoundingClientRect().top
      scrollableRef.current.scrollTop -= topPosition
    }
  }

  if (projectSetView !== null) {
    return (
      <SContainer>
        <SetView
          handleGoBack={handleViewFileSetList}
          fileSet={projectSetView}
          scrollTop={scrollTop}
          scrollableRef={scrollableRef}
        />
      </SContainer>
    )
  } else {
    return (
      <SContainer>
        {list && list.length > 0 && uniqueSets && uniqueSets.length > 0 ? (
          <DatasetFileSetList
            list={list}
            sets={uniqueSets}
            handleViewProjects={handleViewProjects}
          />
        ) : (
          <EmptyDatasetContainer selectedItem={selectedItem} />
        )}
      </SContainer>
    )
  }
}

export default DatasetFiles
