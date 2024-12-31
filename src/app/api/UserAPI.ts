import { hashed } from "../utility/hash";
import { EditUser, PayloadCreateUser, PayloadLogin } from "../utility/interface/user";
import { Requests } from "./Requests"
export class UserAPI {

    public static createUser(payload: PayloadCreateUser) {
        return Requests.doPost(payload, "/api/user", import.meta.env.VITE_BACKEND_PORT)
    }

    public static createOrgUser(payload: PayloadCreateUser, orgId: string) {
        return Requests.doPost(payload, "/api/user?entity_id="+orgId+"&entity_type=organization", import.meta.env.VITE_BACKEND_PORT)
    }

    public static getUserByUsername(username: string){
        return Requests.doGet('/api/user?username='+username, import.meta.env.VITE_BACKEND_PORT)

    }

    public static getUserById(userId: string){
        return Requests.doGet('/api/user/'+userId, import.meta.env.VITE_BACKEND_PORT)

    }

    public static updateUser(payload: EditUser, userId: string){
        return Requests.doPatch(payload, '/api/user/'+userId, import.meta.env.VITE_BACKEND_PORT)
    }

    public static login(payload: PayloadLogin){
        return Requests.doPost(payload, "/api/user/login", import.meta.env.VITE_BACKEND_PORT)
        //return Requests.testPost()
    }
}