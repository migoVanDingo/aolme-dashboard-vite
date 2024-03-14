import { Requests } from "./Requests"

export class ProcessAPI {

    public static async launchLabelStudio(projectName: string){
       

        const data = {
            project_name: projectName
        }
        return Requests.doPost(data ,'/subprocess/label-studio')
        
    }

    public static async launchJupyterNotebook(data: any){
        return Requests.doPost(data ,'/subprocess/jupyter')
    }
}