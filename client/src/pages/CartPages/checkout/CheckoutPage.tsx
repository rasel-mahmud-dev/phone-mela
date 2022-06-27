import React, {ChangeEvent, FC} from 'react'
import {useParams, Link, useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {useSelector} from "react-redux";
import {RootStateType} from "store/index";

import Input2 from "UI/Form/Input/Input2";
import Checkbox from "UI/Form/Checkbox/Checkbox";
import OrderSummary from "pages/CartPages/orderSummary/OrderSummary";
import {ShippingAddress} from "reducers/userReducer";
import api from "src/apis/api";
import OrderContext, {OrderContextType} from "pages/CartPages/orderContext";



type CheckoutPageProps = {

}

const CheckoutPage: FC<CheckoutPageProps> = (props) => {

    let navigator = useNavigate()

  
  const { productState, auth } = useSelector((state: RootStateType)=>state)
  
  const {cartProducts} = productState
  
  const orderState: OrderContextType = React.useContext(OrderContext)
  

  const [isShowAddShippingForm, setShowAddShippingForm] = React.useState(false)
  
  const [recentShippingAddress, setRecentShippingAddress] = React.useState<ShippingAddress[]>()
  
  
  const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({
   firstName: "rasel",
   lastName: "mahmud",
   phone: 1785513535,
   idDefault: true,
   post_code: 5826,
   state: "Bogra",
   city: "sonatola",
   address: "harikhali",
   apartment_suit: "west-tekani",
   country: "Bangladesh",
  })
  
  const [selectShippingAddress, setSelectShippingAddress] = React.useState(0)
  
  
  React.useEffect(()=>{
    (async function (){
      if(auth._id){
        let response = await api.get(`/api/shipping-addresses/${auth._id}`)
        for (const responseElement of response.data) {
          if(responseElement.isDefault){
            setSelectShippingAddress(responseElement._id)
          }
        }
        setRecentShippingAddress(response.data)
        // let updateRenderShippingAddress = []
        // data.shippingAddresses && data.shippingAddresses.forEach(spAdd=>{
        //    let {_id, user_id, ...attributes } = spAdd
        //    let labelString = JSON.stringify(attributes).replace("}", "").replace("{", "")
        //
        //    updateRenderShippingAddress.push({
        //      label: labelString,
        //      shippingAddress: spAdd
        //    })
        // })
        // setRecentShippingAddress(updateRenderShippingAddress)
      } else {
        // history.push(`/auth/login/?redirect=/shopping/cart/checkout`)
      }
    }())
  }, [auth._id])

  

  async function handleSave(e: React.MouseEvent<HTMLButtonElement>){
    
    if(!auth._id){
      alert("please login")
      // window.localStorage.setItem("shipper", JSON.stringify(shippingAddress))
      // history.push("/auth/login/?redirect=/shopping/cart/shipping")
      
    } else{
      let response = await api.post("/api/shipping-address", {
        ...shippingAddress,
        customer_id: auth._id
      })
      if(response.status === 201){
        setShowAddShippingForm(false)
      }
    }
  }
  
  function handleChangeShippingAddress(id: number){
    setSelectShippingAddress(id)
  }
  
  function handleChange(e : ChangeEvent<HTMLInputElement>){
    if( e.target.name === "post_code" ||  e.target.name === "phone" ){
      setShippingAddress({
        ...shippingAddress,
        [e.target.name]: Number(e.target.value)
      })
    } else {
      setShippingAddress({
        ...shippingAddress,
        [e.target.name]: e.target.value
      })
    }
  }
  
  function renderNewShippingForm(){
    return (
      <div className="">
        {/*<h4 className="font-medium text-base text-gray-800">Contact Info</h4>*/}
        {/*<Input2 value={shippingAddress.phone} name="phone" onChange={handleChange}  type="number" placeholder="Phone number"/>*/}
        {/*<div className="flex items-center mt-2">*/}
        {/*  <Checkbox />*/}
        {/*  <label className="text-sm" htmlFor="">Keep me up to date on news and exclusive offers</label>*/}
        {/*</div>*/}
    
        <div className="mt-8">
         
         <div className="flex justify-between items-center">
           <h4 className="font-medium text-base text-gray-800">Add New Shipping Address</h4>
           
           <button onClick={()=> setShowAddShippingForm(false) } className="btn-primary btn flex items-center px-3">
            <FontAwesomeIcon icon={faTimes} className="mr-1" />
             <span>Discard</span>
           </button>
         </div>
          
  
          <Input2 value={shippingAddress.phone} name="phone" onChange={handleChange}  type="number" placeholder="Phone number"/>
          
          <div className="flex">
            <Input2 value={shippingAddress.firstName} name="firstName" onChange={handleChange} className="mr-2"  type="text" placeholder="First Name (optional)"/>
            <Input2 value={shippingAddress.lastName} name="lastName" onChange={handleChange} className="ml-2"  type="text" placeholder="Last Name"/>
          </div>
          <Input2 value={shippingAddress.address} name="address" onChange={handleChange}  type="text" placeholder="Address"/>
          <Input2 value={shippingAddress.apartment_suit} name="apartment_suit" onChange={handleChange} type="text" placeholder="Apartment, suite, etc. (optional)"/>
          <Input2 value={shippingAddress.city} name="city" onChange={handleChange} type="text" placeholder="City"/>
          <div className="flex items-center">
            <Input2 value={shippingAddress.country} name="country" onChange={handleChange} className="mr-1" type="text" placeholder="Country/Region"/>
            <Input2 value={shippingAddress.state} name="state" onChange={handleChange} className="mx-2" type="text" placeholder="State"/>
            <Input2 value={shippingAddress.post_code} name="post_code" onChange={handleChange} className="ml-1" type="number" placeholder="Zip Code"/>
          </div>
          <div className="flex items-center mt-4">
            <Checkbox id="" />
            <label className="text-sm" >Save this information for next time</label>
          </div>
  
          <button onClick={handleSave} className="btn-primary btn flex items-center px-3 mt-4">
            <span>Save Shipping Address</span>
          </button>
        </div>
      </div>
    )
  }
  
  function renderRecentShippingAddress(){
    return (
      <div className="mt-4">
        <h4 className="font-medium text-base text-gray-800">Yours Saved Shipping Addresses</h4>
        { recentShippingAddress && recentShippingAddress.map((recentShipAddr: ShippingAddress, i)=>(
          <div onClick={()=>recentShipAddr._id && handleChangeShippingAddress(recentShipAddr._id)}
               className="flex items-center my-2 py-2 cursor-pointer">
            <input
              type="radio"
              name="shipping-address"
              // value={selectShippingAddress === recentShipAddr._id}
              checked={recentShipAddr._id === selectShippingAddress}
            />
            
            <div className={["border hover:border-primary-400/40 hover:bg-primary-10 rounded mx-2 p-2 text-sm", selectShippingAddress === recentShipAddr._id ? "border-primary-400/40 bg-primary-10" : ""].join(" ")}>
              <h4 className="mb-0 text-sm">Phone:
              <span className="ml-1">{recentShipAddr.phone}</span>
              </h4>
              <h4 className="mb-0 text-sm">Email:
                <span className="ml-1">{recentShipAddr.email}</span>
              </h4>
              <h4 className="mb-0 text-sm">Address:
                <span className="ml-1"> {recentShipAddr.address} {recentShipAddr.post_code} {recentShipAddr.city} {recentShipAddr.state} {recentShipAddr.country}</span>
              </h4>
            </div>
          </div>
  
        ))
        }
      </div>
    )
  }
  
  function handleToggleAddShippingAddressForm() {
    setShowAddShippingForm(!isShowAddShippingForm)
    setSelectShippingAddress(0)
  }
  
  
  function handleToPay() {
      if(selectShippingAddress !== 0){
        if(recentShippingAddress) {
          let s = recentShippingAddress.find(r => r._id === selectShippingAddress)
          orderState.actions.save({
            shippingAddress: s,
            cartProducts: cartProducts
          })
          navigator("/order/payment")
        }
      }
    
  }
  
  return (
    <div>
      <div className="" >
    
        <div className="">
      
          <div  >
            <div className="cart_items">
              <h1 className="text-center text-lg font-medium my-4">ORDER CHECKOUT</h1>
              
              <div className="flex justify-between sm:flex-row flex-col">
                
                <div className="sm:flex-4 lg:flex-5 mr-4">
                  <button className="btn btn-primary mt-4"onClick={handleToggleAddShippingAddressForm}>
                    <span>Add Another shipping address </span>
                  </button>
                  
                  {isShowAddShippingForm ?  renderNewShippingForm() : renderRecentShippingAddress() }
  
                  <div className="flex justify-between mt-4">
                    <Link to="/cart">
                      <button  className="link_btn text-sm font-normal flex items-center">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-1 text-xs" />
                        <span className="text-sm font-normal">Back to Cart</span>
                      </button>
                    </Link>
                    {/*<Link to="/checkout">*/}
                    
                    {/*</Link>*/}
                  </div>
                  
                </div>
                
                <div className="sm:flex-5 lg:flex-2">
                  <OrderSummary
                    cartProducts={cartProducts}
                    shippingAddress={selectShippingAddress !== 0 ? recentShippingAddress ? recentShippingAddress.find(r=>r._id === selectShippingAddress) : false: false}
                    nextLevel={
                      <div className="mt-5">
                        <button
                          className={["w-full justify-center flex-nowrap font-normal btn btn-primary flex items-center px-4 py-1",
                            selectShippingAddress === 0
                              ? "bg-primary-950"
                              : "bg-primary-400"
                          ].join(" ")} ><button onClick={handleToPay}>Continue To Payment</button></button>
                      </div>
                    }
  
                  />
                </div>
                
              </div>
              
              {/*{ cartProducts && cartProducts.length > 0 ? renderCartItems() : (*/}
              {/*  <div className="text-md font-medium">*/}
              {/*    <h1>Your Cart is Empty</h1>*/}
              {/*  </div>*/}
              {/*)}*/}
              
              {/*<div className="flex justify-between mt-4">*/}
              {/*  <button onClick={handlePushBack} className="link_btn text-sm font-normal flex items-center">*/}
              {/*    <FontAwesomeIcon icon={faChevronLeft} className="mr-1 text-xs" />*/}
              {/*    <span className="text-sm font-normal">Back to Shop</span>*/}
              {/*  </button>*/}
              {/*  /!*<Link to="/shopping/cart/checkout">*!/*/}
              {/*  <Link to="/checkout">*/}
              {/*    <button className="flex-nowrap btn btn-primary flex items-center  py-1" >PROCEED TO CHECKOUT</button>*/}
              {/*  </Link>*/}
              {/*</div>*/}
            </div>
      
          </div>
          <div>
            
            
            
            <div className="mt-4">
              <h3 className="section_title">Recommend Products</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
//
// function mapStateToProps(state){
//   return {
//     cartState: state.cartState,
//     loadingStates: state.productState.loadingStates,
//     authState: state.authState
//   }
// }
//
// export default connect(mapStateToProps, {
//   fetchProduct,
//   toggleLoader
// })(CheckoutPage)

export default CheckoutPage