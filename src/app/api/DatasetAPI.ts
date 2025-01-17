import Constant from "../utility/constant"
import { IPayloadAddFilesToDataset } from "./payload/PayloadAddFilesToDataset"
import { Requests } from "./Requests"

export class DatasetAPI {
  public static async createDataset(payload: any) {
    return Requests.doPost(
      payload,
      "/api/dataset",
      Constant.DATASTORE_SERVICE_PORT
    )
  }

  public static async getDatasetList(args: any) {
    let queryStr = "?"
    // for each arg field add to the query string
    for (let key in args) {
      if (args.hasOwnProperty(key)) {
        queryStr += key + "=" + args[key] + "&"
      }
    }

    // remove the last character
    queryStr = queryStr.slice(0, -1)
    return Requests.doGet("/api/dataset/list" + queryStr, Constant.DATASTORE_SERVICE_PORT)

  }

  public static async getDataset(args: any) {
    let queryStr = "?"
    // for each arg field add to the query string
    for (let key in args) {
      if (args.hasOwnProperty(key)) {
        queryStr += key + "=" + args[key] + "&"
      }
    }

    // remove the last character
    queryStr = queryStr.slice(0, -1)

    return Requests.doGet(
      "/api/dataset" + queryStr,
      Constant.DATASTORE_SERVICE_PORT
    )
  }


  // Dataset Files
  public static async uploadFiles(payload: any, onUploadProgress: any) {
    return Requests.updloadFile(
      payload,
      Constant.DATASTORE_SERVICE_PORT,
      Constant.service.datastore_manager.file_handler.FILE_UPLOAD,
      onUploadProgress
    )
  }

  public static async getDatasetFiles(args: any) {
    let queryStr = "?"
    // for each arg field add to the query string
    for (let key in args) {
      if (args.hasOwnProperty(key)) {
        queryStr += key + "=" + args[key] + "&"
      }
    }

    // remove the last character
    queryStr = queryStr.slice(0, -1)

    return Requests.doGet(
      "/api/datastore/file/list" + queryStr,
      Constant.DATASTORE_SERVICE_PORT
    )
  }


  public static async addFilesToDatasetFromDatastore(payload: IPayloadAddFilesToDataset) {
    return Requests.doPost(
      payload,
      "/api/datastore/file/dataset/add",
      Constant.DATASTORE_SERVICE_PORT
    )
  }

  public static async getDatasetFilesList(args: any) {
    let queryStr = "?"
    // for each arg field add to the query string
    for (let key in args) {
      if (args.hasOwnProperty(key)) {
        queryStr += key + "=" + args[key] + "&"
      }
    }

    // remove the last character
    queryStr = queryStr.slice(0, -1)

    return Requests.doGet(
      "/api/datastore/dataset/files/list" + queryStr,
      Constant.DATASTORE_SERVICE_PORT
    )
  }

}
