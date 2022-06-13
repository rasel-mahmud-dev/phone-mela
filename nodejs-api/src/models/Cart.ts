import mongoose from "mongoose";
import {ObjectFlags} from "../types";

export type CartType = {
  _id?: string,
  product_id: string,
  quantity: number,
  customer_id: string,
  createdAt?: string
}

const schemaObject: ObjectFlags<CartType> = {
  customer_id: {
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    index: true
  },
  quantity: Number,
}

mongoose.model('Cart', new mongoose.Schema(schemaObject, {timestamps: true}));
