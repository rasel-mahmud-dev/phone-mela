import React from 'react';
import {CartProductType} from "reducers/productReducer";

const OrderSummary = ({cartProducts, shippingAddress, nextLevel}) => {
  
  function calculateTotalPrice(items){
    let totalPrice = 0;
    let totalItems = 0
    for(let i=0; i<items.length; i++){
      totalPrice += (items[i].price * items[i].quantity)
      totalItems += items[i].quantity
    }
    return {totalPrice: totalPrice.toFixed(2) || 0.00, totalItems}
  }
  
  return (
    <div>
      <div className="font-normal bg-primary-10 px-6 py-3 w-full">
        <h4 className="font-medium text-lg">Order Summary</h4>
        <div className="mt-4">
          <ul>
            { cartProducts.map((cp: CartProductType, i: number)=>(
              <div className="flex my-3 justify-between" key={i}>
                <div className="flex">
                  <div>
                    <img className="w-6 flex" src={cp.cover} alt=""/>
                  </div>
                  <div>
                    <span className="block font-normal text-sm ml-1 -mb-2 ">{cp.title}</span>
                    <span className="font-normal ml-1 text-xs">x{cp.quantity}</span>
                  </div>
                  
                </div>
                <div className="">
                  <h4 className="text-sm font-medium text-gray-900">TK.{cp.price * cp.quantity}</h4>
                </div>
              </div>
            ))}
          </ul>
        </div>
    
        <div className="mt-4">
          <div className="font-normal text-sm flex justify-between">
            <span className="font-medium">Total Items:</span>
            <span className="text-primary-400 ml-2 font-medium text-right  ">{calculateTotalPrice(cartProducts).totalItems}</span>
          </div>
        </div>
        { shippingAddress && (
          <div className="mt-4">
            <h2 className="mb-1">Shipping Address</h2>
            <div className="flex items-center my-1 py-1 cursor-pointer">
              <div className={["border hover:border-primary-400/40 hover:bg-primary-10 rounded mx-2 p-2 text-sm"].join(" ")}>
                <h4 className="mb-0 text-sm">Phone:
                  <span className="ml-1">{shippingAddress.phone}</span>
                </h4>
                <h4 className="mb-0 text-sm">Email:
                  <span className="ml-1">{shippingAddress.email}</span>
                </h4>
                <h4 className="mb-0 text-sm">Address:
                  <span className="ml-1"> {shippingAddress.address} {shippingAddress.post_code} {shippingAddress.city} {shippingAddress.state} {shippingAddress.country}</span>
                </h4>
              </div>
            </div>
          </div>
        ) }
  
  
        <div className="font-normal text-sm flex justify-between mt-1">
          <span className="font-medium">Sub Total:</span>
          <span className="text-primary-400 ml-2 font-medium">{calculateTotalPrice(cartProducts).totalPrice} TK</span>
        </div>
  
        { nextLevel && nextLevel       }
        
      </div>
    </div>
  );
};

export default OrderSummary;