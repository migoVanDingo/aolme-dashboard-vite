import { Requests } from "./Requests"

export class ConfigAPI {
    public static async getConfigList() {
        return await Requests.doGet("/api/config", import.meta.env.VITE_BACKEND_PORT)
    }
    public static async getConfigById(configId: string) {
        return await Requests.doGet("/api/config/" + configId, import.meta.env.VITE_BACKEND_PORT)
    }
    public static async getConfigListByUserId(userId: string) {
        return await Requests.doGet("/api/config/user/" + userId, import.meta.env.VITE_BACKEND_PORT)
    }
    public static async getConfigListByEntity(entityId: string) {
        return await Requests.doGet("/api/config/entity/" + entityId, import.meta.env.VITE_BACKEND_PORT)
    }
    public static async deleteConfig(configId: string) {
        return await Requests.doDelete("/api/config/" + configId, import.meta.env.VITE_BACKEND_PORT)
    }
    public static async updateConfig(configId: string, payload: any) {
        return await Requests.doPatch(payload, "/api/config/" + configId, import.meta.env.VITE_BACKEND_PORT)
    }
    public static async archiveConfig(configId: string) {
        return await Requests.doDelete("/api/config/archive/" + configId, import.meta.env.VITE_BACKEND_PORT)
    }
    public static async createConfig(payload: any) {
        return await Requests.doPost(payload, "/api/config", import.meta.env.VITE_BACKEND_PORT)
    }
}