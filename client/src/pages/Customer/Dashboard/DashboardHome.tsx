import React from 'react';
import SideBar from "pages/Customer/Dashboard/SideBar";
import {Outlet, Route, Routes} from "react-router-dom"
import Layout from "../../../Common/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";
import {toggleSideBar} from "actions/toolsAction";



const DashboardHome = () => {
  
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  const dispatch = useDispatch()
  
  const {tools: { openSideBar }}= useSelector((state: RootStateType)=>state)
  
  const [navigationHeight, setNavigationHeight] = React.useState(0)
  
  function clickOnOverlay(){
    dispatch(toggleSideBar({
      where: "customer_dashboard",
      isOpen: false
    }))
  }
  
  function handleResize() {
    // let navigation = document.querySelector(".navigation") as HTMLDivElement
    // let footer = document.querySelector(".footer") as HTMLDivElement
    // setNavigationHeight(navigation.clientHeight + footer.clientHeight)
    // let s = (footer ? footer.offsetHeight : 0) + (navigation ? navigation.offsetHeight: 0 )
    // console.log(s)
    // contentRef.current.style.minHeight = `calc(100vh - ${s}px)`
  }
  
  React.useEffect(()=>{
    handleResize()
    window.addEventListener("resize", handleResize)
    return ()=> window.removeEventListener("resize", handleResize)
  }, [])
  
  return (
      <Layout openSidebar={openSideBar.where === "admin_dashboard" && openSideBar.isOpen} className="container-1400 page_wrapper">
        <div className="left_sidebar">
          <div className="left_sidebar_content">
            <SideBar />
          </div>
        </div>
  
        <div className="content" >
            <div onClick={clickOnOverlay} className={[openSideBar.where === "admin_dashboard" && openSideBar.isOpen && "open-sidebar" ? "content-overlay" : ""].join(" ")} />
            {/*<CustomerRoutes />*/}
            <Outlet/>
        </div>
     </Layout>
  );
};


const CustomerRoutes = (props)=>{
  
  return (
    <Routes>
      {/*<Route path="/auth/customer/cart" component={CartPage} />*/}
      {/*<Route path="/auth/customer/wishlist" component={Wishlist} />*/}
      {/*<Route path="/auth/customer/address-book" component={AddressBook} />*/}
    </Routes>
  )
  
  
}

export default DashboardHome;