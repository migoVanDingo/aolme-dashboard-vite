import { Requests } from "./Requests";

export class NotebookAPI {
  public static async createNotebook(payload: any) {
    return Requests.doPost(payload, "/api/notebook");
  }

  public static async getNotebookList() {
    return Requests.doGet("/api/notebook");
  }

  public static async getNotebookById(notebookId:   string) {
    return Requests.doGet("/api/notebook/" + notebookId);
  }

  public static async getNotebookByRepoId(repoId: string) {
    return Requests.doGet("/api/notebook/repo/" + repoId);
  }

  public static async getNotebookListByUserId(userId: string) {
    return Requests.doGet("/api/notebook/user/" + userId);
  }

  public static async getNotebookListByEntity(entityId: string) {
    return Requests.doGet("/api/notebook/entity/" + entityId);
  }

  public static async deleteNotebook(notebookId: string) {
    return Requests.doDelete("/api/notebook/" + notebookId);
  }

}