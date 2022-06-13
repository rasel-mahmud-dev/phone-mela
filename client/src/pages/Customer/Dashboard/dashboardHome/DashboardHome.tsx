import React from 'react';
import "./styles.scss"
import api from "apis/api";
import {useSelector} from "react-redux";
import {RootStateType} from "store/index";

const DashboardHome = (props) => {

  const auth = useSelector((state: RootStateType)=>state.auth)
  
  const [orders, setOrders] = React.useState([])
  
  React.useEffect(()=>{
    api.post("/api/orders", {  customer_id: auth._id }).then(response=>{
      if(response.status === 200){
        setOrders(response.data)
      }
    })
  }, [])
  
  function calculateCosts(orders){
    let sum = 0
    orders && orders.forEach(order=>{
      sum  += order.price
    })
    return sum
  }
  
  return (
    <div className="bg-white p-4">
      <h1 className="text-3xl font-medium">Dashboard</h1>
     
      <div className="flex mt-4 flex-wrap flex-col sm:flex-row">
        <div className="border border-primary-400 rounded flex-1 py-6 ">
          <h1 className="text-primary-400 text-xl text-center font-medium">PURCHASES</h1>
          <h4 className="text-sm text-center font-medium mt-2">{orders.length} items</h4>
        </div>
        
        <div className="border border-primary-400 rounded flex-1 py-6 sm:ml-10 ml-0 mt-4 sm:mt-0">
          <h1 className="text-primary-400 text-xl text-center font-medium">TOTAL COST</h1>
          <h4 className="text-sm text-center font-medium mt-2">{calculateCosts(orders)} Taka</h4>
        </div>
        
      </div>
      
      <h2 className="text-xl font-medium mt-5">Orders</h2>
      <div className="overflow-x-auto">
        <table className="order_table">
          <thead>
          <tr>
            <th className="text-left">#ID</th>
            <th className="text-left">Price</th>
            <th className="text-left">Qty</th>
            <th className="text-center min-w-[150px]">Status</th>
          </tr>
          </thead>
          <tbody>
          
            { orders && orders.map((order, i)=>(
              <tr>
              <td>#{order._id}</td>
              <td>{order.price} Taka</td>
              <td>{order.quantity}</td>
              <td>
                <div className="flex justify-center">
                <div className="bg-primary-400 px-2 text-[12px] text-white rounded">{order.order_status}</div>
                </div>
              </td>
              </tr>
            )) }
          
          </tbody>
        </table>
      </div>
      <button className="text-sm bg-primary-400/50 pointer-events-none text-gray-100 px-4 py-1 rounded font-medium mt-5">Request for a seller Account</button>
    </div>
  )
};


export default DashboardHome;