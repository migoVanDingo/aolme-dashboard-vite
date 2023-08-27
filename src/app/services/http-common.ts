import axios from "axios";

export const FormDataClient =  axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "multipart/form-data",
    "Accept": "*/*"
  }
});

export const JSONTest = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "text/plain",
    "Accept": "*/*"
  }
})

