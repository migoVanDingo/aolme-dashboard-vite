export interface PayloadCreateUser {
    username: string
    email: string
    password: string
    ip?: string
    
}

export interface PayloadLogin {
    email: string,
    password: string
}

export interface PayloadVerifyEmail {
    token: string
    user_id: string
}


export interface FormCreateProfile {
    label: string
    type: string
    inputValue: string
    error: string
    setInputValue: (a: string) => void
  }

export interface EditUser {
    user_id: string
    roles?: string
    email?: string
    username?:string
    user_status?: string
    resetPw?: boolean
    entity_user_id: string

}

export interface FormEditUser {
    label: string
    type: string
    inputValue?: string
    selectOptions?: string[]
    error: string
    setInputValue?: (a: string) => void
    setOptions?: (a: string[]) => void
}