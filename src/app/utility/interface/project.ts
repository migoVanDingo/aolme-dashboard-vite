export interface ICreateProject {
    name: string,
    description: string,
    owner: string,
    created_by: string,
    last_updated_by: string
}

export interface ISyncImportStorage {
    project_id: string
    local_storage_id: string
}