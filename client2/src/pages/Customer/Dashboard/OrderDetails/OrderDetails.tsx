import React from 'react' 
import { useParams,  Link } from "react-router-dom"
// import qs from "src/utills/qs"

// import {Button, Menu, Divider} from "UI"
import { useDispatch} from "react-redux"


import "./OrderDetails.scss"

// const {SubMenu} = Menu

const OrderDetails = (props) => { 
  let params = useParams() 
  // let history = useHistory()
  const dispatch = useDispatch()

  const {loadingStates, cartState, _id} = props
  const [order, setOrder] = React.useState({})
   
  
  
  React.useEffect(()=>{
    (async function (){
       if(_id){
      //   let {data} = await api.get(`/api/order/${_id}/${}`)
      //   setOrder(data.order)
      }
      // console.log(qs(history))
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
  

  return (
      <div className="container"> 
         
        {/*<Divider lineHeight={3} />*/}
          
          <h1 className="t-center">Orders Details</h1> 
          
          

          <div className="row justify-space-between">
            {/*<Button onClick={handlePushBack}>Back to Shop</Button>*/}
          </div>
        
          
      </div>
    )
}

export default OrderDetails