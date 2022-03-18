import React from 'react'
import { connect } from "react-redux"
import {fetchProduct, deleteProduct, changePage, changeLastVisitPage, clearProductDetails} from "src/store/actions/productAction"

import Button from "src/components/Button/Button"
import Preload from "src/components/Preload/Preload"
import { Row, Container, Col } from "src/components/Layout"

import fullPath from "src/utils/fullLink"
import Loader from "src/components/Loader/Loader";
import ProgressBar from "react-topbar-progress-indicator";

const ProductDetails = (props) => {
  const { productId } = props.match.params
  const { productDetails } = props
  const { auth } = props

  React.useEffect(()=>{
    let [_, currentPage] = props.location.search.slice(1).split("=")
    props.fetchProduct(currentPage, productId)
    // props.changeLastVisitPage(currentPage)
     return ()=>{
      props.clearProductDetails()
    }
  }, [productId])

  function pushBack(){
    props.history.push("/products")
  }
  
  function getTime(timestamp){
    let now = new Date(timestamp * 1000).toLocaleString()
    return now
  }

  return (
    <Container fluid>
      { props.isLoading && <ProgressBar /> }
      <Button
        onClick={pushBack}
        theme="red"
        iconStyle={{marginRight: "5px"}}
        waves="green" color="white" flat
        icon="fal fa-arrow-left">Back</Button>

      <h1>Details</h1>
      { props.isLoading && <Loader isLoading={props.isLoading} style={{top: "60px"}} /> }
      { productDetails && productDetails._id && (
        <div>
          <img src={fullPath(productDetails.photo)} alt={productDetails.name} srcSet=""/>
          <h2>Name: {productDetails.name}</h2>
          <p>{productDetails.description}</p>
          <p>Brand: {productDetails.brand_id && productDetails.brand_id.name }</p>
          <p>Price: ${productDetails.price}</p>
          <p>In Stock: {productDetails.quantity}</p>
          <p>In Added Date: On { getTime(productDetails.created_at && productDetails.created_at.T)}</p>
          <p>Last Updated Date: On { getTime(productDetails.updated_at && productDetails.updated_at.T)}</p>

          <div>
            {productDetails.author && (
              <div>
                 <p>Author Name: {productDetails.author.username}</p>
                  <p>Author Email: {productDetails.author.email}</p>
                  <p>Author ID: {productDetails.author._id}</p>
              </div>
            )}
          </div>
 

          <p className="product--description">{productDetails.description}</p>
            <strong>${productDetails.price}</strong>
          
           <strong className="product_id">{productDetails.authorid}</strong>
           <div>
              <Preload exact="true" to={`/product/${productDetails._id}`}><Button theme="blue">Details</Button></Preload>
              
              { productDetails.authorid != auth._id
                  ? <Button theme="blue">Add To Cart</Button>
                  : <Button theme="red" onClick={()=>props.deleteProduct(productDetails._id)}>Delete</Button>
              }

            </div>
          {  productDetails && productDetails.authorid === props.auth._id &&
            <Preload to={`/update-product/${productDetails._id}`}><Button>Update Product</Button></Preload> }

        </div>
      ) }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  productDetails: state.productState.productDetails,
  isLoading: state.productState.isLoading,
  auth: state.auth
})



export default connect(mapStateToProps, {
  fetchProduct,
  deleteProduct,
  changePage,
  changeLastVisitPage,
  clearProductDetails
})(ProductDetails)
