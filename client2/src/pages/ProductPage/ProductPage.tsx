import React, {ChangeEvent} from 'react'
import { connect} from "react-redux"
import {
  deleteProduct,
  fetchBrands,
  toggleHandleCart,
  toggleHandleWishlist,
  setFilteredProducts,
  onSearchChange,
} from "src/store/actions/productAction"
import "./ProductPage.scss"

import queryString from 'query-string';

import Preload from "src/components/UI/Preload/Preload"


import fullPath from "src/utils/fullLink"
import {toggleBackdrop, togglePopup} from "src/store/actions/toolsAction";
import Loader from "src/components/UI/Loader/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faFeather,
  faSortAlphaDownAlt,
  faSortAmountDown,
  faSortAmountUp,
  faSortUp,
  faTable
} from "@fortawesome/pro-regular-svg-icons";
import {faSort} from "@fortawesome/pro-solid-svg-icons";
import api from "src/apis/api";
import {RootStateType} from "store/index";
import {ProductStateType, ProductType} from "reducers/productReducer";
import Product from "../../Common/Product/Product";
import Pagination from "UI/Pagination/Pagination";
import {FilterAttributesType, FILTERED_PRODUCTS_TYPE, ProductAttributesName} from "store/types/prouductReduceTypes";
import Modal from "UI/Modal/Modal";
import FilterSidebar from "src/Common/FilterSidebar/FilterSidebar";

import withLocation from "../../utils/withLocation";


interface ProductPageProps{
  match: any
  location: any
  productState: ProductStateType
  fetchProducts: ()=>void
  fetchBrands: ()=>void
  setFilteredProducts: (payload: FILTERED_PRODUCTS_TYPE)=>void
  onSearchChange: (args: string)=>void
  toggleHandleCart: (arg0: ProductType, isShowPopup: boolean) => void,
  toggleHandleWishlist: (arg0: ProductType, isShowPopup: boolean) => void,
}


interface State {

}

let prevPageNumber;

class ProductPage extends React.Component<ProductPageProps, Readonly<State>>{
  
  componentDidMount(){
    let q = queryString.parse(this.props.location.search)
    if(q.search){
      this.props.onSearchChange(q.search as string)
      // this.props.(q.search as string)
    }
    
    // console.log(this.props.productState.filterGroup.in)
    // api.post("/api/v2/filter-products", {
    //   in: this.props.productState.filterGroup.in
    // }).then(r => {
    //   console.log(r)
    // }).catch(ex=>{
    //   console.log(ex)
    // })
  
    this.props.fetchBrands()
  
    const { selectedAttributeFilter, currentPage, perPageShow, sortValue:{ field, order }, filterGroup } = this.props.productState
    
  
    this.handleFetchProduct(selectedAttributeFilter)
    
    // let payload = { currentPage, perPageShow, sort: field, order: order, filterGroup: filterGroup, authorId: "" }
    // if(authorId){
    //   this.props.productsCount(authorId)
    //   this.props.fetchProducts({
    //     ...payload,
    //     authorId: authorId
    //   })
    //
    // } else{
    //
    //   this.props.productsCount("all")
    //   this.props.fetchProducts(payload)
    // }
  
    // api.get("/api/products").then(response=> {
    //   if (response.status === 200) {
    //     // console.log(response.data)
    //     // setState({
    //     //   ...state,
    //     //   products: response.data
    //     // })
    //   }
    // })
  }
  
