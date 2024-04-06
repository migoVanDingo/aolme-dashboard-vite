import { hashed } from "../utility/hash";
import { EditUser, PayloadCreateUser, PayloadLogin } from "../utility/interface/user";
import { Requests } from "./Requests"
export class UserAPI {

    public static async createUser(payload: PayloadCreateUser) {
        return await Requests.doPost(payload, "/api/user")
    }

    public static async createOrgUser(payload: PayloadCreateUser, orgId: string) {
        return await Requests.doPost(payload, "/api/user?entity_id="+orgId+"&entity_type=organization")
    }

    public static async getUserByUsername(username: string){
        return await Requests.doGet('/api/user?username='+username)

    }

    public static async getUserById(userId: string){
        return await Requests.doGet('/api/user/'+userId)

    }

    public static async updateUser(payload: EditUser, userId: string){
        return await Requests.doPatch(payload, '/api/user/'+userId)
    }

    public static async login(payload: PayloadLogin){
        return await Requests.doPost(payload, "/api/user/login")
    }
}