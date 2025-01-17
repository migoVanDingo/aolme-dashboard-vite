interface IInput {
    fileSet: any
    userId: string
    datasetId: string
    metadata: any
}

export interface IPayloadCreateLabelProject {
    user_id: string
    dataset_id: string
    set_id: string
    num_files: number
    metadata: any

}

export const PayloadCreateLabelProject = ({
    userId,
    datasetId,
    fileSet,
    metadata
}: IInput): IPayloadCreateLabelProject => {
    const payload = {
        job_name: "LABEL_PROJECT_INITIALIZATION",
        user_id: userId,
        dataset_id: datasetId,
        set_id: fileSet["set_id"],
        num_files: parseInt(fileSet["numFiles"]),
        metadata: {
            set_name: fileSet["set_name"],
            cohort: metadata["cohort"],
            level: metadata["level"],
            school: metadata["school"],
            date: metadata["date"],
            group_name: metadata["group_name"],
            facilitator: metadata["facilitator"],
            quality: metadata["quality"],
        }

    }

    return payload
}