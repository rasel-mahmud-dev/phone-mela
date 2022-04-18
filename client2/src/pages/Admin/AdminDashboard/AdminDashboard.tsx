import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';

import { Outlet } from "react-router-dom"
import Row from "components/UI/Layout/Row/Row";
import {Col, Container} from "components/UI/Layout";

import Breadcrumb from "components/UI/Breadcrumb/Breadcrumb";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";

import ProgressBar from "UI/ProgressBar/ProgressBar";
// import ProductList from "./productList/ProductList";
// import Category from "../Components/Category/Category";
// import AddProduct from "../../ProductPage/AddProduct/AddProduct";
// import Logs from "./Server/logs/Logs";


import("./styles.scss")

function PageHeader(props) {
  const {breadcrumbArr} = props
  
  return <Row my={20}>
    <Col><h2 className="page-content-body__title">
      {/*{breadcrumbArr[breadcrumbArr.length - 1]}*/}
    </h2></Col>
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


class AdminDashboard extends Component {
  
  render() {
    
    // let path = window.location.hash.split("#/admin/dashboard")[1]
    // if(path === ""){
    //
    // }
    // console.log(path)
    // let h =  path && path.split("/")
    // h[0] = "Dashboard"
    
    return (
      <div className="dashboard-wrapper2">
        <DashboardSideBar />
        
        <div className="page-content-body">
          <PageHeader  breadcrumbArr={[]}   />
          <div>
            
            <div>
              <Suspense fallback={<ProgressBar/>}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}


export default connect(mapStateToProps, {})(AdminDashboard);