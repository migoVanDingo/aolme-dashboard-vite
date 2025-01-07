import { useEffect, useState } from "react"
import { DatastoreAPI } from "../api/DatastoreAPI";

export const useDatastore = (userId: string, datastoreId: string) => {

    const [datastoreList, setDatastoreList] = useState<any[]>([])
    const [selectedDatastore, setSelectedDatastore] = useState<string>(datastoreId || "")

    useEffect(() => {
        const init = () => {
            userId && userId !== "" && getDatastores()
        }

        return init()
    }, [userId]);

    useEffect(() => {
        const init = () => {
            console.log('datastoreId', datastoreId)
            datastoreId && datastoreId !== "" && setSelectedDatastore(datastoreId)
        }

        return init()
    }, [datastoreId]);

    const getDatastores = async () => {
        const datastores = await DatastoreAPI.getDatastoreList({ user_id: userId })
        // console.log("useDatastore.ts -- getDatastores() -- datastores: ", datastores)
        setDatastoreList(datastores)

        /* if(selectedDatastore === "" && datastores.length > 0){
            setSelectedDatastore(datastores[0].datastore_id)
        } */
    }

    return {
        datastoreList,
        selectedDatastore,
        setSelectedDatastore
    }
}