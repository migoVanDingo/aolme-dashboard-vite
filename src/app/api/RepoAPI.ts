import { Requests } from "./Requests"
import { IAddRepoItem, ICreateProject } from "../utility/interface/repository"
import Constant from "../utility/constant"

export class RepoAPI {
  public static async createRepo(repo: ICreateProject) {
    return await Requests.doPost(repo, "/api/repository", Constant.PROJECT_SERVICE_PORT)
  }

  public static async getRepoByEntity(entityId: string) {
    return await Requests.doGet("/api/project/entity/" + entityId, Constant.PROJECT_SERVICE_PORT)
  }

  public static async getRepoByOwner(owner: string) {
    return await Requests.doGet("/api/project/owner/" + owner, Constant.PROJECT_SERVICE_PORT)
  }

  public static async addRepoItem(repoId: string, payload: IAddRepoItem){
    return await Requests.doPost(payload, "/api/repository/" + repoId + "/item", Constant.PROJECT_SERVICE_PORT)
  }
  
  public static async checkAddUpdateRepoItem(repoId: string, payload: any) {
    return await Requests.doPost(payload, "/api/repository/" + repoId + "/item/update", Constant.PROJECT_SERVICE_PORT)
  }

  public static async getRepoItemByFileId(fileId: string) {
    return await Requests.doGet("/api/repository/item/file" + fileId, Constant.PROJECT_SERVICE_PORT)
  }

  public static async getRepoById(repoId: string) {
    return await Requests.doGet("/api/repository/" + repoId, Constant.PROJECT_SERVICE_PORT)
  }

  public static async getRepoItems(repoId: string) { 
    return await Requests.doGet("/api/repository/" + repoId + "/items", Constant.PROJECT_SERVICE_PORT)
  }

  public static async updateRepo(repo: ICreateProject) {
    return await Requests.doPut(repo, "/api/repository/update", Constant.PROJECT_SERVICE_PORT)
  }

  public static async deleteRepo(repoId: string) {
    return await Requests.doDelete("/api/repository/delete/" + repoId, Constant.PROJECT_SERVICE_PORT)
  }

  public static async archiveRepo(repoId: string) {
    return await Requests.doDelete("/api/repository/archive/" + repoId, Constant.PROJECT_SERVICE_PORT)
  }

  public static async cloneGithubRepo(payload: any) {
    return await Requests.doPost(payload, "/api/repository/clone", Constant.PROJECT_SERVICE_PORT)
  }

  public static async syncGithubRepo(repoId: string){
    return await Requests.doGet("/api/repository/"+ repoId +"/sync", Constant.PROJECT_SERVICE_PORT)
  }

  public static async getDirectoryContents(repoId: string){
    return await Requests.doGet("/api/repository/"+ repoId +"/contents", Constant.PROJECT_SERVICE_PORT)
  }

  public static async getRepoStages(path: string){
    return await Requests.doGet("/api/repository/stages?path=" + path, Constant.PROJECT_SERVICE_PORT)
  }
}
