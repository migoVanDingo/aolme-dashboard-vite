import { Requests } from "./Requests"

export class ProcessAPI {

    public static async launchLabelStudio(projectName: string){
       

        const data = {
            project_name: projectName
        }
        Requests.doPost(data ,'/subprocess/label-studio')
        .then((result) => {
            console.log("FUNCTION: launchLabelStudio()")
            return result
        })
        .catch((err) => console.error("launchLabelStudio(): ",err))


        
    }
}