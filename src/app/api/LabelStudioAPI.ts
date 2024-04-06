import { Requests } from "./Requests"

export interface ICreateLabelStudioProject{
    name: string
    description: string
    owner: string
    created_by: string
    repo_id: string
    

}
export class LabelStudioAPI {
    public static async initializeLabelStudioProject(payload: ICreateLabelStudioProject) {
        return await Requests.doPost(payload, '/api/label_studio/project');
    }

    public static async getLabelStudioProjectByRepoId(repoId: string) {
        return await Requests.doGet('/api/label_studio/repo/' + repoId);
    }
}