import { useEffect, useState } from "react"
import { DatastoreAPI } from "../api/DatastoreAPI";

export const useDatastore = (userId: string, datastoreId: string) => {

    const [datastoreList, setDatastoreList] = useState<any[]>([])
    const [selectedDatastore, setSelectedDatastore] = useState<string>(datastoreId || "")
    const [datastoreConfig, setDatastoreConfig] = useState<any>({})

    useEffect(() => {
        const init = () => {
            userId && userId !== "" && getDatastores()
        }

        return init()
    }, [userId]);

    useEffect(() => {
        const init = () => {
            console.log('datastoreId', datastoreId)
            if(datastoreId && datastoreId !== ""){
                setSelectedDatastore(datastoreId)
                getDatastoreConfig(datastoreId)
            }
        }

        return init()
    }, [datastoreId]);

    const getDatastores = async () => {
        const datastores = await DatastoreAPI.getDatastoreList({ user_id: userId })
        // console.log("useDatastore.ts -- getDatastores() -- datastores: ", datastores)
        setDatastoreList(datastores)
    }

    const getDatastoreConfig = async (datastoreId: string) => {
        const config = await DatastoreAPI.getDatastoreConfig(datastoreId)
        //console.log("useDatastore.ts -- getDatastoreConfig() -- config: ", config)
        setDatastoreConfig(config.sort((a: any, b: any) => a.order_index - b.order_index))
    }

    return {
        datastoreList,
        selectedDatastore,
        setSelectedDatastore,
        datastoreConfig
    }
}