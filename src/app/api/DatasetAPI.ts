import Constant from "../utility/constant"
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
      "/api/dataset/file/list" + queryStr,
      Constant.DATASTORE_SERVICE_PORT
    )
  }

}
