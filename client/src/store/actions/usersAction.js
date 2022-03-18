
import { FETCH_USERS, FETCH_USER, LOGIN } from './types'

import { baseUri  } from "src/apis/api"

// Get All User Array
export const fetchUsers = () => async (dispatch, getState, api)=>{
  const { data } = await api.get('/api/users')       
  dispatch({
    type: FETCH_USERS,
    payload: data
  })
}

// Get Single User Object ......
export const fetchUser = (userId) => async (dispatch, getState, api)=>{
  const { data } = await api.get('/users'+ userId)
  dispatch({
    type: FETCH_USER,
    payload: data
  })
}

// Get CHange Avatar  ......
export const changeProfilePhoto = (file) => async (dispatch, getState, api)=>{
  let formData = new FormData()
  formData.append("avatar", file)
  const data = await api.post('/api/avatar-upload', formData)
  if(!data._id) return 

  const payload = {
    isAuthenticated: true,
    username: data.username,
    _id: data._id ,
    email: data.email,
    avatar: baseUri + "//" + data.avatar
  }

  dispatch({
    type: LOGIN,
    payload: payload
  })

}
