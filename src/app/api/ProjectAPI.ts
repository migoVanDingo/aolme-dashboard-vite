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

          console.log("payload: ", project)
          
          const response = await Requests.doPost(project, '/repo/project/create')
          return response
    }

    public static getProjectList() {
        return Requests.doGet('/repo/project/list')

    }

   /*  const getProjectById = (projectId: string) => {

    }

    const deleteProject = (projectId: string) => {

    } */
    
}