import { d } from "vitest/dist/types-e3c9754d.js"

interface IInput {
    fileSet: any
    userId: string
    datasetId: string
    datastoreId: string
    metadata: any
    project_info: any
    config_order: any
}

export interface IPayloadCreateLabelProject {
    user_id: string
    dataset_id: string
    datastore_id: string
    set_id: string
    metadata: any

}

export const PayloadCreateLabelProject = ({
    userId,
    datasetId,
    datastoreId,
    fileSet,
    config_order,
    metadata,
    project_info
}: IInput): IPayloadCreateLabelProject => {
    const payload = {
        job_name: "LABEL_PROJECT_INITIALIZATION",
        user_id: userId,
        dataset_id: datasetId,
        datastore_id: datastoreId,
        set_id: fileSet["set_id"],
        config_order,
        ...project_info,
        ...metadata
    }

    return payload
}