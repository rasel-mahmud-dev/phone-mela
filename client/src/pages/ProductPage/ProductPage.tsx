import React, {ChangeEvent} from 'react'
import { connect} from "react-redux"
import {
  deleteProduct,
  fetchBrands,
  toggleHandleCart,
  toggleHandleWishlist,
  setFilteredProducts,
  onSearchChange, AddCartPayload, AddWishlistPayload,
} from "src/store/actions/productAction"
import "./ProductPage.scss"
import queryString from 'query-string';
import { toggleBackdrop, toggleSideBar} from "src/store/actions/toolsAction";
import Loader from "src/components/UI/Loader/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faFilter,  faSortAmountDown,  faSortAmountUp,  faTable } from "@fortawesome/pro-regular-svg-icons";

import api from "src/apis/api";
import {RootStateType} from "store/index";
import { ProductStateType} from "reducers/productReducer";
import Product from "../../Common/Product/Product";
import Pagination from "UI/Pagination/Pagination";
import {FilterAttributesType, FILTERED_PRODUCTS_TYPE, ProductAttributesName} from "store/types/prouductReduceTypes";
import Modal from "UI/Modal/Modal";
import FilterSidebar from "src/Common/FilterSidebar/FilterSidebar";

import withLocation from "../../utils/withLocation";
import {OpenSideBarType, ToolsReducerType} from "reducers/toolsReducer";
import Layout from "../../Common/Layout/Layout";
import fullLink from "src/utils/fullLink";
import Sidebar from "components/Sidebar/Sidebar";
import HomePageSidebar from "pages/HomePage/components/HomePageSidebar";
import {FaAngleLeft} from "react-icons/all";
import Preload from "UI/Preload/Preload";


interface ProductPageProps{
  match: any
  location: any
  productState: ProductStateType
  tools: ToolsReducerType
  fetchProducts: ()=>void
  fetchBrands:  any
  setFilteredProducts: (payload: FILTERED_PRODUCTS_TYPE)=>void
  onSearchChange: (args: string)=>void
  toggleHandleCart: (arg0: AddCartPayload, isShowPopup: boolean,  timeout: number) => void,
  toggleHandleWishlist: (arg0: AddWishlistPayload, isShowPopup: boolean, timeout: number) => void,
  toggleSideBar: (args: OpenSideBarType) => void,
}

interface State {
  httpFetch: boolean
  httpMessage: string
}

let prevPageNumber;

class ProductPage extends React.Component<Readonly<ProductPageProps>, Readonly<State>>{
  
  private selectedFilterItems: any;
  
  
  
  constructor(props) {
    super(props);
    this.state = {
      httpFetch: false,
      httpMessage: ""
    }

    this.handleToggleSideBar = this.handleToggleSideBar.bind(this)
    this.returnFilterResultItems = this.returnFilterResultItems.bind(this)
  }
  
  componentDidMount(){
    let q = queryString.parse(this.props.location.search)
    if(q.search){
      this.props.onSearchChange(q.search as string)
    }
 
    this.props.fetchBrands((brands)=>{ })
    const { selectedAttributeFilter, currentPage, perPageShow, sortValue:{ field, order }, filterGroup } = this.props.productState
    this.handleFetchProduct(selectedAttributeFilter)
  }
  
