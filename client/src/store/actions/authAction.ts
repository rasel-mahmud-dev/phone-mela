import {ActionTypes} from './actionTypes'
import api from "src/apis/api"
import {LoginActionPayload, LoginActionType, LogOutActionType} from "store/types/authType";
import {AxiosInstance} from "axios";
import errorResponse from "../../response/errorResponse";



function failLogin(dispatch: any){
  const payload = {
    isAuthenticated: false,
    username: "",
    _id: "" ,
    email: "",
    avatar: "",
    role: ""
  }
  dispatch({
    type: ActionTypes.LOGIN,
    payload: payload
  })
}

// Register Api Call........
export const register = (userData: { username: string, email: string, password: string }, push: any)=> async (dispatch: (args: LoginActionType)=>void, getState: any, api: AxiosInstance)=> {

  const { data } = await api.post('/api/signup', JSON.stringify(userData) )

  if(!data) {
    failLogin(dispatch)
    return 
  }
  const payload = {
    isAuthenticated: true,
    firstName: data.first_name,
    username: data.username,
    _id: data._id,
    role: data.role,
    email: data.email,
  }

  dispatch({
    type: ActionTypes.LOGIN,
    payload: payload
  })

  push && push("/")
}




//~ auto login when componentDidMount ==> client site
export const fetchCurrentAuth = () => async (dispatch: (args: LoginActionType) => void, getState: any, api: AxiosInstance) => {
  try {
    const {data}  = await api.get("/api/sign-current-user")

    if(!data._id) {
      failLogin(dispatch)
      return 
    }

    const payload = {
      isAuthenticated: true,
      username: data.username,
      _id: data._id ,
      email: data.email,
      role: data.role,
      avatar: data.avatar
    }
    
    data.token &&  window.localStorage.setItem("token", data.token)
    
    dispatch({
      type: ActionTypes.LOGIN,
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


export const login = (userData: { email: string, password: string }, cb: any)=> async (dispatch: (args: LoginActionType)=>void, getState: any)=> {
  try{
    const r = await api.post('/api/sign-in', userData)
    
    if(r.status !== 201){
      failLogin(dispatch)
      cb(r.data.message, null)
      return
    }
    
    const payload = {
      isAuthenticated: true,
      username: r.data.username,
      _id: r.data._id,
      role: r.data.role,
      email: r.data.email,
      avatar: r.data.avatar,
    }
    r.data.token &&  window.localStorage.setItem("token", r.data.token)

    dispatch({
      type: ActionTypes.LOGIN,
      payload: payload
    })
    cb(null, payload)
    
  } catch(ex: any){
    cb(errorResponse(ex), null)
    failLogin(dispatch)
  }
}

export const logout = (_id: number, cb: (err: string  | null)=>void): LogOutActionType => {
  localStorage.removeItem("token")
  if(cb){
    cb(null)
  }
  
  return {
    type:  ActionTypes.LOGOUT
  }
}

// export const fetchProfile = (_id: string) => async (dispatch, getState, api)=> {
//   const user = await api.get(`/api/current-user`)
//   console.log(user);
//   dispatch({
//     type :  FETCH_USER,
//     payload: user
//   })
// }

// this is only execute when application first boot up ............
// export const createAdmin = (adminData) => async (dispatch, getState, api)=> {
//   const { data }= await api.post('/api/auth/create-admin', JSON.stringify(adminData))
//  console.log(data);
// }