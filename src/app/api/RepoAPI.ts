import { Requests } from "./Requests"
import { IAddRepoItem, ICreateRepository } from "../utility/interface/repository"

export class RepoAPI {
  public static async createRepo(repo: ICreateRepository) {
    return await Requests.doPost(repo, "/api/repository")
  }

  public static async getRepoByEntity(entityId: string) {
    return await Requests.doGet("/api/repository/entity/" + entityId)
  }

  public static async getRepoByOwner(owner: string) {
    return await Requests.doGet("/api/repository/owner/" + owner)
  }

  public static async addRepoItem(repoId: string, payload: IAddRepoItem){
    return await Requests.doPost(payload, "/api/repository/" + repoId + "/item")
  }
  
  public static async checkAddUpdateRepoItem(repoId: string, payload: any) {
    return await Requests.doPost(payload, "/api/repository/" + repoId + "/item/update")
  }

  public static async getRepoItemByFileId(fileId: string) {
    return await Requests.doGet("/api/repository/item/file" + fileId)
  }

  public static async getRepoById(repoId: string) {
    return await Requests.doGet("/api/repository/" + repoId)
  }

  public static async getRepoItems(repoId: string) { 
    return await Requests.doGet("/api/repository/" + repoId + "/items")
  }

  public static async updateRepo(repo: ICreateRepository) {
    return await Requests.doPut(repo, "/api/repository/update")
  }

  public static async deleteRepo(repoId: string) {
    return await Requests.doDelete("/api/repository/delete/" + repoId)
  }

  public static async archiveRepo(repoId: string) {
    return await Requests.doDelete("/api/repository/archive/" + repoId)
  }

  public static async cloneGithubRepo(payload: any) {
    return await Requests.doPost(payload, "/api/repository/clone")
  }

  public static async syncGithubRepo(repoId: string){
    return await Requests.doGet("/api/repository/"+ repoId +"/sync")
  }

  public static async getDirectoryContents(repoId: string){
    return await Requests.doGet("/api/repository/"+ repoId +"/contents")
  }
}
