import { Requests } from "./Requests";

export class FilesAPI {
    public static async getProjectFiles(projectId: number){
        return await Requests.doGet('/files/'+projectId)
     
    }

    public static async getProjectFolders(projectId: number){
        console.log('get Root')
        return await Requests.doGet('/api/directory/project/'+projectId+'/root')
     
    }

    public static async getFolderItems(projectId: number, folderArray: string[] = []){

        let params = null
        console.log('folderArray: ', folderArray)
        if(folderArray !== null && folderArray.length !== 0){
            params = "?fa=" +  folderArray.toString()
            console.log('get folder project')
            return await Requests.doGet('/api/directory/project/' + projectId + "/folder" + params )
        }


        console.log('get folder Root')
        return await Requests.doGet('/api/directory/project/' + projectId + '/root' )
        
    
        
    }
}