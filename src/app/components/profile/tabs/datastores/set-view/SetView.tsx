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

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  grid-template-rows: 140px auto;
  grid-template-areas:
    "top"
    "bottom";
`

const SetView = ({ handleGoBack, fileSet, scrollableRef, scrollTop }: any) => {


  const { labelProjects } = useSetLabelProjects(fileSet.set_id)
  const { setFiles, setMetadata } = useSetFiles(fileSet.set_id)

  const config = useSelector(
    (state: any) => state.datastore.storeDatastoreConfig,
  )

  const [fileConfig, setFileConfig] = React.useState<any>(null)
  const [viewOption, setViewOption] = React.useState<string>("VIEW")

  useEffect(() => {
    if (config !== null) {
      setFileConfig(config)
    }
  }, [config])

  const handlSetViewOption = (option: string) => {

    console.log('Myoption', option)
    setViewOption(option)
  }



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
        <SetViewLabelProjectsList />
      ) : viewOption === "NEW" ? (
        <CreateNewSetLabelProject scrollTop={scrollTop} fileSet={fileSet} setMetadata={setMetadata}/>
      ) : (
        <></>
      )}
    </SContainer>
  )
}

export default SetView
