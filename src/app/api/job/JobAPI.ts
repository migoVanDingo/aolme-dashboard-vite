import Constant from "../../utility/constant";
import { Requests } from "../Requests";


export class JobAPI {
    public static async initJob(payload: any) {
        return await Requests.doPost(payload, "/api/job/new", Constant.JOB_SERVICE_PORT)
    }

    public static async pollJobStatus(jobId: string) {
        return await Requests.doGet(`/api/job/status/${jobId}`, Constant.JOB_SERVICE_PORT)
    }
}