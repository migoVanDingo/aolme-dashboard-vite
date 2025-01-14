import Constant from "../utility/constant"
import { Requests } from "./Requests"

export interface ICreateDatastore {
    name: string,
    description?: string,

}

export class DatastoreAPI {

    public static async createDatastore(payload: ICreateDatastore){
        return Requests.doPost(payload, "/api/datastore", Constant.DATASTORE_SERVICE_PORT)
    }

    public static async getDatastore(args: any){
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
        return Requests.doGet('/api/datastore' + queryStr, Constant.DATASTORE_SERVICE_PORT)
    }

    public static async getDatastoreList(args: any){
        let queryStr = "?"
        // for each arg field add to the query string
        for (let key in args){
            if(args.hasOwnProperty(key)){
                queryStr += key + "=" + args[key] + "&"
            }
        }

        // remove the last character
        queryStr = queryStr.slice(0, -1)

        return Requests.doGet('/api/datastore/roles/list' + queryStr, Constant.DATASTORE_SERVICE_PORT)
    }


    public static async getDatastoreConfig(datastoreId: string){
        return Requests.doGet("/api/datastore-config/read?datastore_id="+datastoreId, Constant.DATASTORE_SERVICE_PORT)
    }


    public static async searchDatastoreFiles(args: any){
        let queryStr = "?"
        // for each arg field add to the query string
        for (let key in args){
            if(args.hasOwnProperty(key)){
                queryStr += key + "=" + args[key] + "&"
            }
        }

        // remove the last character
        queryStr = queryStr.slice(0, -1)

        return Requests.doGet('/api/datastore/file/search' + queryStr, Constant.DATASTORE_SERVICE_PORT)
    }

   /*  public static async getGroupEntities(){
        console.log('port: ', import.meta.env.VITE_DATASTORE_PORT)
        return Requests.doGet("/api/group/entities", import.meta.env.VITE_DATASTORE_PORT)
      }
    
      public static async getGroups(){
        return Requests.doGet("/api/group", import.meta.env.VITE_DATASTORE_PORT)
      }

      public static async getOrgDatastoreList(orgId: string){
        return Requests.doGet("/api/datastore/org/"+orgId, import.meta.env.VITE_DATASTORE_PORT)
      }

      // Subset
      public static async getSubsetList(datastoreId: string){
        return Requests.doGet("/api/datastore/subset/"+datastoreId, import.meta.env.VITE_DATASTORE_PORT)
      }

      // Subset Items
      public static async getSubsetItems(subsetId: string){
        return Requests.doGet("/api/datastore/subset/"+subsetId+"/items", import.meta.env.VITE_DATASTORE_PORT)
      } */
}