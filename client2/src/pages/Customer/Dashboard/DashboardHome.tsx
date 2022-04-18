import React from 'react';
import SideBar from "pages/Customer/Dashboard/SideBar";
import CartPage from "src/pages/CartPages/Index";

import { Route, Routes } from  "react-router-dom"
import Wishlist from 'pages/CartPages/wishlist/Wishlist';
import AddressBook from "pages/Customer/Dashboard/AddressBook/AddressBook";



const DashboardHome = () => {
  return (
    <div>
      
      
      <div className="bg-primary-10">
        <div>
          <SideBar />
        </div>
  
        <div className="ml-[250px] px-4">
          <CustomerRoutes />
        </div>
      </div>
      
      
    </div>
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