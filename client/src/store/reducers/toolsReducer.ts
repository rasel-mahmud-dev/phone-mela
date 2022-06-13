import {ActionTypes,  ToolsReducerActionType} from "src/store/actions/actionTypes";

type Action = {
  isSucceed: boolean,
  message: string,
  isOpen: boolean
}

export type OpenSideBarType = {
  where: "homePage" |  "filterPage" | "admin_dashboard" | "customer_dashboard",
  isOpen: boolean
}

export interface ToolsReducerType{
  isShowBackdrop: boolean,
  isModel: boolean,
  appMask: object,
  action: Action,
  isOpenSearchBar: boolean,
  openSideBar: OpenSideBarType
  
}

const initialAuthState: ToolsReducerType = {
  isShowBackdrop: false,
  isModel: false,
  appMask: {
    as: "backdrop", //  "transparent" | "backdrop",
    isOpen: false,
    fullApp: false // full application backdrop
  },
  action: {
    isSucceed: true,
    message: "",
    isOpen: false
  },
  isOpenSearchBar: false,
  openSideBar: {
    where: "homePage",
    isOpen: false
  }
}

const toolsReducer = (state=initialAuthState, action: ToolsReducerActionType)=>{
  let updateState = {...state}
  
  switch(action.type){
    
    // case ActionTypes.TOGGLE_BACKDROP :
    //   return {...state, isShowBackdrop: action.payload }
    
    // case "TOGGLE_APPMASK":
    //   if(action.payload){
    //     // payload = {
    //     //   as: "transparent", //  "transparent" | "backdrop",
    //     //   isOpen: false
    //     // }
    //     updateState.appMask.isOpen = action.payload.isOpen
    //   } else {
    //     updateState.appMask = !updateState.appMask.isOpen
    //   }
    //   return updateState
    
    case ActionTypes.SET_ACTION:
      if(action.payload){
        updateState.action.message = action.payload.message
        updateState.action.isSucceed = action.payload.isSucceed
        updateState.action.isOpen = action.payload.isOpen
      } else{
        updateState.action.isOpen = false
        updateState.action.message = ""
      }
      return updateState
    
    case ActionTypes.TOGGLE_SIDEBAR:
      
      updateState.openSideBar.where = action.payload.where
      if(action.payload.isOpen === null) {
        updateState.openSideBar.isOpen = !updateState.openSideBar.isOpen
      } else {
        updateState.openSideBar.isOpen = action.payload.isOpen
      }
      
      // if(action.payload){
      //   updateState.action.message = action.payload.message
      //   updateState.action.isSucceed = action.payload.isSucceed
      //   updateState.action.isOpen = action.payload.isOpen
      // } else{
      //   updateState.action.isOpen = false
      //   updateState.action.message = ""
      // }
      return updateState
      
    case ActionTypes.TOGGLE_SEARCH_BOX:
      updateState.isOpenSearchBar = action.payload
      return updateState
    
    default:
      return state
  }
}

export default toolsReducer