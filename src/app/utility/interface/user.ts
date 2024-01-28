export interface PayloadCreateUser {
    username: string
    email: string
    password: string
}

export interface PayloadLogin {
    email: string,
    password: string
}

export interface FormCreateProfile {
    label: string
    type: string
    inputValue: string
    error: string
    setInputValue: (a: string) => void
  }