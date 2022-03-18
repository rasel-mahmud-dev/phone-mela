import {FETCH_USER, FETCH_USERS} from "src/store/actions/types";



const usersReducer =(state=[], action)=>{
  switch(action.type){
    
    case FETCH_USERS :
      return action.payload
    
    case FETCH_USER:
      return [action.payload]
    
    default:
      return state
  }
}

export default usersReducer