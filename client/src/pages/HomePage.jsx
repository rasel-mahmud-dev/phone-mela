import React from 'react'
import { Container, Row, Col  } from 'components/Layout'
import Button from "components/Button/Button";
import axios from "axios";
import api from "../apis/api";


class HomePage extends React.Component {
  state = {
    isShowIndex : [],
    isShowBackdrop: false,
    products: []
    
  }

  
  componentDidMount(){
    api.get("/api/products").then(response=>{
      if (response.status === 200){
        this.setState({
          ...this.state,
          products: response.data
        })
      }
    })
  }
  
  handleToggleBackdrop=(e)=>{
    this.setState({ isShowBackdrop: !this.state.isShowBackdrop })
  }
  
  clickOnBackdrop=(e)=>{
    this.setState({ isShowBackdrop: false})
  }
  
  render() {
    const { isShowBackdrop } = this.state
    return (
      <Container>
        <h1 className="title">All Products</h1>
        { this.state.products && this.state.products.map(prod=>(
          <div>
            <h3>{prod.title}</h3>
            <p>{prod.price}</p>
          </div>
        )) }
      </Container>
    )
  }
}


export default HomePage