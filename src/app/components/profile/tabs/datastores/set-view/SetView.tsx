import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import {
  SFlexCol,
  SFlexRow,
  SFlexRowWrap,
} from "../../../../common/containers/FlexContainers"
import { useSetLabelProjects } from "../../../../../hooks/useSetLabelProjects"
import { useSelector } from "react-redux"
import { useSetFiles } from "../../../../../hooks/useSetFiles"
import SetViewHeader from "./SetViewHeader"
import SetViewLabelProjectsList from "./SetViewLabelProjectsList"
import CreateNewSetLabelProject from "./CreateNewSetLabelProject"
import LoadingSpinner from "../../../../common/loading/LoadingSpinner"

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  grid-template-rows: 140px auto;
  grid-template-areas:
    "top"
    "bottom";
`

const SetView = ({ handleGoBack, fileSet, scrollableRef, scrollTop, selectedItem }: any) => {


  const { labelProjects, setCurrentSetId, setDatasetId } = useSetLabelProjects()
  const { setFiles, setMetadata } = useSetFiles(fileSet.set_id)

  const config = useSelector(
    (state: any) => state.datastore.storeDatastoreConfig,
  )

  const [fileConfig, setFileConfig] = React.useState<any>(null)
  const [viewOption, setViewOption] = React.useState<string>("VIEW")
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    if (config !== null) {
      setFileConfig(config)
    }
  }, [config])

  useEffect(() => {
    const init = () => {
      if (fileSet !== null) {
        setCurrentSetId(fileSet.set_id)
      }
      if (selectedItem !== null) {
        setDatasetId(selectedItem.dataset_id)
      }
    }

    return init()
  }, [fileSet, selectedItem]);

  useEffect(() => {
    if (fileConfig && fileSet && setMetadata) {
      setLoading(false)
    }
  }, [fileConfig, fileSet, setMetadata])




  const handlSetViewOption = (option: string) => {

    console.log('Myoption', option)
    setViewOption(option)
  }

  if(!fileConfig || !fileSet || !setMetadata || loading) {
    return <LoadingSpinner message={"Loading"}/>
  } else {
    return (
      <SContainer ref={scrollableRef}>
        <SetViewHeader
          fileConfig={fileConfig}
          fileSet={fileSet}
          setMetadata={setMetadata}
          handleGoBack={handleGoBack}
          handleSetViewOption={handlSetViewOption}
        />

        {viewOption === "VIEW" ? (
          <SetViewLabelProjectsList list={labelProjects} />
        ) : viewOption === "NEW" ? (
          <CreateNewSetLabelProject scrollTop={scrollTop} fileSet={fileSet} setMetadata={setMetadata} config={config} handleSetViewOption={handlSetViewOption}/>
        ) : (
          <></>
        )}
      </SContainer>
    )
  }

}

export default SetView
