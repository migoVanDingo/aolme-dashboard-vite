import { Requests } from "./Requests"

export class DatastoreAPI {
    public static async getGroupEntities(){
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
      }
}