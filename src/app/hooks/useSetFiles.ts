import { useEffect, useState } from "react"
import { DatasetAPI } from "../api/DatasetAPI"

export const useSetFiles = (setId: string) => {
  const [setFiles, setSetFiles] = useState<any[]>([])
  const [setMetadata, setSetMetadata] = useState<any>({})

  useEffect(() => {
    const init = () => {
      if (setId !== "") {
        getSetFiles(setId)
      }
    }

    return init()
  }, [setId])

  const getSetFiles = async (setId: string) => {
    const files = await DatasetAPI.getDatasetFilesList({ set_id: setId })

    setSetMetadata(JSON.parse(files[0].metadata))
    setSetFiles(files)
  }

  return {
    setFiles,
    setMetadata,
  }
}
