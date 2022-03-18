
import { FETCH_USER, LOGIN, LOGOUT, SIGN_UP, } from './types'

import api from "src/apis/api"

function failLogin(dispatch){
  const payload = {
    isAuthenticated: false,
    username: "",
    id: "" ,
    email: "",
    avatar: ""
  }
  dispatch({
    type: LOGIN,
    payload: payload
  })
}

// Register Api Call........
export const register = (userData, push)=> async (dispatch, getState, api)=> {
  console.log(userData)
  const data = await api.post('/api/signup', JSON.stringify(userData) )

  if(!data) {
    failLogin(dispatch)
    return 
  }
  const payload = {
    isAuthenticated: true,
    username: data.username,
    id: data.id ,
    email: data.email,
  }

  dispatch({
    type: LOGIN,
    payload: payload
  })

  push("/")
}




//~ auto login when componopentDidMount ==> client site
export const fetchCurrentAuth = (push) => async (dispatch, getState, api) => {
  try {
    const {data}  = await api.get("/api/sign-current-user")

    if(!data.id) {
      failLogin(dispatch)
      return 
    }

    const payload = {
      isAuthenticated: true,
      username: data.username,
      id: data.id ,
      email: data.email,
      avatar: data.avatar
    }
    dispatch({
      type: LOGIN,
      payload: payload
    })

  } catch (error) {
    console.log("error occur...........", error);
    failLogin(dispatch)
      return 
  }
}

// export const fetchAdmin= (push) => async (dispatch, getState, api) => {

//   const { data } = await api.get("/api/auth/current-admin")  
 
//   if(!data.admin) {
//     push("/auth/create-admin")
//     console.log("not found any admin user");

//   } else {
//     const auth = getState().auth

//     dispatch({
//       type: LOGIN,
//       payload: { ...auth, adminConnected: true, isAdmin: data.admin._id === auth._id ? true : false }
//     })
//   }
 
// }


//~ login action.......

export const login = (userData, push)=> async (dispatch, getState)=> {
  try{
    const {data} = await api.post('/api/sign-in', userData)
    if(!data.id) {
      failLogin(dispatch)
      return
    }
    

    const payload = {
      isAuthenticated: true,
      username: data.username,
      id: data.id ,
      email: data.email,
      avatar: data.avatar,
    }
  
    console.log(payload)
  
    window.localStorage.setItem("token", data.token)

    dispatch({
      type: LOGIN,
      payload: payload
    })
    push("/")

  } catch(ex){
    failLogin(dispatch)
  }
}

export const logout = (id) => {
  localStorage.removeItem("token")
  return {
    type :  LOGOUT,
    payload: {
      isAuthenticated: false,
      username: "",
      email: "",
      id: '',
      avatar: ""
    } 
  }
}

export const fetchProfile = (id) => async (dispatch, getState, api)=> {
  const user = await api.get(`/api/current-user`)
  console.log(user);
  dispatch({
    type :  FETCH_USER,
    payload: user 
  })
}

// this is only execure when application frist boot up ............
export const createAdmin = (adminData) => async (dispatch, getState, api)=> {
  const { data }= await api.post('/api/auth/create-admin', JSON.stringify(adminData))
 console.log(data);
}