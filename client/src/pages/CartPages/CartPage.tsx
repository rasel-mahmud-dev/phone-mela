import React from 'react' 
import {useParams,  Link, useNavigate} from "react-router-dom"
import {connect, useDispatch} from "react-redux"
import {fetchProduct, toggleHandleCart, toggleHandleWishlist} from "actions/productAction"
import {useSelector} from "react-redux"

import "./CartPage.scss"
import Loader from "UI/Loader/Loader";
import fullLink from "src/utils/fullLink";
import {RootStateType} from "src/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash} from "@fortawesome/pro-regular-svg-icons";

import {faChevronLeft} from "@fortawesome/pro-regular-svg-icons";
import {faHeart} from "@fortawesome/pro-solid-svg-icons";
import {ActionTypes} from "actions/actionTypes";
import {CartProductType, ProductType} from "reducers/productReducer";
import Table from "UI/Table/Table";
import Preload from "UI/Preload/Preload";
import Layout from "../../Common/Layout/Layout";




const CartPage = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()
  
  const { productState: { cartProducts, wishlist }, auth } = useSelector((state: RootStateType)=>state)
  

  function handlePushBack(){
    // history.back() 
    navigate(-1)
  }

  
  //
  // function renderLoader(where){
  //   let loadingState = loadingStates.find(ls=>ls.where === where)
  //   return (
  //     <div style={{textAlign: "center"}}>
  //       { loadingState && loadingState.isLoading
  //          && <Loader size={50} />
  //       }
  //     </div>
  //   )
  // }
  
  function calculateTotalPrice(items: any[]){
    let totalPrice = 0;
    for(let i=0; i<items.length; i++){
      totalPrice += (items[i].price * items[i].quantity)
    }
    return totalPrice.toFixed(2) || 0.00
  }
  

  function handleRemoveFromCart(cart_id: number) {
    // dispatch(removeFromCart(cart_id, auth._id, false))
  }
  
  function renderCartItems(){
    const isInWished=(id: string)=> {
      let i = wishlist.findIndex(cp=>cp.product_id === id)
      return i !== -1
    }
    
  
    function handleToggleWishlist(isAdd: boolean, item: any) {
      
      let product: any = {
        title: item.title,
        cover: item.cover,
        id: item.product_id,
        price: item.price,
        author_id: item.customer_id
      }
      
      
      // dispatch(toggleHandleWishlist())
      // if(auth.isAuthenticated) {
      //   if(isAdd){
      //     let product: any = {
      //       title: item.title,
      //       cover: item.cover,
      //       id: item.product_id,
      //       price: item.price,
      //       author_id: item.author_id
      //     }
      //     dispatch(addToWishlist(product, auth._id))
      //   } else {
      //     let wish = wishlist.find(w=>w.product_id === item.product_id)
      //     if(wish) {
      //       dispatch(removeFromWishlist(wish._id, auth._id))
      //     }
      //   }
      //
      // } else {
      //   dispatch(togglePopup({message: "Login First", isOpen: true, isSucceed: false}))
      // }
    }
  
  
    let columns = [
      {
        title: "Image",
        key: "1",
        dataIndex: "cover",
        render: (cover: string)=> <div style={{width: "40px"}}><img style={{width: "100%"}} src={fullLink(cover)} /></div>
      },
      {
        title: "Name",
        key: "2",
        dataIndex: "title",
        width: 200,
        sorter: {
          compare: (a: any, b: any)=> {
            if(a.title.toLowerCase() > b.title.toLowerCase()){
              return 1
            } else if(a.title.toLowerCase() < b.title.toLowerCase()){
              return -1
            } else {
              return 0
            }
          }
        },
        render: (title: string)=> {
          return title
        }
        // <Tooltip theme="simple-white" tooltip={text}><a>{text.slice(0, 20)}{.length > 21 && "..."}</a></Tooltip>
      
      },
      {
        title: "Price",
        key: "10",
        dataIndex: "price",
        width: 200,
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
        render: (price: string)=> {
          return price
        }
      },
      {
        title: "Added At",
        key: "3",
        dataIndex: "createdAt",
        width: 150,
        className: "white-space-nowrap",
        render: (createdAt: string) => new Date(createdAt).toDateString(),
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
        title: "Quantity",
        key: "45435",
        width: 100,
        className:"text-center",
        render: (product: CartProductType) =>{
          return (
            <div>
              <div className="flex items-center justify-center select-none min-w-[150px]">
                <button>
                  <FontAwesomeIcon onClick={()=>dispatch({type: ActionTypes.DECREASE_CART_ITEM, payload: product._id})} icon={faMinus} />
                </button>
                <span className="bg-primary-400 rounded-full text-sm leading-[25px]  font-normal h-6 w-10 text-white mx-4  px-4">{product.quantity}</span>
                <button>
                  <FontAwesomeIcon onClick={()=>dispatch({type: ActionTypes.INCREASE_CART_ITEM, payload: product._id})} icon={faPlus} />
                </button>
              </div>
            </div>
          )
        }
      },
      {
        title: "Actions",
        key: "45435",
        width: 100,
        className:"text-center",
        render: (product: CartProductType) =>{
          return (
              <div>
                <div className="flex justify-content-end  ">
  
                  {isInWished(product.product_id) ? (
                    <button className="flex-nowrap btn btn-primary flex products-center  py-1"
                            onClick={()=>dispatch(toggleHandleWishlist({
                              title: product.title,
                              price: product.price,
                              cover: product.cover ? product.cover : "",
                              product_id: product.product_id
                            }, false))}
                    >
                      <FontAwesomeIcon  icon={faHeart} />
                      <span className="whitespace-nowrap font-normal ml-1">Remove WISHLIST</span>
                    </button>
                  ) : (
                    <button className="flex-nowrap btn btn-primary flex products-center  py-1"
                            onClick={()=>dispatch(toggleHandleWishlist({
                              title: product.title,
                              price: product.price,
                              cover: product.cover ? product.cover : "",
                              product_id: product.product_id
                            }, false))}
                    >
                      <FontAwesomeIcon  icon={faHeart} />
                      <span className="whitespace-nowrap font-normal ml-1">ADD WISHLIST</span>
                    </button>
                  )}
                  <button className="btn btn-danger flex products-center py-1 ml-2"
                          onClick={()=>dispatch(toggleHandleCart({
                            title: product.title,
                            price: product.price,
                            cover: product.cover ? product.cover : "",
                            product_id: product.product_id
                          }, false))}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="font-normal ml-1 whitespace-nowrap">DELETE</span>
                  </button>
                  
                </div>
                
                {/*<FontAwesomeIcon className="text-gray-700 mr-2 text-lg" onClick={()=>dispatch({type: "REMOVE_CART_ITEM", payload: item._id})} icon={faHeart} />*/}
                {/*<FontAwesomeIcon className="text-gray-700 text-lg" onClick={()=>dispatch({type: "REMOVE_CART_ITEM", payload: item._id})} icon={faTrash} />*/}
                
              </div>
            
          )
        }
      }
    ]
  
  
  
    return (
      <div className="">
      <div className="overflow-x-auto">
        <Table dataSource={cartProducts} checkBox={false} columns={columns} fixedHeader={true} />
        
      </div>
      <h4 className="text-right font-normal text-sm mt-4">SUBTOTAL:
        <span className="text-primary-400 ml-2 font-medium">{calculateTotalPrice(cartProducts)} TK</span>
      </h4>
      </div>
    )
  }
  
  
  return (
    <div>
    <Layout className="container-1200  pt-4">
      <span />
      
      <div className="w-full">
        <div className="px-3">
          <div className="cart_items">
            <h1 className="text-center text-xl font-medium mb-4">YOUR SHOPPING CART</h1>
        
            {cartProducts && cartProducts.length > 0 ? <h3 className="font-normal">Total Items ({cartProducts && cartProducts.length})</h3> : (
              <div className="mt-8 text-center text-sm font-normal">
                <h1>Your Cart is Empty</h1>
              </div>
            ) }
        
            { cartProducts && cartProducts.length > 0 && renderCartItems() }
        
        
            <div className="flex justify-between mt-4">
              <button onClick={handlePushBack} className="link_btn text-sm font-normal flex items-center">
                <FontAwesomeIcon icon={faChevronLeft} className="mr-1 text-xs" />
                <span className="text-sm font-normal">Back to Shop</span>
              </button>
              {/*<Link to="/shopping/cart/checkout">*/}
          
              <Preload to="/order/checkout" className={["flex-nowrap btn btn-primary flex items-center  py-1", cartProducts && cartProducts.length === 0 ? "bg-primary-950 pointer-events-none": ""].join(" ")} >
                PROCEED TO CHECKOUT
              </Preload>
        
            </div>
          </div>
        </div>
        
        <div>
          <div className="mt-4">
            <h3 className="section_title">Recommend Products</h3>
          </div>
        </div>
      </div>
    </Layout>
  
      {/*{ cartProducts && cartProducts.length > 0 && renderCartItems() }*/}
      
    </div>
  )
};



export default CartPage