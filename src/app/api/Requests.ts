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
    return axios.get("http://localhost:5000" + endpoint)
  }
}
