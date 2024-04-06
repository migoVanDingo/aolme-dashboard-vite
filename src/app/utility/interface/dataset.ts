export interface IDataset {
    entity_id: string
    entity_type: string
    description: string
    name: string
    owner: string
    type: string
    is_public: boolean

}

export interface ICreateSubset {
    dataset_id: string
    name: string
    description: string
    owner: string
    is_public: boolean
}