
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCTS_COUNT,
  
  CHANGE_PAGE,
  CHANGE_PER_PAGE,
  CHANGE_SORT,
  CHANGE_FILTER,
  LAST_VISIT_PAGE,
  REMOVE_CACHE_PRODUCT,
  IS_LOADING,
  CLEAR_PRODUCT_DETAILS, ADD_BRAND, SEARCH_CHANGE, CHANGE_PRODUCT_TYPE
} from "./types"

import api from "../../apis/api"

async function fetchFromDb(api, dispatch, options){
  dispatch(loading(true))
  let body = JSON.stringify({ filter: options.filterGroup, search: options.search  })
  const products = await
  api.post(`/api/products/?page=${options.currentPage}&perPage=${options.perPageShow}&authorId=${options.authorId}&sort=${options.sort}&order=${options.order}`, body)
  console.log(products)
  if (products && products.length > 0) {
    dispatch({
      type: FETCH_PRODUCTS,
      payload: products,
      currentPage: options.currentPage,
      perPageShow: options.perPageShow
    })
    dispatch(loading(false))
  } else{
    dispatch({
      type: FETCH_PRODUCTS,
      payload: [],
      currentPage: options.currentPage,
      perPageShow: options.perPageShow
    })
    dispatch(loading(false))
  }
}


function compareFilterGroup(filterGroup, oldFilterGroup){
let result = false
  let upKeys = Object.keys(filterGroup)
  let olKeys = Object.keys(oldFilterGroup)
  if (upKeys.length !== olKeys.length){
    console.log("difference between key")
    result = true
    return result
  }
  // console.log(upKeys, olKeys, filterGroup,  oldFilterGroup)
  
  for (let key in filterGroup){
    for (let key2 in oldFilterGroup){
      if(key2 !== key){
        result = true
        console.log("has difference")
      } else {
        if(filterGroup[key].length !== oldFilterGroup[key2].length){
          result = true
        }else {
          result = false
        }
      }
    }
  }
  return result
}

function changeOldState(productState, isAuthProducts, options, dispatch){
  let stateChange = false
  const { currentPage, perPageShow, sort, order, filterGroup, authorId, search } = options
  
  let f = {value: "", fields: []}
  if(!search){
    f = { value: "", fields: [] }
  } else  {
    f = { value: search.value, fields: search.fields }
  }
  
  if (productState.currentPage != currentPage ){
    stateChange = true
    
  } else if (productState.sortValue.field !== sort){
    stateChange = true
    
  } else if (productState.sortValue.field !== sort){
    stateChange = true
    
  } else if (productState.isAuthProducts != authorId){
    // console.log("changes authorId")
    stateChange = true
    
  } else if (productState.perPageShow != perPageShow){
    stateChange = true
    
  } else if (f.value !=  productState.search.value){
    filterProductsCount(authorId, filterGroup, dispatch, search)
    stateChange = true
    
  } else if(compareFilterGroup(filterGroup, productState.filterGroup)){
    console.log("filterGroup change")
    filterProductsCount(authorId, filterGroup, dispatch)
    stateChange = true
  }
  
  return stateChange
}


export const fetchProducts = (options)=>async(dispatch, getState)=>{
  try {
    const  { currentPage, perPageShow, sort, order, filterGroup, search, authorId } = options
    const { productState, auth } = getState()
    
    let existProductsPage = productState.cacheProducts.findIndex(cachePage=>{
      return cachePage.pageNo === currentPage && cachePage.perPage === perPageShow
    })
  
    api.post("/api/filter-products", {
      currentPage: Number(currentPage),
      pageSize: Number(perPageShow)
    }).then(response=>{
      return dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products,
        totalProducts: response.data.totalProducts,
        currentPage,
        perPageShow
      })
    }).catch(ex=>{
      console.log(ex)
    })
    
    // if(changeOldState(productState, options, dispatch)){
    //   console.log("update product and delete all cache products")
    //   dispatch(removeCacheProduct())
    //   return fetchFromDb(api, dispatch, {currentPage, perPageShow, authorId, sort, order, filterGroup, search})
    // }
    //
    // if(existProductsPage !== -1) {
    //   console.log("dispatch products from cache")
    //   return dispatch({
    //     type: FETCH_PRODUCTS,
    //     payload: productState.cacheProducts[existProductsPage].products,
    //     currentPage,
    //     perPageShow
    //   })
    // } else {
    //   console.log("dispatch form database")
    //   fetchFromDb(api, dispatch, {currentPage, perPageShow, authorId, sort, order})
    // }
    
    } catch(ex){
    console.log(ex, "fetch error");
  }
}


