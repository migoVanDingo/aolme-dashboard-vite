import IDataset from "../utility/interface/dataset";
import { Requests } from "./Requests";

export class DatasetAPI {
  public static async createDataset(payload: IDataset) {
    return Requests.doPost(payload, "/api/dataset");
  }

  public static async getDatasetList() {
    return Requests.doGet("/api/dataset");
  }

  public static async getDatasetById(datasetId: string) {
    return Requests.doGet("/api/dataset/" + datasetId);
  }

  public static async getDatasetByProjectId(projectId: string) {
    console.log('NOT_IMPLEMENTED: getDatasetByProjectId')
  }

  public static async getDatasetListByUserId(userId: string) {
    return Requests.doGet("/api/dataset/user/" + userId);
  }

  public static async getDatasetListByEntity(entityId: string) {
    return Requests.doGet("/api/dataset/entity/" + entityId);
  }

  public static async deleteDataset(datasetId: string) {
    return Requests.doDelete("/api/dataset/" + datasetId);
  }

  public static async updateDataset(datasetId: string, payload: any) {
    return Requests.doPatch("/api/dataset/" + datasetId, payload);
  }
}
