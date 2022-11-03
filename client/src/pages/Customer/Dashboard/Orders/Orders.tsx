import React from 'react' 
import { useParams} from "react-router-dom"

import { useDispatch, useSelector} from "react-redux"

import api from "src/apis/api"
import "./Orders.scss"

import {RootStateType} from "store/index";
import Preload from "UI/Preload/Preload";


interface OrderType {
  cover: string
  created_at: string
  customer_id: number
  delivery_date: string
  description: string
  order_id: number
  payment_method: string
  price: number
  product_id: number
  quantity: number
  shipper_id: number
  shipping_id: number
  title: string
  order_status_type: string
}


const Orders = (props) => { 
  let params = useParams() 
  // let history = useHistory()
  
  const {auth: {auth}} = useSelector((state: RootStateType)=> state)
  
  const dispatch = useDispatch()

  const {loadingStates, cartState, _id} = props
  const [allOrders, setOrders] = React.useState<OrderType[]>([])
  
 
  
  React.useEffect( ()=>{
    
    (async function (){
      
      if(auth){
        
        api.get("/api/orders").then(response=>{
          if(response.status === 200){
            setOrders(response.data)
          }
        })
      }
    }())
    
  }, [])
  
  function handleChange(e){
  //  setPaymentMethod(e.target.value)
  }
  


  function handlePushBack(){
    // history.back() 
    // history.goBack()
  }
  
  function handleProductAction(type, prod){
    
  }
  
  
  // function renderLoader(where){
  //   let loadingState = loadingStates.find(ls=>ls.where === where)
  //   return (
  //     <div style={{textAlign: "center"}}>
  //       { loadingState && loadingState.isLoading 
  //         && <Spin size={50} />
  //       }
  //     </div>
  //   )
  // }
  
  function renderOrders(){
    
    // let path =  history.location.pathname
    return (
        <div>
          
          <div className="px-2">
            { allOrders && allOrders.map((order: any)=>(
              <div className="order relative  px-3 py-4">
                
                <div className="flex justify-between flex-col sm:flex-row">
                  <Preload  className="hover:text-primary-400 text-xl  font-medium" to={`/auth/customer/my-orders/details/${order._id}`}>Order ID #{order._id} </Preload>
                  <div className="mb-2 sm:mb-0">
                    <h4 className="text-[14px] font-normal text-dark-300 mt-1">Order date {new Date(order.createdAt).toDateString()}</h4>
                    <div className="bg-secondary-400 text-[14px] font-normal text-gray-50 rounded mt-1 w-max px-2">{order.order_status_type}</div>
                  </div>
                </div>
                
                <h4 className="text-[15px] text-dark-300 mt-1">{order.title}</h4>
  
                <span className="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.19" height="16.2" viewBox="0 0 19.19 20.2">
                  <path id="Path_27" data-name="Path 27" d="M22.19,17.14V15.12l-8.08-5.05V4.515a1.515,1.515,0,1,0-3.03,0V10.07L3,15.12v2.02l8.08-2.525V20.17L9.06,21.685V23.2l3.535-1.01L16.13,23.2V21.685L14.11,20.17V14.615l2.678.837Z" transform="translate(-3 -3)" fill="#00be5f"/>
                </svg>
                  <h3 className="ml-1 text-[14px] font-normal text-primary-400">Estimated delivery {new Date(order.delivery_date).toDateString()} </h3>
                </span>
                  
                  {/*<span className="p-right">{order.payment_method === "cash_on_delivery" ? "COD" :order.payment_method}</span>*/}
                
        
                {/*<div className="border-b border-gray-200 mt-4"></div>*/}
                
                {/*    */}
                {/*    <Divider lineHeight={1} lineColor="#d9d9d96f"  />*/}
                {/*    <div className="order-item d-flex">*/}
                {/*      <div className="w-25">*/}
                {/*        <Image src={fullLink(order.product.cover_photo)} maxWidth={100}/>*/}
                {/*      </div>*/}
                {/*      <div style={{*/}
                {/*          marginLeft: "30px", width: "100%",*/}
                {/*          marginTop: "10px"*/}
                {/*      }}>*/}
                {/*        <h3 className="font-bold">{order.product.title}</h3>*/}
                {/*        <h5 className="font-medium my-1">TK.{order.total_price}</h5>*/}
                {/*        <h5 className="font-medium">x {order.quantity}</h5>*/}
                {/*        <div className="ml-auto bg-gray-300 text-primary w-max px-2 py-0.5 font-medium rounded-sm">{order.status}</div>*/}
                {/*        /!*<h4 style={{marginRight: "10px"}} className="t-end bg-red-400">{order.status}</h4>*!/*/}
                {/*        <h4 className="font-medium ml-2 text-">*/}
                {/*          {order.quantity} item, total: <span>{order.total_price} tk</span> */}
                {/*        </h4>*/}
                {/*      </div>*/}
                {/*    </div>*/}
              </div>
            )) }
            
          </div>
         
        </div>
      )
  }  
  

  return (
      <div className="bg-white sm:mx-3 mx-0">
         
        {/*<Divider lineHeight={3} />*/}
          
          <h1 className="text-center text-2xl font-medium pt-4">My Orders</h1>
          
          {renderOrders()}

          <div className="row justify-space-between">
            {/*<Button onClick={handlePushBack}>Back to Shop</Button>*/}
          </div>
        
          
      </div>
    )
}

export default Orders