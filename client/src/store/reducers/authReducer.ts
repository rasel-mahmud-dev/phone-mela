import { ActionTypes } from "src/store/actions/actionTypes";

import {AuthReducerActionType, AuthStateType} from "store/types/authType";

const initialAuthState: AuthStateType = null



const authReducer = (state=initialAuthState, action: AuthReducerActionType): AuthStateType =>{
  switch(action.type){
    case ActionTypes.LOGIN :
      return action.payload
    
    case ActionTypes.LOGOUT :
      return null
    
    default:
      return state
  }
}

export default authReducer