import {ActionTypes} from "actions/actionTypes";



export interface AuthStateType {
  isAuthenticated: boolean | null
  email: string
  id: number | null
  username: string
  role?:  "admin" | "customer"
  avatar?:string
}




export type LoginActionPayload = {
  isAuthenticated: boolean
  username: string
  id: number
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
