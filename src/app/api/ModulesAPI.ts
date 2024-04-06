import { Requests } from "./Requests";

export class ModulesAPI {
    public static async createModule(payload: any) {
        return Requests.doPost(payload, "/api/module");
    }

    public static async getModuleList() {
        return Requests.doGet("/api/module");
    }

    public static async getModuleById(moduleId: string) {
        return Requests.doGet("/api/module/" + moduleId);
    }

    public static async getModuleListByUserId(userId: string) {
        return Requests.doGet("/api/module/user/" + userId);
    }

    public static async getModuleListByEntity(entityId: string) {
        return Requests.doGet("/api/module/entity/" + entityId);
    }

    public static async deleteModule(moduleId: string) {
        return Requests.doDelete("/api/module/" + moduleId);
    }

    public static async updateModule(moduleId: string, payload: any) {
        return Requests.doPatch(payload, "/api/module/" + moduleId);
    }

    public static async archiveModule(moduleId: string) {
        return Requests.doDelete("/api/module/archive/" + moduleId);
    }

}