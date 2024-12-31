import { Requests } from "./Requests";

export class NotebookAPI {
  public static async createNotebook(payload: any) {
    return Requests.doPost(payload, "/api/notebook", import.meta.env.VITE_BACKEND_PORT);
  }

  public static async getNotebookList() {
    return Requests.doGet("/api/notebook", import.meta.env.VITE_BACKEND_PORT);
  }

  public static async getNotebookById(notebookId:   string) {
    return Requests.doGet("/api/notebook/" + notebookId, import.meta.env.VITE_BACKEND_PORT);
  }

  public static async getNotebookByRepoId(repoId: string) {
    return Requests.doGet("/api/notebook/repo/" + repoId, import.meta.env.VITE_BACKEND_PORT);
  }

  public static async getNotebookListByUserId(userId: string) {
    return Requests.doGet("/api/notebook/user/" + userId, import.meta.env.VITE_BACKEND_PORT);
  }

  public static async getNotebookListByEntity(entityId: string) {
    return Requests.doGet("/api/notebook/entity/" + entityId, import.meta.env.VITE_BACKEND_PORT);
  }

  public static async deleteNotebook(notebookId: string) {
    return Requests.doDelete("/api/notebook/" + notebookId, import.meta.env.VITE_BACKEND_PORT);
  }

}