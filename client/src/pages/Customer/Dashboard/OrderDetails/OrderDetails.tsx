import React from 'react' 
import { useParams,  Link } from "react-router-dom"
// import qs from "src/utills/qs"

// import {Button, Menu, Divider} from "UI"
import { useDispatch} from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./OrderDetails.scss"
import Preload from "UI/Preload/Preload";
import api from "apis/api";
import fullLink from "../../../../utils/fullLink";
import {faAngleLeft} from "@fortawesome/pro-regular-svg-icons";

// const {SubMenu} = Menu


interface OrderDetail {
  phone: any;
  cover: string
  createdAt: string
  customer_id: string
  delivery_date: string
  description: string
  _id: string
  payment_method: string
  price: number
  product_id: any
  quantity: number
  shipper_id: number
  shipping_id: any
  title: string,
  address: string
  post_code: string
  city: string
  state: string
  country: string
  order_status_type: string
}

const OrderDetails = (props) => { 
  let params = useParams() 
  // let history = useHistory()
  const dispatch = useDispatch()

  const {loadingStates, cartState, _id} = props
  
  const [order, setOrder] = React.useState<OrderDetail>({
    address: "", city: "", country: "", phone: undefined, post_code: "", state: "",
    createdAt: null,
    customer_id: "",
    delivery_date: "",
    description: "",
    payment_method: "",
    product_id: 0,
    shipper_id: 0,
    shipping_id: 0,
    cover: "",
    price: 0,
    quantity: 0,
    _id: "",
    title: "",
    order_status_type: ""
  })
  

  React.useEffect(()=>{
    (async function (){
       if(params.orderId){
         try {
           let response = await api.get(`/api/order/${params.orderId}`)
           setOrder(response.data)
         } catch (ex){
         
         }
      }
      // console.log(qs(history))
    }())
  }, [params])
  
  
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
  
  // function renderOrderDetails(){
  //   return (
  //       <div>
          
  //           <div>
  //             <h3>Order <Link to="/">#{order.order_id}</Link></h3> 
  //             <h4>Place on {new Date().toDateString()}</h4>
  //             <div className="order-item d-flex">
  //               <Image size={100} /> 
  //               <div style={{
  //                   marginLeft: "30px", width: "100%",
  //                   marginTop: "10px"
  //               }}>
  //                 <h3>{order.product.title}</h3>
  //                 <h5>tk {order.total_price}</h5>
  //                 <h5>x {order.quantity}</h5>
  //                 <h4 style={{marginRight: "10px"}} className="t-end">{order.status}</h4>
  //                 <h4 style={{marginRight: "10px"}} className="t-end">
  //                   {order.quantity} item, total: <span>{order.total_price} tk</span> 
  //                 </h4>
  //               </div>
  //             </div>
  //           </div>
    
  //       </div>
  //     )
  // }  
  
  function renderAddress(recentShipAddr){
    return <h4 className="mb-0 text-sm">Address:
      <span className="ml-1"> {recentShipAddr.address} {recentShipAddr.post_code} {recentShipAddr.city} {recentShipAddr.state} {recentShipAddr.country}</span>
    </h4>
  }
  

  return (
      <div className=" bg-white sm:mx-3 mx-0">
         
        {/*<Divider lineHeight={3} />*/}
        
          <h1 className="text-center text-2xl font-medium pt-4">Orders Details</h1>
  
        <Preload to="/auth/customer/my-orders" className="flex items-center px-2 py-0.5 text-dark-800 rounded">
          <FontAwesomeIcon className="hover:text-primary-400 " icon={faAngleLeft} />
          <span className="hover:text-primary-400 ml-1 text-[14px] font-normal text-gray-800">Back to All Orders</span>
        </Preload>
        
        
          <div className="order relative  px-3 py-4">
      
            <div className="flex justify-between sm:flex-row flex-col">
              <h2  className="text-xl font-medium">Order ID #{order._id}24323432 </h2>
              
              <div className="flex py-2 mb-4 sm:py-0 sm:mb-0">
                <button className="mr-4 hover:bg-primary-400   hover:text-white bg-white-400 flex items-center border border-primary-400/40 px-2 py-0.5 text-white rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12.21" height="16.279" viewBox="0 0 12.21 16.279">
                    <path id="Icon_awesome-file-alt" data-name="Icon awesome-file-alt" d="M7.122,4.324V0H.763A.761.761,0,0,0,0,.763V15.516a.761.761,0,0,0,.763.763H11.447a.761.761,0,0,0,.763-.763V5.087H7.885A.765.765,0,0,1,7.122,4.324Zm2.035,7.5a.383.383,0,0,1-.382.382H3.434a.383.383,0,0,1-.382-.382v-.254a.383.383,0,0,1,.382-.382H8.776a.383.383,0,0,1,.382.382Zm0-2.035a.383.383,0,0,1-.382.382H3.434a.383.383,0,0,1-.382-.382V9.539a.383.383,0,0,1,.382-.382H8.776a.383.383,0,0,1,.382.382Zm0-2.289v.254a.383.383,0,0,1-.382.382H3.434a.383.383,0,0,1-.382-.382V7.5a.383.383,0,0,1,.382-.382H8.776A.383.383,0,0,1,9.157,7.5ZM12.21,3.876V4.07H8.14V0h.194a.763.763,0,0,1,.541.223l3.113,3.116A.761.761,0,0,1,12.21,3.876Z" fill="#515151"/>
                  </svg>
                  <span className="ml-1 text-[14px] text-dark-900 font-normal">Voucher</span>

                </button>
                <button className="bg-primary-400 flex items-center px-2 py-0.5 text-white rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <path id="Icon_material-track-changes" data-name="Icon material-track-changes" d="M14.949,5.051l-.987.987A5.606,5.606,0,1,1,9.3,4.449V5.863a4.2,4.2,0,1,0,3.668,1.169l-.987.987A2.807,2.807,0,1,1,9.3,7.3V8.8A1.386,1.386,0,0,0,8.6,10a1.4,1.4,0,0,0,2.8,0,1.377,1.377,0,0,0-.7-1.2V3H10a7,7,0,1,0,4.949,2.051Z" transform="translate(-3 -3)" fill="#fff"/>
                  </svg>
                  <span className="ml-1 text-[14px] font-normal">Track Order</span>
                </button>
              </div>
            </div>
            
            <h4 className="text-[14px] font-normal text-dark-300 mt-1">Order date {new Date(order.createdAt).toDateString()}</h4>
      
            <h4 className="text-[15px] text-dark-300 mt-1">{order.title}</h4>
      
            <span className="flex items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15.19" height="16.2" viewBox="0 0 19.19 20.2">
              <path id="Path_27" data-name="Path 27" d="M22.19,17.14V15.12l-8.08-5.05V4.515a1.515,1.515,0,1,0-3.03,0V10.07L3,15.12v2.02l8.08-2.525V20.17L9.06,21.685V23.2l3.535-1.01L16.13,23.2V21.685L14.11,20.17V14.615l2.678.837Z" transform="translate(-3 -3)" fill="#00be5f"/>
            </svg>
              <h3 className="ml-1 text-[14px] font-normal text-primary-400">Estimated delivery {new Date(order.delivery_date).toDateString()} </h3>
            </span>
            <div className="bg-secondary-400 text-[14px] font-normal text-gray-50 rounded mt-1 w-max px-2">{order.order_status_type}</div>
            
            <div className="border-b border-gray-200 mt-4"></div>
            
            <div className="mt-4">
             
              <div className="flex justify-between">
  
                <div className="flex items-start">
                  <div className="w-[50px]">
                    <Preload to={`/product/${order.product_id.title}/${order.product_id._id}}`}><img src={fullLink(order.product_id.cover)} alt=""/></Preload>
                  </div>
                  <Preload to={`/product/${order.product_id.title}/${order.product_id._id}`}><h2 className="hover:text-primary-400 font-normal text-sm ml-1">NOKIA 4.5 3/64GB</h2></Preload>
                </div>
  
                <div className="flex items-start">
                  <div>
                    <h2 className="font-normal text-sm ml-1">TK {order.price}</h2>
                    <h2 className="font-normal text-dark-300 text-sm ml-1">Quantity: {order.quantity}</h2>
                  </div>
                </div>
                
              </div>
              
            </div>
            
            
            <div className="border-b border-gray-200 mt-4" />
           
           <div className="">
  
             <div className="min-w-[150px]">
               <h1 className="text-xl font-medium mt-4">Payment</h1>
               <div className="mt-2">
                 <h2 className="font-normal text-dark-300 text-sm">{order.payment_method}</h2>
               </div>
             </div>
  
             <div>
    
               <h1 className="text-xl font-medium mt-4">Delivery Address</h1>
               <div className="mt-2">
                 <h2 className="font-normal text-dark-600 text-[15px]"></h2>
                 <div className="font-normal text-dark-300 text-sm mt-2">
                   <p>{order.shipping_id && renderAddress(order.shipping_id)}</p>
                   <h4 className="mt-1">Phone: {order.shipping_id.phone}</h4>
                 </div>
               </div>
  
             </div>
             
           </div>
           
            
          </div>
        

          <div className="row justify-space-between">
            {/*<Button onClick={handlePushBack}>Back to Shop</Button>*/}
          </div>
        
          
      </div>
    )
}

export default OrderDetails