import { Requests } from "./Requests"
import { IAddRepoItem, ICreateRepository } from "../utility/interface/repository"

export class RepoAPI {
  public static async createRepo(repo: ICreateRepository) {
    return await Requests.doPost(repo, "/api/repository", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getRepoByEntity(entityId: string) {
    return await Requests.doGet("/api/repository/entity/" + entityId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getRepoByOwner(owner: string) {
    return await Requests.doGet("/api/repository/owner/" + owner, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async addRepoItem(repoId: string, payload: IAddRepoItem){
    return await Requests.doPost(payload, "/api/repository/" + repoId + "/item", import.meta.env.VITE_BACKEND_PORT)
  }
  
  public static async checkAddUpdateRepoItem(repoId: string, payload: any) {
    return await Requests.doPost(payload, "/api/repository/" + repoId + "/item/update", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getRepoItemByFileId(fileId: string) {
    return await Requests.doGet("/api/repository/item/file" + fileId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getRepoById(repoId: string) {
    return await Requests.doGet("/api/repository/" + repoId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getRepoItems(repoId: string) { 
    return await Requests.doGet("/api/repository/" + repoId + "/items", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async updateRepo(repo: ICreateRepository) {
    return await Requests.doPut(repo, "/api/repository/update", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async deleteRepo(repoId: string) {
    return await Requests.doDelete("/api/repository/delete/" + repoId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async archiveRepo(repoId: string) {
    return await Requests.doDelete("/api/repository/archive/" + repoId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async cloneGithubRepo(payload: any) {
    return await Requests.doPost(payload, "/api/repository/clone", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async syncGithubRepo(repoId: string){
    return await Requests.doGet("/api/repository/"+ repoId +"/sync", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getDirectoryContents(repoId: string){
    return await Requests.doGet("/api/repository/"+ repoId +"/contents", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getRepoStages(path: string){
    return await Requests.doGet("/api/repository/stages?path=" + path, import.meta.env.VITE_BACKEND_PORT)
  }
}
