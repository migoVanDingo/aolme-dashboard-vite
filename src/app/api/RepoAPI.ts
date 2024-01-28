import { Requests } from "./Requests"
import { ICreateRepository } from "../utility/interface/repository"

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

  public static async getRepoById(repoId: string) {
    return await Requests.doGet("/api/repository/" + repoId)
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
}
