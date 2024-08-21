import { hashed } from "../utility/hash";
import { EditUser, PayloadCreateUser, PayloadLogin } from "../utility/interface/user";
import { Requests } from "./Requests"
export class UserAPI {

    public static createUser(payload: PayloadCreateUser) {
        return Requests.doPost(payload, "/api/user")
    }

    public static createOrgUser(payload: PayloadCreateUser, orgId: string) {
        return Requests.doPost(payload, "/api/user?entity_id="+orgId+"&entity_type=organization")
    }

    public static getUserByUsername(username: string){
        return Requests.doGet('/api/user?username='+username)

    }

    public static getUserById(userId: string){
        return Requests.doGet('/api/user/'+userId)

    }

    public static updateUser(payload: EditUser, userId: string){
        return Requests.doPatch(payload, '/api/user/'+userId)
    }

    public static login(payload: PayloadLogin){
        return Requests.doPost(payload, "/api/user/login")
        //return Requests.testPost()
    }
}