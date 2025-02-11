import { useEffect, useState } from "react"
import { DatasetAPI } from "../api/DatasetAPI";

export const useDataset = (datastoreId: string) => {

    const [datasetList, setDatasetList] = useState<any[]>([])
    const [selectedDataset, setSelectedDataset] = useState<string>("")

    useEffect(() => {
        const init = () => {
            datastoreId && datastoreId !== "" && getDatasets()
            setSelectedDataset("")
        }

        return init()
    }, [datastoreId]);

    const handleSetSelected = (datasetId: string) => {
        sessionStorage.setItem("datasetId", datasetId)
        setSelectedDataset(datasetId)
    }

    const getDatasets = async () => {
        const datasets = await DatasetAPI.getDatasetList({ datastore_id: datastoreId })

        console.log("useDataset.ts -- getDatasets() -- datasets: ", datasets)
        setDatasetList(datasets)
        
        // if(selectedDataset === null && datasets.length > 0){
        //     setSelectedDataset(datasets[0])
        // }
    }

    return {
        datasetList,
        selectedDataset,
        setSelectedDataset,
        handleSetSelected
    }
}