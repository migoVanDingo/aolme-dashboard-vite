import { ICreateProject } from "../utility/interface/project"
import { Requests } from "./Requests"

export class ProjectAPI {
  public static async createProject(
    projectName: string,
    projectDescription: string = "",
    projectOwner: string
  ) {
    const project: ICreateProject = {
      name: projectName,
      description: projectDescription,
      owner: projectOwner,
      created_by: "migo",
      last_updated_by: "migo",
    }

    const response = await Requests.doPost(project, "/repo/project/create", import.meta.env.VITE_BACKEND_PORT)
    return response
  }

  public static async getProjectList() {
    return await Requests.doGet("/repo/project/list", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getProjectById(projectId: string) {
    return await Requests.doGet("/repo/project/" + projectId, import.meta.env.VITE_BACKEND_PORT)
  }

  /*  const deleteProject = (projectId: string) => {

    } */
}
