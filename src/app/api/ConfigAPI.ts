import { Requests } from "./Requests"

export class ConfigAPI {
    public static async getConfigList() {
        return await Requests.doGet("/api/config")
    }
    public static async getConfigById(configId: string) {
        return await Requests.doGet("/api/config/" + configId)
    }
    public static async getConfigListByUserId(userId: string) {
        return await Requests.doGet("/api/config/user/" + userId)
    }
    public static async getConfigListByEntity(entityId: string) {
        return await Requests.doGet("/api/config/entity/" + entityId)
    }
    public static async deleteConfig(configId: string) {
        return await Requests.doDelete("/api/config/" + configId)
    }
    public static async updateConfig(configId: string, payload: any) {
        return await Requests.doPatch(payload, "/api/config/" + configId)
    }
    public static async archiveConfig(configId: string) {
        return await Requests.doDelete("/api/config/archive/" + configId)
    }
    public static async createConfig(payload: any) {
        return await Requests.doPost(payload, "/api/config")
    }
}