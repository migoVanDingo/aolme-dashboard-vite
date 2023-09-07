import { Requests } from "./Requests";

export class FilesAPI {
    public static async getProjectFiles(projectId: number){
        return await Requests.doGet('/files/'+projectId)
     
    }
}