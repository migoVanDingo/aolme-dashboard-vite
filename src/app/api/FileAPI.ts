import { Requests } from "./Requests";

export class FilesAPI {
    public static async getProjectFiles(projectId: number){
        return await Requests.doGet('/files/'+projectId, import.meta.env.VITE_BACKEND_PORT)
     
    }

    public static async getProjectFolders(projectId: number){
        console.log('get Root')
        return await Requests.doGet('/api/directory/project/'+projectId+'/root', import.meta.env.VITE_BACKEND_PORT)
     
    }

    /* public static async getFolderItems(projectId: number, folderArray: string[] = []){

        let params = null
        console.log('folderArray: ', folderArray)
        if(folderArray !== null && folderArray.length !== 0){
            params = "?fa=" +  folderArray.toString()
            console.log('get folder project')
            return await Requests.doGet('/api/directory/project/' + projectId + "/folder" + params )
        }


        console.log('get folder Root')
        return await Requests.doGet('/api/directory/project/' + projectId + '/root' )
        
    } */

    public static async getFolderItems(entity_id: string, folder: string[] = []){
        let params = null
        if(folder === null || folder.length === 0)
            return
        console.log('folderArray: ', folder)
        if(folder !== null && folder.length !== 0){
            params = "?fa=" +  folder.toString()
            console.log('get folder project')
            
        }
        console.log("URL : " + '/api/directory/entity/' + entity_id + '/folder' + params)
      return await Requests.doGet('/api/directory/entity/' + entity_id + '/folder' + params , import.meta.env.VITE_BACKEND_PORT)
    }

    public static async getDirectoryItems(entity_id: string, folder_name: string, owner_id: string, repo_id: string){
        if(folder_name === null) return "FileAPI::::getDirectoryItems()::::FOLDER NAME IS NULL"
        if(owner_id === null) return "FileAPI::::getDirectoryItems()::::OWNER ID IS NULL"
        if(entity_id === null) return "FileAPI::::getDirectoryItems()::::ENTITY ID IS NULL"
        if(repo_id === null) return "FileAPI::::getDirectoryItems()::::REPO ID IS NULL"

        return await Requests.doGet('/api/directory/entity/'+ entity_id +'/folder/'+ folder_name +'/owner/' + owner_id + '/repo/' + repo_id, import.meta.env.VITE_BACKEND_PORT)
    }

    public static async getRepoFiles(repo_id: string, entity_id: string){
        return await Requests.doGet('/api/directory/repo/'+repo_id + "?entity_id=" + entity_id, import.meta.env.VITE_BACKEND_PORT)
    }


}