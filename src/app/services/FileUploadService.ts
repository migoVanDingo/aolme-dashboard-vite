import axios from "axios"
import { FormDataClient } from "./http-common"
import { ICreateProject } from "../utility/interface/project"

const handleFileUpload = async (files: any[], data: ICreateProject,  onUploadProgress: any) => {

  const { name, description, owner } = data

  const formData = new FormData()

  for( let i = 0; i < files.length; i++){
    formData.append("file", files[i])
  }
  

  formData.append("project_name", name)
  formData.append("project_description", description)
  formData.append("project_owner", owner)

  console.log("from data: ", formData)


  return await axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
    .then((response) => {
      console.log("rere: ", response)
    })
    .catch((error) => {
      
      console.error(error)
      console.log('foc')
    })
}

const upload = (file: any, onUploadProgress: any) => {
  let formData = new FormData()

  console.log("filename: " + file.name)
  formData.append("file", file, file.name)

  return FormDataClient.post("/upload", formData, {
    onUploadProgress,
  })
}


/* const convertCsv = (file: any, onUploadProgress: any) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("http://localhost:3002/convert-csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      
    },
    onUploadProgress,
  });
}

const getCsvTest = () => {
  return http.get("http://localhost:3002/convert-csv")
}

const getFiles = () => {
  return http.get("/files");
}; */

export default {
  upload,
  handleFileUpload
  /* getFiles,
  convertCsv,
  getCsvTest */
}
