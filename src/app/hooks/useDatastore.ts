import { useEffect, useState } from "react";

export const useDatastore = (datastoreId: string, subsets: any) => {

    const [subsetNames, setSubsetNames] = useState<any[]>([])

    useEffect(() => {
        const init = () => {
            if(subsets && subsets.length > 0){
                setSubsetNames(handleProcessSubsetName(subsets))
            }
        }
        return init()
    }, [subsets]);

    const handleProcessSubsetName = (subsetList: any) => {
        return subsetList.map((subset: any) => {
            const entityStrings = subset.name.split("_")
            let entityObj = {}
            entityStrings.forEach((entity: string, index: number) => {
                const field = entity.split(":")
                entityObj = {
                    ...entityObj,
                    [field[0]]: field[1]
                }
            })
            return {
                ...entityObj,
                subsetId: subset.ds_subset_id,
                type: subset.type
            }
        })

    }

    return { subsetNames }
    
}

