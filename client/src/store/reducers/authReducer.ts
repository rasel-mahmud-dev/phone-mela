import { ActionTypes } from "src/store/actions/actionTypes";

import {AuthReducerActionType} from "store/types/authType";



export interface AuthStateType {
    authLoaded: boolean
    auth: {
        firstName?: string,
        email: string
        _id: string
        username: string
        role?:  "admin" | "customer"
        avatar?: string
    }
}


const initialAuthState: AuthStateType = {
    auth: null,
    authLoaded: false
}





const authReducer = (state=initialAuthState, action: AuthReducerActionType): AuthStateType =>{
  switch(action.type){
    case ActionTypes.LOGIN :
      return {
          authLoaded: true,
          auth: action.payload
      }
    
    case ActionTypes.LOGOUT :
      return {
          authLoaded: true,
          auth: null
      }
    
    default:
      return state
  }
}

export default authReducer