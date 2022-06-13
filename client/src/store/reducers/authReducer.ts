import { ActionTypes } from "src/store/actions/actionTypes";

import {AuthReducerActionType, AuthStateType} from "store/types/authType";

const initialAuthState: AuthStateType = {
  isAuthenticated: null,
  email: "",
  _id: null,
  username: "",
  role: "customer",
  avatar: ""
}



const authReducer = (state=initialAuthState, action: AuthReducerActionType): AuthStateType =>{
  switch(action.type){
    case ActionTypes.LOGIN :
      return {...state, ...action.payload}
    
    case ActionTypes.LOGOUT :
      return {
        isAuthenticated: false,
        email: "",
        _id: null,
        username: "",
        avatar: "",
        role: "customer",
      }
    
    default:
      return state
  }
}

export default authReducer