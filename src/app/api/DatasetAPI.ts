import FileUploadService from "../services/FileUploadService"
import { IDataset } from "../utility/interface/dataset"
import { Requests } from "./Requests"

export class DatasetAPI {

  /* This DatasetAPI class also interacts with the Subset and Subset Item backend APIs */

  //Dataset API
  public static async createDataset(payload: IDataset) {
    return Requests.doPost(payload, "/api/dataset")
  }

  public static async getDatasetList() {
    return Requests.doGet("/api/dataset")
  }

  public static async getDatasetById(datasetId: string) {
    return Requests.doGet("/api/dataset/" + datasetId)
  }

  public static async getDatasetByRepoId(repoId: string) {
    console.log("NOT_IMPLEMENTED: getDatasetByRepoId")
  }

  public static async getDatasetListByUserId(userId: string) {
    return Requests.doGet("/api/dataset/user/" + userId)
  }

  public static async getDatasetListByEntity(entityId: string) {
    return Requests.doGet("/api/dataset/entity/" + entityId)
  }

  public static async deleteDataset(datasetId: string) {
    return Requests.doDelete("/api/dataset/" + datasetId)
  }

  public static async updateDataset(datasetId: string, payload: any) {
    return Requests.doPatch("/api/dataset/" + datasetId, payload)
  }


  //Subset API
  public static async createSubset(
    payload: any,
    files: any[],
    onUploadProgress: any
  ) {
    return FileUploadService.doFu(
      payload,
      files,
      "/api/dataset/subset",
      onUploadProgress,
     
    )
  }

  public static async getSubsetById(subsetId: string) {
    return Requests.doGet("/api/dataset/subset/" + subsetId)
  }

  public static async getSubsetListByDatasetId(datasetId: string) {
    return Requests.doGet("/api/dataset/" + datasetId + "/subset")
  }

  public static async deleteSubset(subsetId: string) {
    return Requests.doDelete("/api/dataset/subset/" + subsetId)
  }

  public static async getSubsetItemList(subsetId: string) {
    return Requests.doGet("/api/dataset/subset/" + subsetId + "/item")
  }

}
