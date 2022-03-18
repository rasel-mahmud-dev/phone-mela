import React from 'react'
import { connect} from "react-redux"
import {
  fetchProducts,
  deleteProduct,
  productsCount,
  changePerPage,
  changeSort,
  changePage,
  changeFilter
} from "src/store/actions/productAction"
import "./ProductPage.scss"

import { Row, Container, Col } from "src/components/Layout"
import Preload from "src/components/Preload/Preload"
import Button from "src/components/Button/Button"
import FilterComponent from "src/Common/FilterComponent"

import Pagination from 'src/components/Pagination/Pagination'

import fullPath from "src/utils/fullLink"
import {toggleBackdrop} from "src/store/actions/toolsAction";
import Loader from "src/components/Loader/Loader";



class ProductPage extends React.Component{
  
  componentDidMount(){
    const { authorId } = this.props.match.params
    
    const { currentPage, perPageShow, sortValue:{ field, order }, filterGroup } = this.props.productState
    
    let payload = { currentPage, perPageShow, sort: field, order: order, filterGroup: filterGroup, authorId: "" }
    if(authorId){
      this.props.productsCount(authorId)
      this.props.fetchProducts({
        ...payload,
        authorId: authorId
      })
      
    } else{
     
      this.props.productsCount("all")
      this.props.fetchProducts(payload)
    }
  }

  componentDidUpdate(prevProps, prevState){
     // if(prevProps.productState.products !== this.props.productState.products ){
     //   this.paginationCal(this.state.currentPage)
     //   this.setState({ filteredProducts: this.props.productState.products })
     // }
  }

  changePageNumber=(page)=>{
    const { authorId } = this.props.match.params
   
    this.props.changePage(page)
    const { currentPage, perPageShow, sortValue:{ field, order }, filterGroup } = this.props.productState
    
    this.props.fetchProducts({
      currentPage: page,
      perPageShow,
      sort: field,
      order: order,
      filterGroup: filterGroup,
      authorId: ""
    })
  }
  
  changeSortHandler=(sortValue, tauched)=>{
    const { currentPage, perPageShow, filterGroup } = this.props.productState
    const { _id: authorId} = this.props.auth
    
    if (tauched) {
      this.props.fetchProducts({
        currentPage: 1,
        perPageShow,
        sort: sortValue.field,
        order: sortValue.order,
        filterGroup: filterGroup,
        authorId: ""
      })
      this.props.changePage(1)
      this.props.changeSort(sortValue)
    }
  }
  
  onChangePerPage=(perPage)=>{
    const { currentPage, perPageShow, sortValue:{ field, order }, filterGroup } = this.props.productState
    console.log("change per page")
    this.props.fetchProducts({
      currentPage: 1,
      perPageShow: perPage,
      sort: field,
      order: order,
      filterGroup: filterGroup,
      authorId: ""
    })
    this.props.changePage(1)
    this.props.changePerPage(perPage)
  }
  
  changeFilter=(e, tauched)=>{
    let filterGroup = {} // "brand": [ "apple", "samsung" ]
    let fieldIds = []
    for (let i = 0; i < e.length; i++) {
      if (fieldIds.indexOf(e[i]._id) === -1){
        fieldIds.push(e[i]._id)
      }
    }
    
    for (let ii = 0; ii < e.length; ii++) {
      if(fieldIds.indexOf(e[ii]._id) !== -1){
        if( filterGroup[e[ii].fieldName] ){
          filterGroup[e[ii].fieldName].push(e[ii].value)
        } else{
          filterGroup[e[ii].fieldName] = [e[ii].value]
        }
      }
    }
    if (tauched) {
      const { currentPage, perPageShow, sortValue:{ field, order } } = this.props.productState
      this.props.changePage(1)
      this.props.fetchProducts({
        currentPage: 1,
        perPageShow: perPageShow,
        sort: field,
        order: order,
        filterGroup: filterGroup,
        authorId: ""
      })
      this.props.changeFilter(filterGroup)
    }
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
  
  handleSearch=(value)=>{
    console.log(value)
  }
  
   renderProductList=()=>{
    const { products, currentPage } = this.props.productState
     
    return products && products.length > 0 && products.map(product=>{
      return (
        <div key={product.id}>
          <Preload exact="true" to={`/product/${product.id}/?currentPage=${currentPage}`}>
            <div className="product" key={product._id}>
              <img src={fullPath(product.cover)} alt="" srcSet=""/>
              <div className="title_wrapper">
                <h3 className="title_wrapper--title">{product.title}</h3>
              </div>
              <p className="title_wrapper--price">{product.price}tk</p>
            </div>
          </Preload>
          {/*<Button theme="red" onClick={()=>this.props.deleteProduct(product._id)}>Delete</Button>*/}
          {/*<Preload to={`/update-product/${product._id}`}><Button>Update Product</Button></Preload>*/}
        </div>      
      )
    })
  }


  render(){
  
  const { products, totalProducts, perPageShow, currentPage, isLoading } = this.props.productState
  
  return (
    <Container>
      { isLoading  && <Loader style={{marginTop: "130px"}}  />  }
      
      <h1 className="main_title">Total Products ({totalProducts})</h1>
      
      {/*<SortComponent onChangeSort={}  />*/}
        <FilterComponent
          toggleBackdrop={this.props.toggleBackdrop}
          tools={this.props.tools}
          handleSearch={this.handleSearch}
          onChangePerPage={this.onChangePerPage}
          totalItem={totalProducts}
          perPageShow={perPageShow}
          onChangeSort={this.changeSortHandler}
          changeFilter={this.changeFilter}
        />
        
      <div className="products">
        { this.renderProductList() }
      </div>
      <Pagination
        totalProducts={totalProducts}
        perPageShow={perPageShow}
        currentPage={currentPage}
        onPageChange={this.changePageNumber}
      />
    </Container>
  )
}
}

function mapStateToProps(state){
  return {
    productState: state.productState,
    auth: state.auth,
    tools: state.tools
  }
}

export default connect(mapStateToProps, {
  fetchProducts,
  deleteProduct,
  productsCount,
  changePerPage,
  changePage,
  changeSort,
  changeFilter,
  toggleBackdrop
})(ProductPage)
