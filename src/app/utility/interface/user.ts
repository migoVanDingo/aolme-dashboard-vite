export interface PayloadCreateUser {
    username: string
    email: string
    password: string
}

export interface PayloadLogin {
    email: string,
    password: string
}