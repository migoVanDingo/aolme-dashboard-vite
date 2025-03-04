import { hashed } from "../utility/hash";
import { EditUser, PayloadCreateUser, PayloadLogin } from "../utility/interface/user";
import { Requests } from "./Requests"
import Constant from "../utility/constant"
import { isInputElement } from "react-router-dom/dist/dom";
export class UserAPI {

    public static createUser(payload: PayloadCreateUser) {
        return Requests.doPost(payload, "/api/user", Constant.USER_SERVICE_PORT)
    }

    public static createOrgUser(payload: PayloadCreateUser, orgId: string) {
        return Requests.doPost(payload, "/api/user?entity_id="+orgId+"&entity_type=organization", Constant.USER_SERVICE_PORT)
    }

    public static getUserByUsername(username: string){
        return Requests.doGet('/api/user?username='+username, Constant.USER_SERVICE_PORT)

    }

    public static getUserById(userId: string){
        const params = "?user_id="+userId
        return Requests.doGet('/api/user' + params, Constant.USER_SERVICE_PORT)

    }

    public static updateUser(payload: EditUser, userId: string){
        return Requests.doPatch(payload, '/api/user/'+userId, Constant.USER_SERVICE_PORT)
    }

    public static register(payload: PayloadCreateUser){
        return Requests.doPost(payload, "/api/user/register", Constant.USER_SERVICE_PORT)
    }

    public static login(payload: PayloadLogin){
        return Requests.doLogin(payload, "/api/user/login", Constant.USER_SERVICE_PORT)
        //return Requests.testPost()
    }

    public static verifyEmail(token: string){
        return Requests.doGet('/api/user/account/verify?token='+token, Constant.USER_SERVICE_PORT)
    }

    public static loginWithGithub(){
        window.location.href = "http://localhost:5014/api/github/login";
    }

    public static getAccessToken(){
        return Requests.doGet('/api/auth/access_token', Constant.USER_SERVICE_PORT)
    }

    public static getGithubToken(){
        return Requests.doGet('/api/auth/github_token', Constant.USER_SERVICE_PORT)
    }

    public static getGithubUserRepos(){
        return Requests.doGet('/api/github/repos', Constant.USER_SERVICE_PORT)
    }
}
