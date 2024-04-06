import { Requests } from "./Requests"

export class OrganizationAPI {
    public static async createOrganization(payload: any) {
        return await Requests.doPost(payload, "/api/organization")
    }

    public static async getOrganizationById(organizationId: string) {
        return await Requests.doGet('/api/organization/' + organizationId)
    }

    public static async getOrganizationByName(organizationName: string) {
        return await Requests.doGet('/api/organization?name=' + organizationName)
    }

    public static async getOrganizationByUserId(userId: string) {
        return await Requests.doGet('/api/organization?user_id=' + userId)
    }

    public static async updateOrganization(payload: any) {
        return await Requests.doPut(payload, "/api/organization")
    }

    public static async deleteOrganization(organizationId: string) {
        return await Requests.doDelete('/api/organization/' + organizationId)
    }
}