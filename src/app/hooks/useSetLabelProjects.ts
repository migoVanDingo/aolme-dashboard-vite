import { useEffect, useState } from "react"
import { LabelStudioAPI } from "../api/labeler/LabelStudioAPI"

export const useSetLabelProjects = () => {
  const [currentSetId, setCurrentSetId] = useState<string>("")
  const [labelProjects, setLabelProjects] = useState<any[]>([])
  const [datasetId, setDatasetId] = useState<string>("")


  useEffect(() => {
    const init = () => {
      console.log('currentSetId: ', currentSetId)
      console.log('datasetId: ', datasetId)
      if (currentSetId !== "" && datasetId !== "") {
        getLabelProjects(currentSetId, datasetId)
      }
    }

    return init()
  }, [currentSetId, datasetId])

  const handleRefreshLabelProjects = () => {
    if(currentSetId !== "" && datasetId !== "") {
      getLabelProjects(currentSetId, datasetId)
    }
    
  }

  const getLabelProjects = async (set_id: string, dataset_id: string) => {
    LabelStudioAPI.getLabelProjectList({ set_id, dataset_id })
    .then((res: any) => {
      console.log('getLabelProjects response: ', res.data)
      setLabelProjects(res.data)
    })
    .catch((err: any) => console.error("Hook: useSetLabelProjects: getLabelProjects: ", err))
  }

  return {
    labelProjects,
    handleRefreshLabelProjects,
    setCurrentSetId,
    setDatasetId
  }
}
