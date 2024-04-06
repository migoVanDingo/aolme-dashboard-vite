export interface ICreateProject {
    name: string,
    description: string,
    owner: string,
    created_by: string,
    last_updated_by: string
}

export interface ISyncImportStorage {
    title: string
    description: string
    use_blob_urls: boolean
    repoId: string
    entity_id: string
}
