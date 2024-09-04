import FileUploadService from "../services/FileUploadService"
import { IDataset } from "../utility/interface/dataset"
import { Requests } from "./Requests"



export class DatasetAPI {
  /* This DatasetAPI class also interacts with the Subset and Subset Item backend APIs */

  //Dataset API
  public static async createDataset(payload: IDataset) {
    return Requests.doPost(payload, "/api/dataset", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getDatasetList() {
    return Requests.doGet("/api/dataset", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getDatasetById(datasetId: string) {
    return Requests.doGet("/api/dataset/" + datasetId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getDatasetByRepoId(repoId: string) {
    return Requests.doGet("/api/dataset/repo/" + repoId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getDatasetListByUserId(userId: string) {
    return Requests.doGet("/api/dataset/user/" + userId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getDatasetListByEntity(entityId: string) {
    return Requests.doGet("/api/dataset/entity/" + entityId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async deleteDataset(datasetId: string) {
    return Requests.doDelete("/api/dataset/" + datasetId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async updateDataset(datasetId: string, payload: any) {
    return Requests.doPatch("/api/dataset/" + datasetId, payload, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getGroupEntities(){
    console.log('port: ', import.meta.env.VITE_DATASTORE_PORT)
    return Requests.doGet("/api/group/entities", import.meta.env.VITE_DATASTORE_PORT)
  }

  public static async getGroups(){
    return Requests.doGet("/api/group", import.meta.env.VITE_DATASTORE_PORT)
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
      onUploadProgress
    )
  }

  public static async getSubsetById(subsetId: string) {
    return Requests.doGet("/api/dataset/subset/" + subsetId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getSubsetListByDatasetId(datasetId: string) {
    return Requests.doGet("/api/dataset/" + datasetId + "/subset", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async deleteSubset(subsetId: string) {
    return Requests.doDelete("/api/dataset/subset/" + subsetId, import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getSubsetItemList(subsetId: string) {
    return Requests.doGet("/api/dataset/subset/" + subsetId + "/item", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getAnnotationData(subsetId: string, filename: string) {
    return Requests.doGet(
      "/api/subset/" + subsetId + "/annotation?filename=" + filename
      , import.meta.env.VITE_BACKEND_PORT)
  }

  public static async getFileAnnotationListByDataset(datasetId: string, filename: string) {
    return Requests.doGet("/api/dataset/" + datasetId + "/annotation?filename=" + filename, import.meta.env.VITE_BACKEND_PORT)
  }


  // Subset Label Studio Info
  public static async getLabelStudioProject(subsetId: string) {
    return Requests.doGet("/api/subset/" + subsetId + "/labelstudio", import.meta.env.VITE_BACKEND_PORT)
  }

  public static async pushFilesToSubset(
    payload: any,
    files: any[],
    onUploadProgress: any
  ) {
    console.log("DatasetAPI::pushFilesToSubset::", payload, files)
    return FileUploadService.doFu(
      payload,
      files,
      "/api/dataset/subset/push",
      null
    )
  }

  public static async handleInitializeDatasetRepoLabeler(
    payload: any,
    files: any[],
    onUploadProgress: any
  ){
    return FileUploadService.doFu(
      payload,
      files,
      "/api/dataset/initialize",
      onUploadProgress
    )
  }

  // Creates Subset Using Datastore AOLME videos
  public static async createDatastoreSubset(payload: any) {
    return Requests.doPost(payload, "/api/datastore/subset", import.meta.env.VITE_DATASTORE_PORT)
  }
}


