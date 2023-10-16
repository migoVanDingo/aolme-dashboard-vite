export interface PayloadCreateUser {
    username: string
    email: string
    password: string
}

export interface PayloadLogin {
    username: string,
    password: string
}