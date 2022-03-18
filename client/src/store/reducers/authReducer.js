import {LOGIN, LOGOUT} from "src/store/actions/types";


const initialAuthState = {
  isAuthenticated: null,
  email: "",
  _id: "",
  username: ""
}

const authReducer = (state=initialAuthState, action)=>{
  switch(action.type){
    case LOGIN :
      return {...state, ...action.payload}
    
    case LOGOUT :
      return {...state, ...action.payload}
    
    default:
      return state
  }
}

export default authReducer