  handleFetchProduct(selectedAttributeFilter: FilterAttributesType) {
  
    const {filteredProducts} = this.props.productState
    type T = {
      [key  in ProductAttributesName]: any
    }
  
    let inV: T | null = {
      ram: []
    }
    
    let range = {}
    
    let selectedAttributeFilterKey: ProductAttributesName
    for (selectedAttributeFilterKey in selectedAttributeFilter) {
      let eachSec: any = selectedAttributeFilter[selectedAttributeFilterKey as keyof FilterAttributesType]
      eachSec.forEach((item: { value: any; })=>{
        if(selectedAttributeFilterKey === "battery"
          || selectedAttributeFilterKey === "internal_storage"
          || selectedAttributeFilterKey === "primary_camera"
          || selectedAttributeFilterKey === "secondary_camera"
        ){
        
          // filter range value/// [64, 127]
          if (range[selectedAttributeFilterKey]) {
            if (range) {
              range[selectedAttributeFilterKey].push(item.value)
            }
          } else {
            range[selectedAttributeFilterKey] = [item.value]
          }
          
        } else {
          if (inV[selectedAttributeFilterKey]) {
            if (inV) {
              inV[selectedAttributeFilterKey].push(item.value)
            }
          } else {
            inV[selectedAttributeFilterKey] = [item.value]
          }
        }
      })
    }
    
    this.props.setFilteredProducts({
      ...filteredProducts,
      isLoading: true,
      message: "Loading"
    })
    api.post("/api/v2/filter-products", {
      in: inV,
      range: {  // range: {internal_storage: [[64, 127], [128, 255]]}
        ...range
        // battery: [[4000, 5000], [5000, 6000]],
        // ram: [[2, 4], [6, 8]],
      },
      // search: { title: "S" },
      search: this.props.productState.search.value ? this.props.productState.search.value : "",
      pagination: {
        page_size: filteredProducts.perPageShow,
        page_number: filteredProducts.currentPage,
      },
      order: {
        field: filteredProducts.orderBy, // "title" | "created_at" | "sold",
        by: filteredProducts.orderDirection // asc or desc
      }
    }).then(r => {
      console.log(r)
      if(r.status === 200){
        // setTimeout(()=>{
          // append or splice product if pagination page number is changed
          // if(prevPageNumber && prevPageNumber !== this.props.productState.filteredProducts.currentPage){
          //     alert("append products")
          //
          //   this.props.setFilteredProducts({
          //       ...this.props.productState.filteredProducts,
          //       products: [...this.props.productState.filteredProducts.products, ...r.data.products],
          //       totalProducts: r.data.totalProducts,
          //       isLoading: false,
          //       message: ""
          //   })
          //
          //
          // } else {
      
            this.props.setFilteredProducts({
              ...this.props.productState.filteredProducts,
              products: r.data.products,
              totalProducts: r.data.totalProducts,
              isLoading: false,
              message: ""
            })
          // }
          
        // }, 2000)
      }
    }).catch(ex=>{
      console.log(ex)
    })
  }

  componentDidUpdate(prevProps:ProductPageProps, prevState: Readonly<State>){
     // if(prevProps.productState.products !== this.props.productState.products ){
     //   this.paginationCal(this.state.currentPage)
     //   this.setState({ filteredProducts: this.props.productState.products })
     // }
    
    if(prevProps.productState.selectedAttributeFilter !== this.props.productState.selectedAttributeFilter){
      this.handleFetchProduct(this.props.productState.selectedAttributeFilter)
    }
    if(prevProps.productState.filteredProducts.currentPage !== this.props.productState.filteredProducts.currentPage){
      this.handleFetchProduct(this.props.productState.selectedAttributeFilter)
    }
    if(prevProps.productState.filteredProducts.search !== this.props.productState.filteredProducts.search ){
      this.handleFetchProduct(this.props.productState.selectedAttributeFilter)
    }
    if(prevProps.productState.filteredProducts.orderBy !== this.props.productState.filteredProducts.orderBy ){
      this.handleFetchProduct(this.props.productState.selectedAttributeFilter)
    }
    if(prevProps.productState.filteredProducts.orderDirection !== this.props.productState.filteredProducts.orderDirection ){
      this.handleFetchProduct(this.props.productState.selectedAttributeFilter)
    }
    
  }

  changePageNumber=(pageNumber: number)=>{
    this.props.setFilteredProducts({
      ...this.props.productState.filteredProducts,
      currentPage: pageNumber
    })
    prevPageNumber = this.props.productState.filteredProducts.currentPage
  }
  
  
  
  changeSortHandler=(e: ChangeEvent<HTMLSelectElement> )=>{
    let orderBy:string = (e.target as HTMLSelectElement).value
    this.props.setFilteredProducts({
      ...this.props.productState.filteredProducts,
      orderBy: orderBy,
    } as FILTERED_PRODUCTS_TYPE)
  }
  
