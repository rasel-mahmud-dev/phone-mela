import axios from 'axios'
import xhr from './xhr'

//? -------- GoLang --------api
export const baseUri = 'http://localhost:5000';

//?............. Deno.....................
// const baseUri = 'http://localhost:8000';

// const baseUri = 'http://localhost:8080';

// const baseUri = 'http://localhost:4000';

// const baseUri = 'http://localhost:8000';


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

// export default xhr.create({
//   baseURL: baseUri,
//   withCredentials: true
// })