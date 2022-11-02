import {setSelectedAttributeFilter} from "actions/productAction";
import {OpenSideBarType} from "reducers/toolsReducer";
import {TOGGLE_SIDEBAR_ACTION} from "actions/toolsAction";

export enum ActionTypes {
  FETCH_USERS = 'fetch_users',
  FETCH_USER = 'fetch_user',

// products
  FETCH_HOMEPAGE_PRODUCTS = 'FETCH_HOMEPAGE_PRODUCTS',
    FETCH_HOMEPAGE_SECTION_PRODUCTS = 'FETCH_HOMEPAGE_SECTION_PRODUCTS',
  SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS',
  PRODUCTS_COUNT = 'products_count',
  FETCH_PRODUCTS = 'fetch_products',
  FETCH_PRODUCT = 'fetch_product',
  ADD_PRODUCT = 'add_product',
  UPDATE_PRODUCT = 'update_product',
  DELETE_PRODUCT = 'delete_product',

// Brands
  FETCH_BRANDS = 'FETCH_BRANDS',
  SELECT_BRANDS = 'SELECT_BRANDS',



// Cart
  ADD_TO_CART = "ADD_TO_CART",
  FETCH_CART = "FETCH_CART",
  REMOVE_TO_CART = "REMOVE_TO_CART",
  ADD_CART_ITEM = "ADD_CART_ITEM",
  INCREASE_CART_ITEM = "INCREASE_CART_ITEM",
  DECREASE_CART_ITEM = "DECREASE_CART_ITEM",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",


// wishlist
  ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",
  FETCH_WISHLIST = "FETCH_WISHLIST",


// action
  SET_ACTION = "SET_ACTION",
  TOGGLE_SEARCH_BOX = "TOGGLE_SEARCH_BOX",
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
  
  
  LOGIN = "login",
  LOGOUT = "logout",
  SIGN_UP = "signup",


// other products related
  CHANGE_PAGE = "change_page",
  CHANGE_PER_PAGE = "change_per_page",
  CHANGE_SORT = "change_sort",
  CHANGE_FILTER = "change_filter",
  
  LAST_VISIT_PAGE = "last_visit_page",
  REMOVE_CACHE_PRODUCT = "remove_cache_product",
  
  IS_LOADING = "isLoading",
  CLEAR_PRODUCT_DETAILS = "clear_product_details",
  
  
  ADD_BRAND = "add_brand",
  
  SEARCH_CHANGE = "search_change",
  FILTER_SEARCH_CHANGE = "FILTER_SEARCH_CHANGE",
  CHANGE_PRODUCT_TYPE = "change_product_type",
  
//tools Backdrop
  TOGGLE_BACKDROP = "TOGGLE_BACKDROP",


  SELECTED_ATTRIBUTE_FILTER = "SELECTED_ATTRIBUTE_FILTER"
  
  
}




export type SET_ACTION_PAYLOAD = {
  isSucceed: boolean,
  isOpen: boolean,
  message: string
} | undefined

export type SET_ACTION_TYPE = {
  type: ActionTypes.SET_ACTION,
  payload: SET_ACTION_PAYLOAD
}
export type TOGGLE_SEARCH_BOX_PAYLOAD = boolean

export type TOGGLE_SEARCH_BOX_TYPE = {
  type: ActionTypes.TOGGLE_SEARCH_BOX,
  payload: boolean
}



export type ToolsReducerActionType = SET_ACTION_TYPE | TOGGLE_SEARCH_BOX_TYPE | TOGGLE_SIDEBAR_ACTION
