import { useEffect, useState } from "react"
import { DatasetAPI } from "../api/DatasetAPI";

export const useDataset = (datastoreId: string) => {

    const [datasetList, setDatasetList] = useState<any[]>([])
    const [selectedDataset, setSelectedDataset] = useState<any>(null)

    useEffect(() => {
        const init = () => {
            datastoreId && datastoreId !== "" && getDatasets()
        }

        return init()
    }, [datastoreId]);

    const getDatasets = async () => {
        const datasets = await DatasetAPI.getDatasetList({ datastore_id: datastoreId })
        setDatasetList(datasets)
        
        if(selectedDataset === null && datasets.length > 0){
            setSelectedDataset(datasets[0])
        }
    }

    return {
        datasetList,
        selectedDataset,
        setSelectedDataset
    }
}