// export const fetchAdminProducts = (authorId)=>async(dispatch, getState, api)=>{
//   try{
//     const products = await api.get(`/api/products/${authorId}`)
//     dispatch({
//       type: FETCH_PRODUCTS,
//       payload: products
//     })
//   } catch(ex){
//     console.log(ex);
//   }
// }
export const productsCount =  (authorId)=> async (dispatch) =>{
  try{
    const counts = await api.get(`/api/products-count/${authorId}`)
    dispatch({
      type: PRODUCTS_COUNT,
      payload: counts
    })
  } catch(ex){
    console.log(ex);
  }
}

export const filterProductsCount =  async (authorId, filterGroup, dispatch, search={},)=> {
  console.log("filter product count")
  try{
    const counts = await api.post(`/api/filter-products-count/${authorId}`, JSON.stringify({filter: filterGroup, search }))
    console.log(counts)
    dispatch({
      type: PRODUCTS_COUNT,
      payload: counts
    })
   
   dispatch(removeCacheProduct())
   
  } catch(ex){
    console.log(ex);
  }
}

export const fetchProduct = (lastVisitPageNumber, id)=>async(dispatch, getState, api)=>{
  try{
    dispatch(loading(true))
    const product = await api.get(`/api/product/${id}`)
    if(product._id){
      dispatch(loading(false))
      dispatch({
        type: FETCH_PRODUCT,
        payload: product,
        lastVisitPageNumber: lastVisitPageNumber ? lastVisitPageNumber : getState().productState.lastVisitPageNumber
      })
    }
  } catch(ex){
    console.log(ex);
  }
}

export const addProduct = (data, push)=> async(dispatch, getState)=>{
  try{
    // let formData = new FormData()
    // for (let key in data){
    //   formData.append(key, data[key])
    // }
 
    const product = await api.post("/api/product", data)
    console.log(product);
    
    
    // if(product.id){
    //   dispatch({
    //     type: FETCH_PRODUCTS,
    //     payload: product
    //   })
    //   push("/products")
    // }
  } catch(ex){
    console.log(ex);
  }
}
export const updateProduct = (data, push)=> async(dispatch, getState, api)=>{
  try{
    let formData = new FormData()
    for (let key in data){
      formData.append(key, data[key])
    }
    const product = await api.post(`/api/update-product/${data._id}`, formData)
    console.log(product);
    if(product._id){
      dispatch({
        type: UPDATE_PRODUCT,
        payload: product
      })
      // push("/products")
    }
  } catch(ex){
    console.log(ex);
  }
}

export const deleteProduct = (id)=> async(dispatch, getState, api)=>{
  try{
    const product = await api.post(`/api/delete-product/${id}`)
    if(product._id){
      dispatch({
        type: DELETE_PRODUCT,
        payload: product._id
      })
    }
  } catch(ex){
    console.log(ex);
  }
}

export const addNewBrand = (brandName)=> async(dispatch, getState, api)=>{
  try{
    const brandId = await api.post(`/api/add-brand`, JSON.stringify({name: brandName}))
    console.log(brandId)
    if(brandId){
      dispatch({
        type: ADD_BRAND,
        payload: brandId
      })
    }
  } catch(ex){
    console.log(ex);
  }
}


export function changePage(pageNumber){
  return {
    type: CHANGE_PAGE,
    payload: pageNumber
  }
}
export function changeProductType(authId){
  return {
    type: CHANGE_PRODUCT_TYPE,
    payload: authId
  }
}
export function changePerPage(perPage){
  return {
    type: CHANGE_PER_PAGE,
    payload: perPage
  }
}

export function changeSort(sortValue){
  return {
    type: CHANGE_SORT,
    payload: sortValue
  }
}
export function changeFilter(filterGroup){
  return {
    type: CHANGE_FILTER,
    payload: filterGroup
  }
}
export function changeLastVisitPage(lastVisitPageNumber){
  return {
    type: LAST_VISIT_PAGE,
    payload: lastVisitPageNumber
  }
}

export function removeCacheProduct(){
  return {
    type: REMOVE_CACHE_PRODUCT,
    payload: []
  }
}

export function loading(isLoading){
  return {
    type: IS_LOADING,
    payload: isLoading
  }
}
export function clearProductDetails(){
  return {
    type: CLEAR_PRODUCT_DETAILS,
    payload: {}
  }
}


export function onSearchChange(value){
  return {
    type: SEARCH_CHANGE,
    payload: value
  }
}