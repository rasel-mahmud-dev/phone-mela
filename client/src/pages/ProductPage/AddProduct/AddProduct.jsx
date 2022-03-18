import React from 'react'
import {connect} from 'react-redux'
import {addNewBrand, addProduct, fetchProduct, updateProduct} from 'src/store/actions/productAction'

import {Col, Container, Row} from "src/components/Layout"
import File from "src/components/Form/Input/File"
import Input2 from "src/components/Form/Input/Input2"
import Button from "src/components/Button/Button"
import api from "src/apis/api"
import Select2 from "../../../components/Form/Select/Select2";

class AddProduct extends React.Component {
  
  state = {
    title: "SDF",
    userData: {
      name: {value: "", tauched: false, errorMessage: ""},
      description: {value: "", tauched: false, errorMessage: ""},
      price: {value: "", tauched: false, errorMessage: ""},
      brand_id: {value: { name:"", id: "" }, tauched: false, errorMessage: ""},
      quantity: {value: "", tauched: false, errorMessage: ""},
      cover: { value: null, previewLink: "", tauched: false, errorMessage: ""}
    },
    brands: [],
    newBrandAdd: false
  }
  
  componentDidMount() {
    const {productId} = this.props.match.params
    if (productId) {
      this.props.fetchProduct(false, productId)
    }
    
    api.get("/api/brands").then(response => {
      if(response.status === 200) {
        this.setState({...this.state, brands: response.data})
      }
    })
    
    
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    const { productId} = this.props.match.params
    
    if (prevProps.productState.productDetails  !== this.props.productState.productDetails){
      let userData = {...this.state.userData}
      const product = this.props.productState.productDetails
      for (let key in this.state.userData) {
        if (key === "cover_photo"){
          userData.cover.value = product.photo
        } else{
          userData[key].value = product[key]
        }
      }
      this.setState({userData})
    }
  }
  
  handleChange = ({target: {name, value, type, file}}) => {
    const {userData} = this.state
    if (type !== "file") {
      if(name === "brand_id"){
          this.setState({
            userData: { ...userData, [name]: { ...userData[name], value: { name: value.name, id: value.id }  } }
          })
      } else{
        this.setState({
          userData: {
            ...userData,
            [name]: {
              ...userData[name],
              value: value
            }
          }
        })
      }
      
    }  else {
      this.setState({
        userData: {
          ...userData,
          [name]: {
            ...userData[name],
            value: file
          }
        }
      })
    }
  }
  
  handleSignup = (e) => {
    e.preventDefault()
    const {userData} = this.state
    let isComplete = true;
    let body = {}
    
    for (let key in userData) {
      if (key === "brand_id"){
        isComplete = isComplete && !!userData[key].value.id
        body[key] = userData[key].value.id
      } else if (key !== "cover") {
        isComplete = isComplete
            && !!userData[key].value
            // && userData[key].tauched
            && !userData[key].errorMessage
        body[key] = userData[key].value
      }
    }
   
    if (isComplete) {
      const { productId} = this.props.match.params
      
      if (productId) {
        this.props.updateProduct({
          ...body,
          id: productId,
          cover: userData.cover.value,
          author_id: this.props.auth.id
        }, this.props.history.push)
      } else {
        let body2 = {
          ...body,
          cover: userData.cover.value,
          author_id: this.props.auth.id
        }
   
        this.props.addProduct({
          ...body,
          cover: userData.cover.value,
          title: userData.name.value,
          author_id: this.props.auth.id
        }, this.props.history.push)
      }
    }
  }
  
  toggleOptionClick=(isExpand)=>{
    // if(isExpand) {
    //   api.get("/api/brands").then(brands => {
    //     this.setState({brands})
    //   })
    // }
  }
  
  toggleAddNewBrandComponent=(e)=>{
    e.preventDefault()
    this.setState({ newBrandAdd: !this.state.newBrandAdd })
  }
  
  
  render() {
    const {productId} = this.props.match.params
    const {products, auth} = this.props
    const {userData: state, newBrandAdd } = this.state
    
    return (
        <Container fluid>
          <Row justify="center">
            <Col col={12} md={6}>
              <h2> {productId ? "Update Product" : "Add New Product"}</h2>
              
              <form onSubmit={this.handleSignup}>
                <Input2
                    name="name"
                    label="Name"
                    value={state.name.value}
                    error={state.name.errorMessage}
                    onChange={this.handleChange}
                />
                <Input2
                    inputDisable={true}
                    label="Description"
                    name="description"
                    value={state.description.value}
                    error={state.description.errorMessage}
                    onChange={this.handleChange}
                />
                {/*<Input2 */}
                {/*  label="Brand"*/}
                {/*  name="brand"*/}
                {/*  value={state.brand.value}*/}
                {/*  error={state.brand.errorMessage}*/}
                {/*  onChange={this.handleChange}*/}
                {/*/>*/}
                
                <Button onClick={ this.toggleAddNewBrandComponent  } theme="red" flat m={{t: "16px", b: "0px", x: "0px"}}>New Brand</Button>
                { newBrandAdd && <AddNewBrand addNewBrand={this.props.addNewBrand} /> }
                
                <Select2
                    toggleOptionClick={this.toggleOptionClick}
                    label="Brand"
                    inputDisable
                    options={this.state.brands ? this.state.brands : []}
                    optionsName={{key: "name", id: "id"}}
                    name="brand_id"
                    value={ state.brand_id.value && state.brand_id.value.name }
                    onChange={this.handleChange}
                />
  
                <Input2
                  label="Cover Photo Link"
                  name="cover"
                  value={state.cover.value}
                  error={state.cover.errorMessage}
                  onChange={this.handleChange}
                />
                
                <Input2
                    name="price"
                    label="Enter Price"
                    type="number"
                    value={state.price.value}
                    error={state.price.errorMessage}
                    onChange={this.handleChange}
                />
                <Input2
                    name="quantity"
                    label="Enter Quantity"
                    type="number"
                    value={state.quantity.value}
                    error={state.quantity.errorMessage}
                    onChange={this.handleChange}
                />
                
                {/*<File value={state.cover_photo.previewLink} onChange={this.handleChange} name="cover_photo" type="file"/>*/}
                
                
                <Button type="submit" mt={10} theme="green">{productId ? "Update" : "Add Product"}</Button>
              </form>
            </Col>
          </Row>
        </Container>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth, productState: state.productState}
}

export default connect(mapStateToProps, {addProduct, fetchProduct, updateProduct, addNewBrand})(AddProduct)



const AddNewBrand = (props)=>{
  const { addNewBrand } = props
  const [brand, setBrand] = React.useState("")
  function add(e){
    e.preventDefault()
    addNewBrand(brand)
  }
  return (
    <div>
      <form onSubmit={add}>
        <Input2 name="brand" label="Brand Name" onChange={(e)=> setBrand(e.target.value) }  />
        <Button type="submit" theme="blue" p={{y: "2px"}} m={{x: '0px'}} flat>Add</Button>
      </form>
    </div>
  )
}

