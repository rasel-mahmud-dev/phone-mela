import {ActionTypes} from "actions/actionTypes";
import {BrandType, HomePageSectionProductsType, ProductType} from "reducers/productReducer";
import {TOGGLE_CART_ACTION, TOGGLE_WISHLIST_ACTION} from "actions/productAction";



export type Review = {
  rate: number, // of 5
  title: string,
  summary: string,
  customer_name: string,
  customer_avatar: string,
  customer_id: number,
  customer_photos: string[],
  created_at: Date
  
  one_star: number
  two_star: number
  three_star: number
  four_star: number
  five_star: number
}


export type QuestionAndAnswer = {
  question_id: number
  question: string
  answer?: string
  questioner_id: number
  answerer_id: number
  created_at: string
}

export interface ProductDetailType{
  attributes: {[key in ProductAttributesName]: string | number},
  author_id: string,
  avatar: string,
  rate: number,
  brand_id: string,
  brand_name: string,
  cover: string,
  averageRate?: number,
  created_at: string,
  description: string,
  discount: number,
  email: string,
  _id: string,
  price: number,
  seller_id: string,
  stock: string,
  tags: string,
  title: string,
  updated_at: string,
  username: string,
  highlights: string[] | null,
  product_questions: QuestionAndAnswer[] | null,
  specifications: {
    label: string,
    props: {
      [key: string] : string
    }[]
  }[] | null,
  reviews: Review[] | null
  colors: {color: string, url: string}[] | null
  ram: {v: string, url?: string}[] | null
  storage: {v: string, url?: string}[] | null
  specification_id: number
}


export type ProductAttributesName  =
"ram" |
  "internal_storage" |
// "display" |
"network_type" |
"processor_brand" |
"cores" |
"screen_size" |
"resolution_type" |
"primary_camera" |
"secondary_camera" |
"battery" |
"operating_system" |
"os_version"

export type ProductAttributesType = {
  id: any,
  attributeName: ProductAttributesName,
  label: string,
  options: {name: string, value: string | number | object}[],
  optionsForAdd?: {name:string, value: number}[]
}

export type FilterAttributesType = {
  [key in ProductAttributesName]?: { value: number | string, options: {name: string, value: number}[]};
}


export type FILTERED_PRODUCTS_TYPE = {
  products: ProductType[], // * all products
  totalProducts: number,
  currentPage: number,
  perPageShow: number,
  isLoading: boolean,
  // brand: number[]
  search: string,
  message: string,
  orderBy: "createdAt"  | "sold" | "title"
  orderDirection: "asc" | "desc"
}


export type FetchBrands = {
  type: ActionTypes.FETCH_BRANDS,
  payload: BrandType[]
}

export type SELECTED_ATTRIBUTE_FILTER_Action_Type = {
    type: ActionTypes.SELECTED_ATTRIBUTE_FILTER,
    payload: object

}

export type FilteredProducts_Dispatch = {

}
export type FILTERED_PRODUCTS_ACTION = {
    type: ActionTypes.SET_FILTERED_PRODUCTS,
    payload: FILTERED_PRODUCTS_TYPE
}

export type FETCH_HOMEPAGE_PRODUCTS_ACTION = {
    type: ActionTypes.FETCH_HOMEPAGE_PRODUCTS,
    payload: HomePageSectionProductsType
}

export type FILTER_SEARCH_CHANGE_ACTION = {
  type: ActionTypes.FILTER_SEARCH_CHANGE,
  payload: string
}
export type CHANGE_SEARCH_VALUE_ACTION = {
  type: ActionTypes.SEARCH_CHANGE,
  payload: { value: string, fields: any }
}

export type ProductReducerActionType = FetchBrands
  | SELECTED_ATTRIBUTE_FILTER_Action_Type
  | FILTERED_PRODUCTS_ACTION
  | CHANGE_SEARCH_VALUE_ACTION
  | FILTER_SEARCH_CHANGE_ACTION
| FETCH_HOMEPAGE_PRODUCTS_ACTION | TOGGLE_CART_ACTION | TOGGLE_WISHLIST_ACTION