  changeSortDirectionHandler=(e: any )=>{
    this.props.setFilteredProducts({
      ...this.props.productState.filteredProducts,
      orderDirection: this.props.productState.filteredProducts.orderDirection === "asc" ? "desc" : "asc",
    } as FILTERED_PRODUCTS_TYPE)
  }
  
  onChangePerPage=()=>{
    // const { currentPage, perPageShow, sortValue:{ field, order }, filterGroup } = this.props.productState
    // console.log("change per page")
    // this.props.fetchProducts({
    //   currentPage: 1,
    //   perPageShow: perPage,
    //   sort: field,
    //   order: order,
    //   filterGroup: filterGroup,
    //   authorId: ""
    // })
    // this.props.changePage(1)
    // this.props.changePerPage(perPage)
  }
  
  changeFilter=()=>{
    // let filterGroup = {} // "brand": [ "apple", "samsung" ]
    // let fieldIds = []
    // for (let i = 0; i < e.length; i++) {
    //   if (fieldIds.indexOf(e[i]._id) === -1){
    //     fieldIds.push(e[i]._id)
    //   }
    // }
    //
    // for (let ii = 0; ii < e.length; ii++) {
    //   if(fieldIds.indexOf(e[ii]._id) !== -1){
    //     if( filterGroup[e[ii].fieldName] ){
    //       filterGroup[e[ii].fieldName].push(e[ii].value)
    //     } else{
    //       filterGroup[e[ii].fieldName] = [e[ii].value]
    //     }
    //   }
    // }
    // if (tauched) {
    //   const { currentPage, perPageShow, sortValue:{ field, order } } = this.props.productState
    //   this.props.changePage(1)
    //   this.props.fetchProducts({
    //     currentPage: 1,
    //     perPageShow: perPageShow,
    //     sort: field,
    //     order: order,
    //     filterGroup: filterGroup,
    //     authorId: ""
    //   })
    //   this.props.changeFilter(filterGroup)
    // }
  }
  
  // productSort=(products, name, order)=>{
  //   let res = false
  //   let g = products.sort((a, b)=>{
  //     if(a[name]){
  //       let aa
  //       let bb
  //       if(order === "asc"){
  //         aa = a[name].toLowerCase()
  //         bb = b[name].toLowerCase()
  //       } else {
  //         aa = b[name].toLowerCase()
  //         bb = a[name].toLowerCase()
  //       }
  //
  //       if(aa > bb){ return 1  }
  //       else if(aa < bb){ return -1}
  //       else { return 0 }
  //       res = true
  //     } else{
  //       res = false
  //     }
  //   })
  //   return res ? g : products
  // }
  
  handleSearch=(value: string)=>{
    console.log(value)
  }
  
   renderProductList=()=>{
    const { filteredProducts, wishlist, cartProducts, currentPage } = this.props.productState

    return filteredProducts.products && filteredProducts.products.length > 0 && filteredProducts.products.map(product=>{
      return <Product
        key={product.id}
        prod={product}
        wishlist={wishlist}
        cartProducts={cartProducts}
        handleAddToCart={()=>this.props.toggleHandleCart(product, true)}
        handleToggleWishlist={()=>this.props.toggleHandleWishlist(product, true)}
      />
    })
  }
  
  handleAddToCart(){
  
  }
  
  handleToggleWishlist(prod: ProductType) {

    // if(auth.isAuthenticated) {
    //   let idx = wishlist.findIndex(cp=>cp.product_id.toString() === prod.id.toString())
    //
    //   if(idx !== -1) {
    //     dispatch(removeFromWishlist(wishlist[idx].id, auth.id))
    //   } else {
    //     dispatch(addToWishlist(prod, auth.id))
    //   }
    // } else {
    //   dispatch(togglePopup({message: "Login First", isOpen: true, isSucceed: false}))
    // }
  }
  
  
  
