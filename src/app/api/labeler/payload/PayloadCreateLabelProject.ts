import { d } from "vitest/dist/types-e3c9754d.js"

interface IInput {
    fileSet: any
    userId: string
    datasetId: string
    datastoreId: string
    metadata: any
    projectInfo: any
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
    metadata,
    projectInfo
}: IInput): IPayloadCreateLabelProject => {
    const payload = {
        job_name: "LABEL_PROJECT_INITIALIZATION",
        user_id: userId,
        dataset_id: datasetId,
        datastore_id: datastoreId,
        set_id: fileSet["set_id"],
        project_info: {
            name: projectInfo["projectName"],
            description: projectInfo["description"],
            instructions: projectInfo["instructions"],
            fps: projectInfo["fps"],
            labels: projectInfo["labels"]
        },
        metadata: {
            cohort: metadata["cohort"],
            level: metadata["level"],
            school: metadata["school"],
            date: metadata["date"],
            group_name: metadata["group_name"],
            facilitator: metadata["facilitator"],
            quality: metadata["quality"],
            num_files: parseInt(fileSet["numFiles"]),
            set_id: fileSet["set_id"],
            set_name: fileSet["set_name"],
        }
        

    }

    return payload
}