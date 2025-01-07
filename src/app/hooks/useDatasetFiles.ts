import { useEffect, useState } from "react";
import { DatasetAPI } from "../api/DatasetAPI";

export const useDatasetFiles = (datasetId: string) => {
    const [datasetFiles, setDatasetFiles] = useState<any[]>([])
    const [selectedDatasetFile, setSelectedDatasetFile] = useState<string>("")
  
    useEffect(() => {
        const init = () => {
            datasetId && datasetId !== "" && getDatasetFiles()
            setSelectedDatasetFile("")
        }

        return init()
    }, [datasetId]);

    const getDatasetFiles = async () => {
        const datasetFiles = await DatasetAPI.getDatasetFiles({ dataset_id: datasetId })

        //console.log("useDatasetFiles.ts -- getDatasetFiles() -- datasetFiles: ", datasetFiles)
        setDatasetFiles(datasetFiles)
        
        // if(selectedDatasetFile === null && datasetFiles.length > 0){
        //     setSelectedDatasetFile(datasetFiles[0])
        // }
    }

    return {
        datasetFiles,
        selectedDatasetFile,
        setSelectedDatasetFile
    }
}