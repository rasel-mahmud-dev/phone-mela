import { combineReducers } from 'redux'

import authReducer from "./authReducer";
import usersReducer from "./userReducer";
import productsReducer from "./productReducer";
import toolsReducer from "./toolsReducer";


export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  productState: productsReducer,
  tools: toolsReducer
})