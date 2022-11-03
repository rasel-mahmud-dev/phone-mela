import React from 'react';
import "./styles.scss"
import api from "apis/api";
import {useSelector} from "react-redux";
import {RootStateType} from "store/index";
import fullLink from "../../../../utils/fullLink";
import Table from "UI/Table/Table";

const DashboardHome = (props) => {

  const { auth } = useSelector((state: RootStateType) => state.auth);
  
  const [orders, setOrders] = React.useState([])
  
  
  React.useEffect(()=>{
    api.get("/api/orders").then(response=>{
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
  
  
  
  let columns = [
    {
      title: "Cover",
      key: "1",
      dataIndex: "product_id",
      render: (product_id: any)=> <div style={{width: "40px"}}><img style={{width: "100%"}} src={fullLink(product_id.cover)} /></div>
    },
    {
      title: "ID",
      key: "1122",
      dataIndex: "_id",
      sorter: {
        compare: (a:any, b:any)=> a._id > b._id ? 1 : a._id < b._id ? -1 : 0
      }
    },
    {
      title: "Product Name",
      key: "1",
      dataIndex: "product_id",
      width: 200,
      sorter: {
        compare: (a: any, b: any)=> {
          if(a.product_id.title.toLowerCase() > b.product_id.title.toLowerCase()){
            return 1
          } else if(a.product_id.title.toLowerCase() < b.product_id.title.toLowerCase()){
            return -1
          } else {
            return 0
          }
        }
      },
      render: (product_id: any)=> {
        return product_id.title
      }
    },
    {
      title: "Created At",
      key: "3",
      dataIndex: "createdAt",
      width: 150,
      render: (text: string) => new Date(text).toDateString(),
      sorter: {
        compare: (a: any, b: any)=> {
          if(a.createdAt > b.createdAt){
            return 1
          } else if(a.createdAt < b.createdAt){
            return -1
          } else {
            return 0
          }
        }
      },
    },
    {
      title: "Price",
      key: "3",
      dataIndex: "price",
      width: 150,
      render: (price: number) => "TK. " +price,
      sorter: {
        compare: (a: any, b: any)=> {
          if(a.price > b.price){
            return 1
          } else if(a.price < b.price){
            return -1
          } else {
            return 0
          }
        }
      },
    }
  ]
  
  
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
          <h4 className="text-sm text-center font-medium mt-2">TK. {calculateCosts(orders)}`</h4>
        </div>
        
      </div>
      
      <h2 className="text-xl font-medium mt-5">Orders</h2>
      <div className="overflow-x-auto">
  
  
        <Table dataSource={orders} columns={columns} fixedHeader={true} scroll={{y: '80vh'}} />
        

        
      </div>
      <button className="text-sm bg-primary-400/50 pointer-events-none text-gray-100 px-4 py-1 rounded font-medium mt-5">Request for a seller Account</button>
    </div>
  )
};

// <table className="order_table">
//   <thead>
//   <tr>
//     <th className="text-left">#ID</th>
//     <th className="text-left">Price</th>
//     <th className="text-left">Qty</th>
//     <th className="text-center min-w-[150px]">Status</th>
//   </tr>
//   </thead>
//   <tbody>
//
//   { orders && orders.map((order, i)=>(
//     <tr>
//       <td>#{order._id}</td>
//       <td>{order.price} Taka</td>
//       <td>{order.quantity}</td>
//       <td>
//         <div className="flex justify-center">
//           <div className="bg-primary-400 px-2 text-[12px] text-white rounded">{order.order_status}</div>
//         </div>
//       </td>
//     </tr>
//   )) }
//
//   </tbody>
// </table>

export default DashboardHome;