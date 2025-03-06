import Constant from "../utility/constant";
import { ICreateProject } from "../utility/interface/repository";
import { Requests } from "./Requests";

export default class ProjectApi {
  public static createProject(payload: ICreateProject){
    return Requests.doPost(payload, "/api/project", Constant.PROJECT_SERVICE_PORT)
  }

  public static getProject(args: any){
    let queryStr = "?"
    // for each arg field add to the query string
    for (let key in args){
      if(args.hasOwnProperty(key)){
        queryStr += key + "=" + args[key] + "&"
      }
    }

    // remove the last character
    queryStr = queryStr.slice(0, -1)
    console.log('queryStr:', queryStr)
    return Requests.doGet('/api/project' + queryStr, Constant.PROJECT_SERVICE_PORT)
  }

  public static getProjectList(args: any){
    let queryStr = "?"
    // for each arg field add to the query string
    for (let key in args){
      if(args.hasOwnProperty(key)){
        queryStr += key + "=" + args[key] + "&"
      }
    }

    // remove the last character
    queryStr = queryStr.slice(0, -1)

    return Requests.doGet('/api/project/all' + queryStr, Constant.PROJECT_SERVICE_PORT)
  }

  public static cloneRepoProject(payload: any){
    return Requests.doPost(payload, "/api/project/clone", Constant.PROJECT_SERVICE_PORT)
  }

}