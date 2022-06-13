import {ActionTypes} from "actions/actionTypes";



export interface AuthStateType {
  isAuthenticated: boolean | null
  firstName?: string,
  email: string
  _id: string
  username: string
  role?:  "admin" | "customer"
  avatar?: string
}




export type LoginActionPayload = {
  isAuthenticated: boolean
  username: string
  firstName?: string
  _id: string
  role?: "admin" | "customer"
  email: string
  avatar?: string
}
export type LoginActionType = {
  type: ActionTypes.LOGIN,
  payload: LoginActionPayload
}

export type LogOutActionType = {
  type: ActionTypes.LOGOUT
}

export type AuthReducerActionType = LoginActionType | LogOutActionType
