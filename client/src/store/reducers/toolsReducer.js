import {TOGGLE_BACKDROP} from "src/store/actions/types";


const initialAuthState = {
  isShowBackdrop: false,
  isModel: false
}

const toolsReducer = (state=initialAuthState, action)=>{
  switch(action.type){
    case TOGGLE_BACKDROP :
      return {...state, isShowBackdrop:action.payload}
    
    default:
      return state
  }
}

export default toolsReducer