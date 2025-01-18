import { Requests } from "../Requests";

export class JobAPI {
    public static async initJob(payload: any) {
        return await Requests.doPost(payload, "/api/job/new", import.meta.env.JOB_SERVICE_PORT)
    }
}