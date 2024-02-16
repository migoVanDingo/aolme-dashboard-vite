import axios from "axios"
import { FormDataClient } from "./http-common"
import { ICreateProject, ISyncImportStorage } from "../utility/interface/project"
import { Requests } from "../api/Requests"

const fileUpload = async (files: any[], data: any, onUploadProgress: any) => {
  const formData = new FormData()
  for(const field in data){
    formData.append(field, data[field])
  }

  for(const file of files){
    formData.append("file", file)
  }

  let url

  console.log("DATUM BATCH: ", formData)
  switch(data.type){
    case "FILE":
      url = "/api/files"
      break;
    case "DATASET":
      url = "/api/dataset"
      break
    case "MODULE":
      url = "/api/module"
      break
    case "CONFIG":
      url = "/api/config"
      break

    
    default:
      url = ""
      break
  }

  console.log("url: ", url)

  return Requests.updloadFile(formData, url, onUploadProgress)


}
const handleFileUpload = async (files: any[], data: ISyncImportStorage, projectId: string,  onUploadProgress: any) => {

  //const { name, description, owner } = data

  const formData = new FormData()

  for( let i = 0; i < files.length; i++){
    formData.append("file", files[i])
  }
  console.log("proejct_ID: ",data['project_id'] )

  formData.append("project_id", data['project_id'].toString())
  formData.append("title", data['title'])
  formData.append("description", data['description'])
  formData.append("path", '/Users/bubz/Developer/master-project/aolme-backend/project/' + projectId  + '/local-storage')

  console.log('files length: ', files.length)
 


  /* formData.append("project_name", name)
  formData.append("project_description", description)
  formData.append("project_owner", owner)

  console.log("from data: ", formData) */


  return await axios.post("http://localhost:5000/files/"+projectId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
    
}

const upload = (file: any, onUploadProgress: any) => {
  let formData = new FormData()


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
  handleFileUpload,
  fileUpload
  /* getFiles,
  convertCsv,
  getCsvTest */
}
