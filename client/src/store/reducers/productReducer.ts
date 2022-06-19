import {ActionTypes} from "src/store/actions/actionTypes";
import {FilterAttributesType, FILTERED_PRODUCTS_TYPE, ProductReducerActionType} from "store/types/prouductReduceTypes";

export interface WishList {
  _id: string
  cover?: string
  title: string
  customer_id: string
  createdAt: Date
  price: number
  product_id: string
}
export interface CartProductType {
  _id: string
  cover?: string
  title: string
  customer_id: string
  quantity: number
  createdAt: Date
  price: number
  product_id: string
}

export type ProductType = {
  _id: string
  attributes: string
  author_id: string
  seller_id: string
  rate?: number
  sold?: number
  brand_id: string
  cover: string
  createdAt: Date
  description: string
  discount: number
  stock?: number
  price: number
  tags: string
  title: string
  updatedAt: string
}
export type BrandType = {
  _id: string
  name: string
  updatedAt: string
}

export type HomePageSectionProductsType = {
  latest?: {
    label?: string,
    fields?: string[],
    products: ProductType[],
    sliderImages?: {url: string, low: string}[]
  },
  topRating?: {
    label?: string,
    fields?: string[],
    products: ProductType[],
    sliderImages?: {url: string, low: string}[]
  },
  topDiscount?: {
    label?: string,
    fields?: string[],
    products: ProductType[],
    sliderImages?: {url: string, low: string}[]
  },
  topFavorites?: {
    label?: string,
    fields?: string[],
    products: ProductType[],
    sliderImages?: {url: string, low: string}[]
  },
  topSales?: {
    label?: string,
    fields?: string[],
    products: ProductType[],
    sliderImages?: {url: string, low: string}[]
  }
}

export interface ProductStateType{
  currentPage: number,
  perPageShow: number,
  sortValue: { field: string, order: string},   // * ==>
  filteredProducts: FILTERED_PRODUCTS_TYPE,
  cacheProducts:[
    // { pageNo: 1, perPage: 5, products: {} },
    // { pageNo: 2, perPage: 5, products: {} },
    // { pageNo: 3, perPage: 5, products: {} },
    // { pageNo: 4, perPage: 5, products: {} }
  ],
  homePageSectionProducts: HomePageSectionProductsType,
  cartProducts: CartProductType[
    // {id: 0, product_id: 0, customer_id: 0,  title: "", price: 0, quantity: 10}
  ],
  wishlist: WishList[
    // {id: 0, product_id: 0, customer_id: 0, title: "", price: 0}
  ],
  brands: BrandType[]
  filterGroup: {
    // price: [10, 100],
    // brand:["brand_id", "brand_id"],
    // sortBy: [{field: "views", order: -1, id: "1"}],
    // display: ["super", "IPS"],
    
    selectedBrands: {name:string, _id: string}[],
    range: {
      // "rom": [["8", "16"]]
      // "ram": [["4", "8"]]
      "battery": [number, number][] // [["4000", "5000"], ["5000", "6000"]] //  battery 4000 - 5000 and 5000 - 6000
    },
    in: {
      display: string[],
      camera: number[],
      ram: number[],
      rom: number[]
    }
  },
  selectedAttributeFilter: FilterAttributesType,
  search: { value: string, fields: string[] },
  products: [],
  productDetails: {},   // ? for single product
  isAuthProducts: "",
  totalProducts: 0,
  lastVisitPageNumber: 1,
  isLoading: false
}


