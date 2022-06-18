import axios, {Axios, AxiosRequestHeaders} from 'axios'



//? -------- GoLang --------api
// export const baseUri = 'http://192.168.43.170:5000';


export let baseUri = 'https://phone-mela-api-server.netlify.app/.netlify/functions/server'


if(import.meta.env.MODE === "development") {
  baseUri = 'http://localhost:1000'
  // baseUri = 'https://phone-mela-api-server.netlify.app/.netlify/functions/server'
  // baseUri = 'http://localhost:8888/.netlify/functions/server'
}

interface MyHeaders  extends  AxiosRequestHeaders {
  token: string
}

const api = axios.create({
  baseURL: baseUri,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    token: window.localStorage.getItem("token")
  }
})

export default api
