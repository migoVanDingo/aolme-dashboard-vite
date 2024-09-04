import { Requests } from "./Requests"

export class OrganizationAPI {
    public static async createOrganization(payload: any) {
        return await Requests.doPost(payload, "/api/organization", import.meta.env.VITE_BACKEND_PORT)
    }

    public static async getOrganizationById(organizationId: string) {
        return await Requests.doGet('/api/organization/' + organizationId, import.meta.env.VITE_BACKEND_PORT)
    }

    public static async getOrganizationByName(organizationName: string) {
        return await Requests.doGet('/api/organization?name=' + organizationName, import.meta.env.VITE_BACKEND_PORT)
    }

    public static async getOrganizationByUserId(userId: string) {
        return await Requests.doGet('/api/organization?user_id=' + userId, import.meta.env.VITE_BACKEND_PORT)
    }

    public static async updateOrganization(payload: any) {
        return await Requests.doPut(payload, "/api/organization", import.meta.env.VITE_BACKEND_PORT)
    }

    public static async deleteOrganization(organizationId: string) {
        return await Requests.doDelete('/api/organization/' + organizationId, import.meta.env.VITE_BACKEND_PORT)
    }
}