let initialProductState: ProductStateType  = {
  currentPage: 1,
  perPageShow: 100,
  sortValue: { field: "", order: ""},   // * ==>
  filteredProducts: {
    products: [], // * all products
    totalProducts: 0,
    isLoading: false,
    message: "",
    search: "",
    currentPage: 1,
    perPageShow: 20,
    
    orderBy: "createdAt",
    orderDirection: "desc"
  },
  cacheProducts:[
    // { pageNo: 1, perPage: 5, products: {} },
    // { pageNo: 2, perPage: 5, products: {} },
    // { pageNo: 3, perPage: 5, products: {} },
    // { pageNo: 4, perPage: 5, products: {} }
  ],
  brands: [],
  homePageSectionProducts: {
    latest: {
      label: "LATEST DEVICES",
      fields: ["createdAt"],
      products: []
    },
    topFavorites: { label: "TOP 10 BY FANS", products: []},
    topSales: {label: "Top Selling",
      // fields: ["total_sales"],
      products: [],
      sliderImages: [
        {
          url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c3.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c6.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c7.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
      ]
    },
    topDiscount: {label: "Top Offers",fields: ["discount"],products: [],
      sliderImages: [
        {
          url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c3.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c6.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c7.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
      ]
    },
    topRating: {
      label: "Top Rating",
      fields: ["rate"],
      products: [],
      sliderImages: [
        {
          url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c3.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c6.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
        {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c7.jpg",
          low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
        },
      ]
    }
  },
  cartProducts: [
    // {_id: 0, product_id: 0, customer_id: 0,  title: "", price: 0, quantity: 10}
  ],
  wishlist: [
    // {id: 0, product_id: 0, customer_id: 0, title: "", price: 0}
  ],
  
  filterGroup: {
    // price: [10, 100],
    // brands: [],
    // sortBy: [{field: "views", order: -1, id: "1"}],
    // brand:["brand_id", "brand_id"],
    // display: ["super", "IPS"],
    range: {
      // "rom": [["8", "16"]]
      // "ram": [["4", "8"]]
      battery: [[4000, 5000], [5000, 6000]] //  battery 4000 - 5000 and 5000 - 6000
    },
    in: {
      display: [],
      camera: [13],
      ram: [4],
      rom: [16]
    },
    selectedBrands: []
  },
  
  selectedAttributeFilter: {
    // battery: [],
    // ram: [
     // {name: '2GB', value: 2},
     // {name: '4GB', value: 4},
     // {name: '6GB', value: 6},
    // ]
// display: []
  },
  
  search: { value: "", fields: ["name", "brand"] },
  
  products: [],
  
  productDetails: {},   // ? for single product
  isAuthProducts: "",
  totalProducts: 0,
  lastVisitPageNumber: 1,
  isLoading: false
}


// function setProductsCache(perPageShow, currentPage, newProducts, cacheProducts){
//   let updateCacheProducts = [...cacheProducts]
//   let existPage = updateCacheProducts.findIndex(item=>item.pageNo === currentPage )
//   if(existPage === -1){
//     updateCacheProducts.push({
//       pageNo: currentPage,
//       perPage: perPageShow,
//       products: newProducts
//     })
//   }
//   // o.forEach(item=>{
//   //   console.log(item.perPage === other.perPage);
//   // })
//   //
//   return updateCacheProducts
// }

const productsReducer=(state = initialProductState, action: any): ProductStateType =>{
  let updatedState = {...state}
  let index = -1
  switch(action.type){
    //
    // case ActionTypes.FETCH_PRODUCTS:
    //   let store = setProductsCache(action.perPageShow, action.currentPage, action.payload, state.cacheProducts)
    //   return {
    //     ...state,
    //     products: action.payload,
    //     totalProducts: action.totalProducts,
    //     cacheProducts: store
    //   }
    //
    // case ActionTypes.FETCH_PRODUCT:
    //   return {
    //     ...state,
    //     productDetails: action.payload,
    //     lastVisitPageNumber: action.lastVisitPageNumber ? action.lastVisitPageNumber : 1
    //   }
    //
    // case ActionTypes.PRODUCTS_COUNT:
    //   return {...state, totalProducts: action.payload }
    //
    //   // case FETCH_PRODUCT:
    //   //   return {...state, products: [action.payload] }
    //
    // case ActionTypes.DELETE_PRODUCT:
    //   let i = state.products.findIndex(p=>p.id === action.payload )
    //   state.products.splice(i, 1)
    //   return {...state}
    //
    // case ActionTypes.ADD_BRAND:
    //   return state
    //
    case ActionTypes.FETCH_BRANDS:
      updatedState.brands = action.payload
      return  updatedState
    
      
    case ActionTypes.FETCH_HOMEPAGE_PRODUCTS:
      if(action.payload.latest) {
        updatedState.homePageSectionProducts.latest!.products = action.payload.latest.products
      }
      if(action.payload.topFavorites) {
        updatedState.homePageSectionProducts.topFavorites!.products = action.payload.topFavorites.products
      }
      if(action.payload.topDiscount) {
        updatedState.homePageSectionProducts.topDiscount!.products =  action.payload.topDiscount.products
      }
      if(action.payload.topSales) {
        updatedState.homePageSectionProducts.topSales!.products = action.payload.topSales.products
      }
      if(action.payload.topRating) {
        updatedState.homePageSectionProducts.topRating!.products = action.payload.topRating.products
      }
      return  updatedState
    
      
    case ActionTypes.SET_FILTERED_PRODUCTS:
      updatedState.filteredProducts =  {
        ...updatedState.filteredProducts,
        ...action.payload
      }
      return updatedState
    
    
    case ActionTypes.SELECTED_ATTRIBUTE_FILTER:
      updatedState.selectedAttributeFilter = action.payload
      return  updatedState
    
      
    case ActionTypes.SELECT_BRANDS:
      updatedState.filterGroup = {
        ...updatedState.filterGroup,
        selectedBrands: [...action.payload]
      }  // => [brand]
  
      // updatedState.filterGroup.selectedBrands = action.payload  // not do this
  
      return updatedState
    
    
    
    case ActionTypes.FETCH_WISHLIST:
      if(action.payload) {
        updatedState.wishlist = action.payload
      }
      return updatedState
    
    case ActionTypes.ADD_TO_WISHLIST:
      if(action.payload) {
        updatedState.wishlist = action.payload
      }
      return updatedState
  
    case ActionTypes.REMOVE_FROM_WISHLIST:
      if(action.payload) {
        updatedState.wishlist = action.payload
      }
      return updatedState
    
    
    case ActionTypes.ADD_CART_ITEM:
      if(action.payload) {
        updatedState.cartProducts = action.payload
      }
      return updatedState

    case ActionTypes.REMOVE_CART_ITEM:
      if(action.payload) {
        updatedState.cartProducts = action.payload
      }
      return updatedState
    
    case ActionTypes.FETCH_CART:
      updatedState.cartProducts = action.payload
      return updatedState

    // case ActionTypes.INCREASE_CART_ITEM:
    //   index = updatedState.cartProducts.findIndex(cp=>cp.id === action.payload)
    //   updatedState.cartProducts[index].quantity++
    //   return updatedState
    //
    // case ActionTypes.DECREASE_CART_ITEM:
    //   index = updatedState.cartProducts.findIndex(cp=>cp.id === action.payload)
    //   if(updatedState.cartProducts[index].quantity > 1){
    //     updatedState.cartProducts[index].quantity--
    //   }
    //   return updatedState
    //
    // case ActionTypes.CHANGE_PAGE:
    //   return {...state, currentPage: action.payload }
    //
    // case ActionTypes.CHANGE_PER_PAGE:
    //   return {...state, perPageShow: action.payload }
    //
    // case ActionTypes.CHANGE_SORT:
    //   return {...state, sortValue: action.payload } // * { field: "", order: "" }
    //
    // case ActionTypes.CHANGE_FILTER:
    //   return state
    //
    // case ActionTypes.LAST_VISIT_PAGE:
    //   return {...state, lastVisitPageNumber: action.payload }
    //
    // case ActionTypes.REMOVE_CACHE_PRODUCT:
    //   return {...state, cacheProducts: [] }
    //
    //  case ActionTypes.IS_LOADING:
    //   return {...state, isLoading: action.payload }
    //
    //  case ActionTypes.CLEAR_PRODUCT_DETAILS:
    //   return {...state, productDetails: {} }
      
    case ActionTypes.SEARCH_CHANGE:
      updatedState.search.value = action.payload.value
      return  updatedState
    
    case ActionTypes.FILTER_SEARCH_CHANGE:
      updatedState.filteredProducts= {
        ...updatedState.filteredProducts,
        search: action.payload
      }
      return updatedState
      
     // case ActionTypes.CHANGE_PRODUCT_TYPE:
     //  return {...state, isAuthProducts: action.payload }
    
    default:
      return state
  }
}

export default productsReducer