  handleFetchProduct(selectedAttributeFilter: FilterAttributesType) {
  
    const {filteredProducts} = this.props.productState
    type T = {
      [key  in ProductAttributesName]: any
    }
    
    type inVType  = {
      brand_id?: string[],
      ram?: number[]
      cores?: number[]
      display?: string[]
      network_type?: string[]
      processor_brand?: string[]
      resolution_type?: string[]
      screen_size?: number[]
      os_version?: string[]
      operating_system?: string[]
    }
    
    let inV: inVType =  {
    
    }
    
    let range = {
    
    }
    
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
              (inV[selectedAttributeFilterKey] as any).push(item.value)
            }
          } else {
            inV[selectedAttributeFilterKey] = [item.value]
          }
        }
      })
    }
  
    const selectedBrands = this.props.productState.filterGroup.selectedBrands
    const brandIds = []
    if(selectedBrands && selectedBrands.length > 0){
      selectedBrands.forEach(b=>{
        brandIds.push(b._id)
      })
    }
    inV["brand_id"] = brandIds
    // inV["brand_id"] = ["62a638e8bf617d070dc47309"]
    
    
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
      search: this.props.productState.search.value ? {title: this.props.productState.search.value} : null,
      pagination: {
        page_size: filteredProducts.perPageShow,
        page_number: filteredProducts.currentPage,
      },
      order: {
        field: filteredProducts.orderBy, // "title" | "created_at" | "sold",
        by: filteredProducts.orderDirection // asc or desc
      }
    }).then(r => {
      if(r.status === 200){
        this.props.setFilteredProducts({
          ...this.props.productState.filteredProducts,
          products: r.data.products,
          totalProducts: r.data.totalProducts,
          isLoading: false,
          message: ""
        })
        this.setState({
          httpFetch: true,
          httpMessage: ""
        })
      }
    }).catch(ex=>{
      this.props.setFilteredProducts({
        ...this.props.productState.filteredProducts,
        isLoading: false,
        totalProducts: 0,
        products: [],
        message: ex.message
      })
      this.setState({
        httpFetch: true,
        httpMessage: ex.message
      })
    })
  }

  componentDidUpdate(prevProps:ProductPageProps, prevState: Readonly<State>){
    
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
    
    // capture brand change
    if(prevProps.productState.filterGroup.selectedBrands !== this.props.productState.filterGroup.selectedBrands){
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
  
  renderProductList=()=>{
    const { filteredProducts, wishlist, cartProducts, currentPage } = this.props.productState

    return filteredProducts.products && filteredProducts.products.length > 0 && filteredProducts.products.map(product=>{
      return <Product
        key={product._id}
        prod={product}
        wishlist={wishlist}
        cartProducts={cartProducts}
        handleAddToCart={()=>this.props.toggleHandleCart({
          title: product.title,
          price: product.price,
          cover: product.cover,
          product_id: product._id
        }, true, 1000)}

        handleToggleWishlist={()=>this.props.toggleHandleWishlist({
          title: product.title,
          price: product.price,
          cover: product.cover,
          product_id: product._id
        }, true, 1000)}

      />
    })
  }
    
    handleCloseSidebar=()=>{
    this.props.toggleSideBar({
      where: "filterPage",
      isOpen: false
    })
  }
  
  handleToggleSideBar(){
    this.props.toggleSideBar({
      where: "filterPage",
      isOpen: true
    })
  }
    
    handleClearSearch =()=>{
        this.props.onSearchChange("")
    }
  
  returnFilterResultItems(returnJSX, selected){
    if(selected) {
      this.selectedFilterItems = () => returnJSX
    } else  {
      return null
    }
  }

  render(){
    const {
      products,
      filteredProducts,
      totalProducts,
      perPageShow,
      currentPage
    } = this.props.productState
    
    const {  openSideBar } = this.props.tools
    
    
    const sortOptions = [
      {label: "Most Popular", val: "sold"},
      {label: "Title", val: "title"},
      {label: "Latest", val: "createdAt"}
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
      <div className="container-1400 page_wrapper">
       
       <Sidebar isOpenSidebar={openSideBar.isOpen} header={()=>(
           <div className="sidebar_nav bg-primary-400 flex items-center px-3">
               <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full mr-2" onClick={this.handleCloseSidebar}>
                    <FaAngleLeft className="text-light-500" />
               </div>
                <Preload to="/" className="flex items-center text-decoration-none text-initial">
                    <div className="w-36 md:w-40">
                        <img className="w-full" src="/Group3.png" alt="" />
                    </div>
                </Preload>
           </div>
       )} onClose={this.handleCloseSidebar}>
           
           <h2 className="font-medium text-md m-2 ">Filter</h2>
            <FilterSidebar returnFilterResultItems={this.returnFilterResultItems} brands={this.props.productState.brands} />
    </Sidebar>
        
        
        <div className="content pl-4 w-full px-2 mt-2 " id="content">
  
          {this.props.productState.search.value && (
              <div className="flex justify-between items-start">
                  <h4 className="m-0 p-0 text-sm font-normal white-space-wrap">Search Result for <span className="text-primary-400 ">{this.props.productState.search.value}</span></h4>
                  <span onClick={this.handleClearSearch} className="text-sm bg-primary-400 rounded px-4 py-1 text-white">Clear Search</span>
              </div>
          ) }
          

          <div className="">
            <div className="mt-2">
              <h1 className="main_title">Mobiles
                <span className="text-xs font-medium ml-2">(Showing 1 – {
                  (filteredProducts.perPageShow * filteredProducts.currentPage) > filteredProducts.totalProducts
                    ? filteredProducts.totalProducts
                    : (filteredProducts.perPageShow * filteredProducts.currentPage)
                }
                  products of {filteredProducts.totalProducts} products)</span>
              </h1>
        
              <div className="flex items-center justify-between mt-2">
                <button className="text-sm bg-primary-400 rounded px-4 py-1 text-white" onClick={this.handleToggleSideBar}>
                  <span className="font-normal text-sm mr-2">Filter</span>
                  <FontAwesomeIcon icon={faFilter} />
                </button>
         
                
                
                <div className="flex">
                  <li className="list-none"><FontAwesomeIcon icon={faTable}/></li>
                  <li className="list-none ml-4">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        onClick={this.changeSortDirectionHandler}
                        icon={ filteredProducts.orderDirection === "asc" ? faSortAmountUp : faSortAmountDown }
                        className="text-primary-400 link mr-2"
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
  
  
            <div>
              { this.selectedFilterItems && (
                <div className="flex items-start mt-2">
                  <h1 className="text-sm font-medium cursor-pointer">Clear all</h1>
                  {this.selectedFilterItems()}
                </div>
              ) }
            </div>
            
            {/*<h1>Render at: {Date.now().toString()}</h1>*/}
  
            { (filteredProducts.products === null) && (
              <div className="min-h-[60vh]">
                <h1 className="text-2xl font-medium text-secondary-400 text-center mb-2 mt-4">No Product Match on Filter</h1>
                <div className="max-w-[200px] mx-auto">
                  <img className="w-full" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650739089/phone_mela/avatar/not_found.png")} alt=""/>
                </div>
              </div>
            ) }
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4">
              { this.renderProductList() }
            </div>
  
            { this.state.httpFetch && this.state.httpMessage && (
              <h3 className="text-center font-medium text-secondary-400">{this.state.httpMessage}</h3>
            ) }
            
            
      
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
  
      
    <div className="container-1600">
      
      { filteredProducts.isLoading  &&
      <Modal className="top-[20vh]"  inProp={filteredProducts.isLoading}>
        <Loader className="big_loader"  />
      </Modal>}
    </div>
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
  toggleHandleWishlist,
  toggleSideBar,
})(withLocation(ProductPage))


