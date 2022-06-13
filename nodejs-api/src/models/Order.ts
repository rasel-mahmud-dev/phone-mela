import {ObjectFlags} from "../types";
import mongoose from "mongoose";

export interface OrderType{
  _id?: string
  product_id: string
  customer_id: string
  shipper_id: string
  shipping_id: string
  order_status: orderStatusType
  description: string
  price: number
  quantity: number
  delivery_date: Date
  created_at?: string
  payment_method: paymentType
}

export enum paymentType  {
  bkash = "bkash",
  nagod = "nagod",
  "cash-on-delivery" = "cash-on-delivery",
  card = "card"
}
export enum OrderStatusType  {
  pending = "pending",
  delivered = "delivered",
}

const schemaObject: ObjectFlags<OrderType> = {
  quantity: Number,
  price: Number,
  description: String,
  product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
  customer_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  shipper_id: {type: mongoose.Schema.Types.ObjectId, ref: "Shipper"},
  shipping_id: {type: mongoose.Schema.Types.ObjectId, ref: "shipping_address"},
  order_status: {
    type: String,
    enum: ['pending', 'delivered'],
    message: '{VALUE} is not supported'
  },
  delivery_date: Date,
  payment_method: {
    type: String,
    enum: ['bkash', 'nagod', 'cash-on-delivery', 'card'],
    message: '{VALUE} is not supported'
  },
}

mongoose.model('Order', new mongoose.Schema(schemaObject, {timestamps: true}));
