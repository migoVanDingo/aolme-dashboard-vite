import { Requests } from "./Requests"

interface IUserLogin{
    email: string,
    password: string

}

interface IUpdateToken {
    token: string
}

export class AuthAPI {

    public static async authenticate(payload: IUserLogin){
        return await Requests.doPost(payload, '/api/auth/login')

    }

    public static async register(payload: any){
        return await Requests.doPost(payload, '/api/auth/register')

    }

    public static async updateToken(payload: IUpdateToken){
        return await Requests.doPost(payload, '/api/auth/token')
    }


}