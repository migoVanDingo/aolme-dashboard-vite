export interface ICreateRepository {
    owner: string
    entity_id: string
    entity_type: string
    name: string   
    description: string
    is_public: boolean
    created_by: string
}

export interface IAddRepoItem {
    file_id: string
    file_type: string
    user_id: string

}

export interface FormCreateRepo {
    label: string
    type: string
    inputValue: string
    error: string
    setInputValue: (a: string) => void
}

export interface FormEditRepo {
    label: string
    type: string
    inputValue: string
    error: string
    setInputValue: (a: string) => void
}


