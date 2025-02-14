import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouteLoaderData } from "react-router-dom"
import styled from "styled-components"
import {
  SFlexCol,
  SFlexRowWrap
} from "../../common/containers/FlexContainers"
import CreateDataset from "./CreateDataset"
import DatasetCard from "./DatasetCard"
import DashboardHeader from "./header/DashboardHeader"

const SContainer = styled(SFlexCol)`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  align-items: flex-start;
`

const SWrapContainer = styled(SFlexRowWrap)`
  width: 100%;
  gap: 35px;
  padding: 10px;
  box-sizing: border-box;
`

const DatasetDashboard = () => {
  const { loaderOrgDatasets } = useRouteLoaderData("org") as {
    loaderOrgDatasets: any
  }
  const [datasets, setDatasets] = useState<any[]>(loaderOrgDatasets)

  const [hover, setHover] = useState(false)
  const [createNewActive, setCreateNewActive] = useState(false)

  const [viewActive, setViewActive] = useState(false)
  const [viewId, setViewId] = useState<string>("")
  const [activeDataset, setActiveDataset] = useState<any>(null)

  const [trigger, setTrigger] = useState(false)

  const orgId = useSelector((state: any) => state.org.storeOrgId)
  const userId = useSelector((state: any) => state.user.storeUserId)

  const mouseOver = () => setHover(true)
  const mouseOut = () => setHover(false)

  const handleShowView = () => setViewActive(true)
  const handleHideView = () => setViewActive(false)

  const handleShowCreateView = () => {
    mouseOut()
    setCreateNewActive(true)
  }
  const handleHideCreateView = () => setCreateNewActive(false)

  const triggerRender = () => {
    setTrigger(!trigger)
    setCreateNewActive(false)
  }

  useEffect(() => {
    const init = () => {
      // Load datasets
      if (datasets === undefined || datasets.length === 0) {
        loadDatasets()
      }
    }
    //return init()
  }, [])

  useEffect(() => {
    //return loadDatasets()
  }, [trigger])

  useEffect(() => {
    if (viewId !== "" && datasets) {
      return handleSetActiveDataset()
    }
  }, [viewId])

  const handleSetActiveDataset = () => {
    setActiveDataset(
      datasets?.find((dataset: any) => dataset.dataset_id === viewId),
    )
  }

  const loadDatasets = () => {
/*     DatasetAPI.getDatasetListByEntity(orgId ? orgId : userId)
      .then((res: any) => {
        console.log("Datasets: ", res.data)
        setDatasets(res.data)
      })
      .catch((err: any) => {
        console.log(err)
      }) */
  }

  const handleSelectDataset = (datasetId: string) => {
    console.log("Selected Dataset: ", datasetId)
    setViewId(datasetId)
    handleShowView()
  }

  if (createNewActive) {
    return (
      <SContainer>
        <CreateDataset
          trigger={triggerRender}
          hideCreateNew={handleHideCreateView}
        />
      </SContainer>
    )
  
  } else {
    return (
      <SContainer>
        <DashboardHeader
          handleCreateNew={handleShowCreateView}
          hover={hover}
          mouseOver={mouseOver}
          mouseOut={mouseOut}
          heading={"Dataset Dashboard"}
          type={"Dataset"}
        />

        <SWrapContainer>
          {datasets &&
            datasets.length !== 0 &&
            datasets.map((dataset: any) => {
              return (
                <DatasetCard
                  selectDataset={handleSelectDataset}
                  key={dataset.dataset_id}
                  dataset={dataset}
                />
              )
            })}
        </SWrapContainer>
      </SContainer>
    )
  }
}

export default DatasetDashboard
