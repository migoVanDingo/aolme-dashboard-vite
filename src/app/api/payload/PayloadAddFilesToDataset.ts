interface IInput {
  setId: string
  setName: string
  numFiles?: number
  selected?: boolean
  type: string
}

export interface IPayloadAddFilesToDataset {
  user_id: string
  dataset_id: string
  files: any[]
}

export const PayloadAddFilesToDataset = (
  userId: string,
  datasetId: string,
  files: IInput[]
) : IPayloadAddFilesToDataset => {
  const payload = {
    user_id: userId,
    dataset_id: datasetId,
    files: files.map((file: IInput) => {
      return {
        set_id: file.setId,
        setName: file.setName,
        type: file.type,
      }
    }),
  }

  return payload
}
