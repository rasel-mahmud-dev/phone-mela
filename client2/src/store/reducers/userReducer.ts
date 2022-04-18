import { ActionTypes} from "src/store/actions/actionTypes";


export interface ShippingAddress {
  id?: number,
  customer_id?: number,
  first_name?: string,
  last_name: string,
  phone: number,
  email?: string,
  post_code: number,
  state: string,
  city: string,
  address: string,
  apartment_suit?: string,
  country: string
}

export type UserReducerActionType = any




const usersReducer =(state=[], action: UserReducerActionType)=>{
  switch(action.type){
    
    // case ActionTypes.FETCH_USERS :
    //   return action.payload
    //
    // case ActionTypes.FETCH_USER:
    //   return [action.payload]
    
    default:
      return state
  }
}

export default usersReducer