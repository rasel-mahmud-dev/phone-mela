import React, {Component} from 'react';
import {connect} from 'react-redux';


import { Route,  Link, NavLink } from "react-router-dom"
import Row from "../../../components/Layout/Row/Row";
import {Col, Container} from "../../../components/Layout";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import ProductList from "../Components/ProductList/ProductList";
import Category from "../Components/Category/Category";


import("./Dashboard.scss")

function PageHeader(props) {
  const {breadcrumbArr} = props
  
  return <Row my={20}>
    <Col><h2 className="page-content-body__title">{breadcrumbArr[breadcrumbArr.length - 1]}</h2></Col>
    <Col>
      <div className="pull-right">
        {/*<Breadcrumb>*/}
        {/*  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>*/}
        {/*  <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>*/}
        {/*  <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>*/}
        {/*</Breadcrumb>*/}
        
        <Breadcrumb>
           { breadcrumbArr.map(item=>(
             <Breadcrumb.Item href="#">{item}</Breadcrumb.Item>
           ))}
        </Breadcrumb>
      </div>
    </Col>
  </Row>;
}


class Dashboard extends Component {
  
  render() {
    const { match } = this.props
    let path = window.location.pathname.split("/admin/dashboard")[1]
    let h =  path.split("/")
    h[0] = "Dashboard"
    
    return (
      <div className="dashboard-wrapper">
        <DashboardSideBar />
        <div className="page-content-body">
          <PageHeader  breadcrumbArr={h}   />
          <Container full>
            <Route path={ match.path + "/products/physical/category"} component={Category} />
            <Route path={ match.url + "/products/physical/product-list"} component={ProductList} />
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}


export default connect(mapStateToProps, {})(Dashboard);