  render(){
  
  const { products, filteredProducts, totalProducts, perPageShow, currentPage } = this.props.productState

    const sortOptions = [
      {label: "Most Popular", val: "total_sales"},
      {label: "Title", val: "title"},
      {label: "Latest", val: "created_at"}
    ]
  
    function findSortLabel() {
      let item = sortOptions.find(so=>so.val === filteredProducts.orderBy)
      if(item){
        return item.label
      } else {
        return  "Normal"
      }
    }
    
    return (
    <div className="container-1600">
      
      { filteredProducts.isLoading  && <Modal className="top-[20vh]"  inProp={filteredProducts.isLoading}>
          
          <Loader className="big_loader"  />
     
        </Modal>}
      
      {/*      { filteredProducts.isLoading  && <div className="fixed top-[20vh] left-1/2">*/}
			{/*	<Loader  />*/}
      {/*</div> }*/}
      
      
      <div className="product_filter_page flex">
  
        <div className="sidebar fixed top-0 select-none">
          <div className="filter_bar h-[100vh] w-[280px] px-0l">
            <div className="pt-[60px] "/>
            <h2 className="font-medium text-md m-2 ">Filter</h2>
            <FilterSidebar brands={this.props.productState.brands} />
          </div>
        </div>
        
        <div className="content ml-[280px] pl-4 w-full ">
          <div className="mt-4">
      
            <h1 className="main_title">Mobiles
              <span className="text-xs font-medium ml-2">(Showing 1 – {
                (filteredProducts.perPageShow * filteredProducts.currentPage) > filteredProducts.totalProducts
                  ? filteredProducts.totalProducts
                  : (filteredProducts.perPageShow * filteredProducts.currentPage)
              }
              products of {filteredProducts.totalProducts} products)</span>
            </h1>
      
            <div className="flex items-center justify-between">
              <div>
                Filter By <span className="text-blue-400 font-medium text-sm">
                {findSortLabel()}
                
              </span>
              </div>
              <div className="flex">
                <li className="list-none"><FontAwesomeIcon icon={faTable}/></li>
                <li className="list-none ml-4">
                  <div className="flex items-center">
                  <FontAwesomeIcon
                    onClick={this.changeSortDirectionHandler}
                    icon={ filteredProducts.orderDirection === "asc" ? faSortAmountUp : faSortAmountDown }
                    className="text-gray-600 link mr-2"
                  />
                    {/*<span className="text-primary-500 text-sm font-medium ml-1">Most Popular</span>*/}
                    <select value={filteredProducts.orderBy} onChange={this.changeSortHandler}
                            className="link border-none bg-transparent text-sm font-normal outline-none" name="" id="">
                      {sortOptions.map(o=>(
                        <option value={o.val} key={o.label}>{o.label} </option>
                      ))}
                    </select>
                  </div>
                </li>
              </div>
      
            </div>
    
          </div>
  
          {/*<h1>Render at: {Date.now().toString()}</h1>*/}
          <div className="single_products_list filter_page">
            { this.renderProductList() }
          </div>
  
  
          <div className="flex justify-center">
            <Pagination
              totalProducts={filteredProducts.totalProducts}
              perPageShow={filteredProducts.perPageShow}
              currentPage={filteredProducts.currentPage}
              onPageChange={this.changePageNumber}
            />
          </div>
          
          
        </div>
      </div>
      
      {/*<SortComponent onChangeSort={}  />*/}
      {/*  <FilterComponent*/}
      {/*    toggleBackdrop={this.props.toggleBackdrop}*/}
      {/*    tools={this.props.tools}*/}
      {/*    handleSearch={this.handleSearch}*/}
      {/*    onChangePerPage={this.onChangePerPage}*/}
      {/*    totalItem={totalProducts}*/}
      {/*    perPageShow={perPageShow}*/}
      {/*    onChangeSort={this.changeSortHandler}*/}
      {/*    changeFilter={this.changeFilter}*/}
      {/*  />*/}
      {/*  */}
     
   
      
      
    </div>
  )
}
}

function mapStateToProps(state: RootStateType){
  return {
    productState: state.productState,
    auth: state.auth,
    tools: state.tools
  }
}

export default connect(mapStateToProps, {
  deleteProduct,
  toggleBackdrop,
  fetchBrands,
  setFilteredProducts,
  onSearchChange,
  toggleHandleCart,
  toggleHandleWishlist
})(withLocation(ProductPage))


