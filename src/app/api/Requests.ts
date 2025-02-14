import axios from "axios"

export class Requests {
  public static async updloadFile(
    formData: any,
    port: string | number,
    endpoint: string,
    onUploadProgress: any
  ) {
    return await axios.post("http://127.0.0.1:" + port + endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
  }
  public static async testPost() {
    try {
      const response = await fetch("http://127.0.0.1:5003/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
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


  public static async doPost(data: any, endpoint: string, port: string) {
    try {
      const response = await fetch("http://127.0.0.1:" + port + endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const res = await response.json()
      sessionStorage.setItem("access_token", res.access_token)
      return res
    } catch (error) {
      console.error("POST ERROR: ", error)
      throw error // Re-throw the error to handle it outside this function if needed
    }
  }

  public static async doLogin(data: any, endpoint: string, port: string) {
    try {
      const response = await fetch("http://127.0.0.1:" + port + endpoint, {
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

  public static async doGet(endpoint: string, port: string) {
    try {
      const response = await fetch("http://127.0.0.1:" + port + endpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
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

  public static async doPatch(formData: any, endpoint: string, port: string) {
    return await axios.patch("http://127.0.0.1:" + port + endpoint, formData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
  }

  public static async doPut(formData: any, endpoint: string, port: string) {
    return await axios.put("http://127.0.0.1:" + port + endpoint, formData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
  }

  public static async doDelete(endpoint: string, port: string) {
    return await axios.delete("http://127.0.0.1:" + port + endpoint)
  }
}
