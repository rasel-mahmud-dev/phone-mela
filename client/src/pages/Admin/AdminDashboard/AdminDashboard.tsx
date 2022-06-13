import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';

import { Outlet } from "react-router-dom"
import Row from "components/UI/Layout/Row/Row";
import {Col, Container} from "components/UI/Layout";

import Breadcrumb from "components/UI/Breadcrumb/Breadcrumb";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";

import ProgressBar from "UI/ProgressBar/ProgressBar";
import Layout from 'src/Common/Layout/Layout';
import {RootStateType} from "store/index";
import {toggleSideBar} from "actions/toolsAction";
import {ToolsReducerType} from "reducers/toolsReducer";
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

interface Props {
  toggleSideBar: (args: any)=> void
  tools: ToolsReducerType
}
interface State {

}

class AdminDashboard extends Component<Props, State> {
  
  clickOnOverlay =()=>{
    this.props.toggleSideBar({
      where: "customer_dashboard",
      isOpen: false
    })
  };
  
  render() {
    const { tools: {  openSideBar }} = this.props
    
    return (
      <Layout openSidebar={openSideBar.where === "admin_dashboard" && openSideBar.isOpen} className="container-1400 page_wrapper">
    
        <div className="left_sidebar bg-white py-2 pl-3 mt-4">
          <DashboardSideBar />
        </div>
        
        <div className="content">
          <div className="">
            <div onClick={this.clickOnOverlay} className={[openSideBar.where === "admin_dashboard" && openSideBar.isOpen && "open-sidebar" ? "content-overlay" : ""].join(" ")} />
            <PageHeader breadcrumbArr={[]}   />
          <div>
          <div>
            <Suspense fallback={<ProgressBar/>}>
              <Outlet />
            </Suspense>
          </div>
          </div>
        </div>
        </div>

      </Layout>
    );
  }
}

function mapStateToProps(state: RootStateType) {
  return {
    tools: state.tools
  };
}


export default connect(mapStateToProps, {toggleSideBar})(AdminDashboard);