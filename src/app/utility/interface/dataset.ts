export interface IDataset {
    entity_id: string
    entity_type: string
    description: string
    name: string
    owner: string
    type: string
    is_public: boolean
    repo_id?: string
    repo_item_type?: string

}

export interface ICreateSubset {
    dataset_id: string
    name: string
    description: string
    owner: string
    is_public: boolean
}

export interface ILabelSubset {
    subset_id: string
    dataset_id: string
    entity_id: string
}