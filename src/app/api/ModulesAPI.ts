import { Requests } from "./Requests";

export class ModulesAPI {
    public static async createModule(payload: any) {
        return Requests.doPost(payload, "/api/module", import.meta.env.VITE_BACKEND_PORT);
    }

    public static async getModuleList() {
        return Requests.doGet("/api/module", import.meta.env.VITE_BACKEND_PORT);
    }

    public static async getModuleById(moduleId: string) {
        return Requests.doGet("/api/module/" + moduleId, import.meta.env.VITE_BACKEND_PORT);
    }

    public static async getModuleListByUserId(userId: string) {
        return Requests.doGet("/api/module/user/" + userId, import.meta.env.VITE_BACKEND_PORT);
    }

    public static async getModuleListByEntity(entityId: string) {
        return Requests.doGet("/api/module/entity/" + entityId, import.meta.env.VITE_BACKEND_PORT);
    }

    public static async deleteModule(moduleId: string) {
        return Requests.doDelete("/api/module/" + moduleId, import.meta.env.VITE_BACKEND_PORT);
    }

    public static async updateModule(moduleId: string, payload: any) {
        return Requests.doPatch(payload, "/api/module/" + moduleId, import.meta.env.VITE_BACKEND_PORT);
    }

    public static async archiveModule(moduleId: string) {
        return Requests.doDelete("/api/module/archive/" + moduleId, import.meta.env.VITE_BACKEND_PORT);
    }

}