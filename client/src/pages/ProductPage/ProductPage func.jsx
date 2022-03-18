import React from 'react'
import { connect} from "react-redux"
import { fetchProducts, deleteProduct,  productsCount} from "src/store/actions/productAction"
import "./ProductPage.scss"

import { Row, Container, Col } from "src/components/Layout"
import Preload from "src/components/Preload/Preload"
import FilterComponent from "src/Common/FilterComponent"

import Pagination from 'src/components/Pagination/Pagination'

import fullPath from "src/utils/fullLink"

const ProductPage = (props) => {

  const { products, auth } = props 
  const { authorId } = props.match.params

  const [ currentPage, setCurrentPage ] = React.useState(1)
  const [ paginatedProducts, setProducts ] = React.useState([])
  const [totalProduct, setTotalProduct] = React.useState(0)

  const perPageShow = 5

  React.useEffect(()=>{
    if(authorId){
      props.fetchProducts(currentPage, perPageShow, authorId)
      props.productsCount(authorId)
    } else{
      props.fetchProducts(currentPage, perPageShow, "")
      props.productsCount("all")
    }
  }, [0])

  React.useEffect(()=>{
    paginationCal(currentPage)
  }, [products.products])

  function changePageNumber(page){
    setCurrentPage(page)
    paginationCal(page)
    props.fetchProducts(page, perPageShow)
  }

  function paginationCal(currentPage){
    let startIndex = perPageShow * ( currentPage - 1 )
    let endIndex = currentPage * perPageShow
    setProducts(products.products.slice(startIndex, endIndex))
  }


  function renderProductList(){
  
    return products.products && products.products.length > 0 && products.products.map(product=>{
      return (
        <div key={product._id}>
          <Preload exact="true" to={`/product/${product._id}`}>
            <div className="product" key={product._id}>
              <img src={fullPath(product.photo)} alt="" srcset=""/>
              <div className="title_wrapper">
                <h3 className="title_wrapper--title">{product.name}</h3>
              </div>
            </div>
          </Preload>  
        </div>      
      )
    })
  }

  return (
    <Container fluid>
      <h1>Products {products.totalProducts}</h1>
        <FilterComponent />
      <div className="products">
        { renderProductList() }
      </div>
      <Pagination
        totalProducts={products.totalProducts}
        perPageShow={perPageShow}
        currentPage={currentPage}
        onPageChange={changePageNumber}
      />
    </Container>
  )
}

function mapStateToProps(state){
  return {
    products: state.products,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {fetchProducts, deleteProduct, productsCount})(ProductPage)
