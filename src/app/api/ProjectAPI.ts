import { ICreateProject } from "../utility/interface/project"
import { Requests } from "./Requests"

export class ProjectAPI {

     public static async createProject(projectName: string, projectDescription: string = '', projectOwner: string) {
        const project: ICreateProject = {
            name: projectName,
            description: projectDescription,
            owner: projectOwner,
            created_by: "migo",
            last_updated_by: "migo"
          }

         
          
          const response = await Requests.doPost(project, '/repo/project/create')
          return response
    }

    public static getProjectList() {
        return Requests.doGet('/repo/project/list')

    }

    public static getProjectById = (projectId: string) => {
        return Requests.doGet('/repo/project/' + projectId)
    }

   /*  const deleteProject = (projectId: string) => {

    } */
    
}