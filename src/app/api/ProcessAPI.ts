import { Requests } from "./Requests"

export class ProcessAPI {

    public static async launchLabelStudio(projectName: string){
       

        const data = {
            project_name: projectName
        }
        return Requests.doPost(data ,'/subprocess/label-studio')
        
    }

    public static async launchJupyterNotebook(projectId: number){
        const data = {
            project_id: projectId,
            folder_name: "notebook"
        }

        return Requests.doPost(data ,'/subprocess/jupyter')
    }
}