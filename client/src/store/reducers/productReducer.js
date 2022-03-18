import {
  ADD_BRAND,
  CHANGE_FILTER,
  CHANGE_PAGE,
  CHANGE_PER_PAGE, CHANGE_PRODUCT_TYPE, CHANGE_SORT, CLEAR_PRODUCT_DETAILS,
  DELETE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS, IS_LOADING, LAST_VISIT_PAGE,
  PRODUCTS_COUNT, REMOVE_CACHE_PRODUCT, SEARCH_CHANGE
}  from "src/store/actions/types";


let initialProductState = {
  currentPage: 1,
  perPageShow: 5,
  sortValue: { field: "", order: ""},   // * ==>
  filteredProducts: [],   // * all products
  cacheProducts:[
    // { pageNo: 1, perPage: 5, products: {} },
    // { pageNo: 2, perPage: 5, products: {} },
    // { pageNo: 3, perPage: 5, products: {} },
    // { pageNo: 4, perPage: 5, products: {} }
  ],
  
  filterGroup: {
    // brand:["5fe22b119cb042bfffb23edf", "FSDFFFFFFFFFFF"],
    // display: ["super", "IPS"]
  },
  
  search: { value: "", fields: ["name", "brand"] },
  
  products: [],
  
  productDetails: {},   // ? for single product
  isAuthProducts: "",
  totalProducts: 0,
  lastVisitPageNumber: 1,
  isLoading: false
}


function setProductsCache(perPageShow, currentPage, newProducts, cacheProducts){
  let updateCacheProducts = [...cacheProducts]
  let existPage = updateCacheProducts.findIndex(item=>item.pageNo === currentPage )
  if(existPage === -1){
    updateCacheProducts.push({
      pageNo: currentPage,
      perPage: perPageShow,
      products: newProducts
    })
  }
  // o.forEach(item=>{
  //   console.log(item.perPage === other.perPage);
  // })
  //
  return updateCacheProducts
}

const productsReducer=(state=initialProductState, action)=>{
  switch(action.type){
    
    case FETCH_PRODUCTS:
      let store = setProductsCache(action.perPageShow, action.currentPage, action.payload, state.cacheProducts)
      return {
        ...state,
        products: action.payload,
        totalProducts: action.totalProducts,
        cacheProducts: store
      }
    
    case FETCH_PRODUCT:
      return {
        ...state,
        productDetails: action.payload,
        lastVisitPageNumber: action.lastVisitPageNumber ? action.lastVisitPageNumber : 1
      }
    
    case PRODUCTS_COUNT:
      return {...state, totalProducts: action.payload }
      
      // case FETCH_PRODUCT:
      //   return {...state, products: [action.payload] }
    
    case DELETE_PRODUCT:
      let i = state.products.findIndex(p=>p._id == action.payload )
      state.products.splice(i, 1)
      return {...state}
      
    case ADD_BRAND:
      return state
    
    case CHANGE_PAGE:
      return {...state, currentPage: action.payload }
    
    case CHANGE_PER_PAGE:
      return {...state, perPageShow: action.payload }
    
    case CHANGE_SORT:
      return {...state, sortValue: action.payload } // * { field: "", order: "" }
      
    case CHANGE_FILTER:
      return {...state, filterGroup: action.payload }
      
    case LAST_VISIT_PAGE:
      return {...state, lastVisitPageNumber: action.payload }
      
    case REMOVE_CACHE_PRODUCT:
      return {...state, cacheProducts: [] }
      
     case IS_LOADING:
      return {...state, isLoading: action.payload }
      
     case CLEAR_PRODUCT_DETAILS:
      return {...state, productDetails: {} }
      
    case SEARCH_CHANGE:
      return {...state, search: {...state.search, value: action.payload}}
      
     case CHANGE_PRODUCT_TYPE:
      return {...state, isAuthProducts: action.payload }
    
    default:
      return state
  }
}

export default productsReducer
