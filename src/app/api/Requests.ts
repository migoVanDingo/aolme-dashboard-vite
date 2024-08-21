import axios from "axios"

export class Requests {
  public static async updloadFile(
    formData: any,
    endpoint: string,
    onUploadProgress: any
  ) {
    return await axios.post("http://localhost:5003" + endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
  }
  public static async testPost() {
    try {
      const response = await fetch("http://localhost:5003/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testy",
          password: "test",


        }),
      })
      return await response.json()
    } catch (error) {
      console.error("POST ERROR: ", error)
      throw error // Re-throw the error to handle it outside this function if needed
    }
  }


  public static async doPost(data: any, endpoint: string) {
    try {
      const response = await fetch("http://localhost:5003" + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      return await response.json()
    } catch (error) {
      console.error("POST ERROR: ", error)
      throw error // Re-throw the error to handle it outside this function if needed
    }
  }

  public static async doGet(endpoint: string) {
    try {
      const response = await fetch("http://localhost:5003" + endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      return await response.json()
    } catch (error) {
      console.error("GET ERROR: ", error)
      throw error // Re-throw the error to handle it outside this function if needed
    }
  }

  public static async doPatch(formData: any, endpoint: string) {
    return await axios.patch("http://localhost:5003" + endpoint, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public static async doPut(formData: any, endpoint: string) {
    return await axios.put("http://localhost:5003" + endpoint, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public static async doDelete(endpoint: string) {
    return await axios.delete("http://localhost:5003" + endpoint)
  }
}
