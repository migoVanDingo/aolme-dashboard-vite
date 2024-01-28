import axios from "axios"

export class Requests {
  
  public static async doPost(formData: any, endpoint: string) {
    return await axios
      .post("http://localhost:5000" + endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      
  }

  public static async doGet(endpoint: string) {
    return await axios.get("http://localhost:5000" + endpoint)
  }

  public static async doPatch(endpoint: string){
    return await axios.patch("http://localhost:5000" + endpoint)
  }

  public static async doPut(formData: any, endpoint: string) {
    return await axios
      .put("http://localhost:5000" + endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      
  }

  public static async doDelete(endpoint: string) {
    return await axios.delete("http://localhost:5000" + endpoint)
  }
  
}
