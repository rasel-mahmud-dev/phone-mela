import mongoose from "mongoose";
import {CartType} from "../models/Cart";
import {ApiRequest, ApiResponse, RequestWithSession} from "../types";
import {ObjectId} from "bson";


interface CartItemResponse {
  _id: string
  customer_id: string
  product_id: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  cover: string
  title: string
  price: number
}


const Cart = mongoose.model("Cart")

export const fetchCartProducts = async (req: RequestWithSession, res: ApiResponse)=> {
  
  try{
    let c: CartItemResponse[] = await Cart.aggregate([
      { $match: { customer_id: new ObjectId(req.user.userId) },  },
      { $lookup: {
          "from": "products",
          "localField": "product_id",
          "foreignField": "_id",
          "as": "product"
        }},
      // { $project: {
      //     _id: 1,
      //     customer_id: 1,
      //     createdAt: 1,
      //     quantity: 1,
      //     // title: "$product.title",
      //     // cover: "product.cover",
      //     // price: "product.price"
      // } },
      { $unwind: {path: "$product", preserveNullAndEmptyArrays: true} },
      // or
      {
        $addFields: {
          cover: "$product.cover",
          title: "$product.title",
          price: "$product.price",
        },
      },
      {$unset: "product"}
    ])
    res.send(c)
    
  } catch (ex){
    res.status(500).send("internal Server error")
  }
}


export const addToCart = async (req: RequestWithSession, res: ApiResponse)=> {

  let user_id = req.user.userId
  const { product_id, quantity } = req.body

  let c: CartType = {
    customer_id: user_id,
    product_id: product_id,
    quantity: quantity
  }
  let newCart =  new Cart(c)
  try {
    newCart = await newCart.save()
    res.status(201).json({
      _id: newCart._id
    })
  } catch (ex){
    res.status(500).send("internal Server error")
  }
}


export const removeToCart = async (req: ApiRequest, res: ApiResponse)=> {
  const { cart_id }  = req.body
  try {
    let isRemove = await Cart.remove({_id: cart_id})
    if(isRemove.deletedCount > 0){
      return res.status(201).json({
        _id: cart_id
      })
    }
    
    res.status(404).json({message: "Product not found"})
    
  } catch (ex){
    res.status(500).send("internal Server error")
  }
}