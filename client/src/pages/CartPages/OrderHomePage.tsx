import React from 'react'
import {Outlet} from "react-router-dom";
import OrderContext from "pages/CartPages/orderContext";


const OrderHomePage = () => {
  
  const [value, setValue] = React.useState(null)
  
  return (
    
    <div className="bg-white pt-4">
      
      <div className="container-1200 px-3">
        <OrderContext.Provider value={{
            state: value,
            actions: {
            save: (value: any)=> setValue(value)
          }
        }}>
          <Outlet/>
        </OrderContext.Provider>
      </div>
    </div>
  
  )
}

export default OrderHomePage