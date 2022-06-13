import {ObjectFlags} from "../types";
import mongoose from "mongoose";

export interface SalesType{
  _id?: string
  product_id: string
  customer_id: string
  order_id: string
}



const schemaObject: ObjectFlags<SalesType> = {
  product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
  customer_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  order_id: {type: mongoose.Schema.Types.ObjectId, ref: "Order"},
}

mongoose.model('Sales', new mongoose.Schema(schemaObject, {timestamps: true}));
