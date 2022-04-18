import React from 'react' 
import { useParams,  Link } from "react-router-dom"

//
// import {
//   Button,
//   Menu,
//   Image,
//   Spin, Input, Modal, Divider, Badge
// } from "UI"

import {connect, useDispatch} from "react-redux"
import { fetchProduct, toggleLoader } from "actions/productAction"
import api from "src/apis/api"
import "./Orders.scss"
import fullLink from "src/utils/fullLink";


// const {SubMenu} = Menu

const Orders = (props) => { 
  let params = useParams() 
  // let history = useHistory()
  const dispatch = useDispatch()

  const {loadingStates, cartState, _id} = props
  const [allOrders, setOrders] = React.useState([])
   
    
  React.useEffect( ()=>{
    (async function (){
      if(_id){
        let {data} = await api.get(`/api/orders/${_id}`)
        setOrders(data.orders)
      }
    }())
    
  }, [_id])
  
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
          {/*{ allOrders.map((order: any)=>(*/}
          {/*  <div className="order p-relative">*/}
          {/*    <h3>Order <Link to={`${path}/details/${order.order_id}`}>#{order.order_id}</Link></h3> */}
          {/*    <h4>*/}
          {/*      Place on {new Date().toDateString()} */}
          {/*      <span className="p-right">{order.payment_method === "cash_on_delivery" ? "COD" :order.payment_method}</span>*/}
          {/*    </h4>  */}
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
          {/*  </div>*/}
          {/*)) }*/}
        </div>
      )
  }  
  

  return (
      <div className="container"> 
         
        {/*<Divider lineHeight={3} />*/}
          
          <h1 className="t-center">Orders</h1> 
          
          {renderOrders()}

          <div className="row justify-space-between">
            {/*<Button onClick={handlePushBack}>Back to Shop</Button>*/}
          </div>
        
          
      </div>
    )
}

export default Orders