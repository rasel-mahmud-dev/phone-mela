
import {
  ActionTypes, SET_ACTION_PAYLOAD, SET_ACTION_TYPE,
  TOGGLE_SEARCH_BOX_PAYLOAD, TOGGLE_SEARCH_BOX_TYPE,
  
} from "actions/actionTypes";
import {OpenSideBarType} from "reducers/toolsReducer";




export const toggleBackdrop = (state: any)=> {
  return {
    type: ActionTypes.TOGGLE_BACKDROP,
    payload: state
  }
}



export const togglePopup = (payload?: SET_ACTION_PAYLOAD): SET_ACTION_TYPE => {
  return {
    type: ActionTypes.SET_ACTION,
    payload: payload
  }
}

// export const togglePopup = (payload?: SET_ACTION_PAYLOAD): SET_ACTION_TYPE => {
//   return {
//     type: ActionTypesE.SET_ACTION,
//     payload: payload
//   }
// }


export const toggleSearchBar = (payload: TOGGLE_SEARCH_BOX_PAYLOAD): TOGGLE_SEARCH_BOX_TYPE => {
  return {
    type: ActionTypes.TOGGLE_SEARCH_BOX,
    payload: payload
  }
}




export type TOGGLE_SIDEBAR_ACTION = {
  type: ActionTypes.TOGGLE_SIDEBAR,
  payload: OpenSideBarType
}


export const toggleSideBar = (payload: OpenSideBarType): TOGGLE_SIDEBAR_ACTION => {
  return {
    type: ActionTypes.TOGGLE_SIDEBAR,
    payload: payload
  }
}


