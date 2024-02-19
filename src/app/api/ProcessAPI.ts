import { Requests } from "./Requests"

export class ProcessAPI {

    public static async launchLabelStudio(projectName: string){
       

        const data = {
            project_name: projectName
        }
        return Requests.doPost(data ,'/subprocess/label-studio')
        
    }

    public static async launchJupyterNotebook(entity_id: string){
        const data = {
            entity_id
        }

        return Requests.doPost(data ,'/subprocess/jupyter')
    }
}