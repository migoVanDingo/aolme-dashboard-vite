import { Requests } from "./Requests"

export default class EntityUserAPI {

    public static async insertEntityUser(payload: any) {
        return await Requests.doPost(payload, "/api/entity-user")
    }

    public static async getEntityUserById(entityUserId: string) {
        return await Requests.doGet('/api/entity-user/' + entityUserId)
    }

    public static async getUserListByEntityId(entityId: string) {
        return await Requests.doGet('/api/entity-user/entity/' + entityId)
    }

    public static async getEntityListByUserId(userId: string) {
        return await Requests.doGet('/api/entity-user/user/' + userId)
    }

    public static async updateEntityUser(payload: any) {
        return await Requests.doPut(payload, "/api/entity-user")
    }

    public static async deleteEntityUser(entityUserId: string) {
        return await Requests.doDelete('/api/entity-user/' + entityUserId)
    }

    public static async deleteEntityUserByUserId(userId: string) {
        return await Requests.doDelete('/api/entity-user?userId=' + userId)
    }
    
}